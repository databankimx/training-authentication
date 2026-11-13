// renderer/renderer.js
//
// The window's UI. It builds the chapter and lesson lists, shows the Lesson and Source tabs, handles quiz answers
// and spoiler examples, runs code, gates the solutions, opens links in the browser, and moves between lessons with
// the Next and Previous buttons and the keyboard. It talks to the main process only through window.runner
// (see preload.js). This is a classic script: the page's Content Security Policy allows scripts from 'self' only.

(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const isPopout = params.get('mode') === 'lesson';
  const startLesson = params.get('lesson');
  const LANGUAGES = ['csharp', 'python', 'javascript'];
  const LABELS = { csharp: 'C#', python: 'Python', javascript: 'JavaScript' };
  // The file extension for each language's main file: main.cs, main.py, and main.js.
  const EXTENSIONS = { csharp: 'cs', python: 'py', javascript: 'js' };

  const ui = {
    chapters: document.getElementById('chapters'),
    lessons: document.getElementById('lessons'),
    title: document.getElementById('title'),
    lesson: document.getElementById('lesson'),
    source: document.getElementById('source'),
    sourceLanguages: document.getElementById('source-languages'),
    fileSelect: document.getElementById('file-select'),
    promptView: document.getElementById('prompt-view'),
    editor: document.getElementById('editor'),
    highlight: document.getElementById('highlight'),
    gutter: document.getElementById('gutter'),
    solutionGutter: document.getElementById('solution-gutter'),
    solutions: document.getElementById('solutions'),
    solutionCode: document.getElementById('solution-code'),
    solutionReasoning: document.getElementById('solution-reasoning'),
    solutionsToggle: document.getElementById('solutions-toggle'),
    resetSource: document.getElementById('reset-source'),
    modified: document.getElementById('modified'),
    noCode: document.getElementById('no-code'),
    noToolchain: document.getElementById('no-toolchain'),
    output: document.getElementById('output'),
    run: document.getElementById('run'),
    stopRun: document.getElementById('stop-run'),
    check: document.getElementById('check'),
    previous: document.getElementById('previous'),
    previousHint: document.getElementById('previous-hint'),
    next: document.getElementById('next'),
    nextHint: document.getElementById('next-hint'),
    theme: document.getElementById('theme'),
    toast: document.getElementById('toast'),
    redock: document.getElementById('redock'),
  };

  const state = {
    catalog: [],
    current: null,
    chapterId: null,
    previous: null,
    next: null,
    popoutOpen: false,
    lessonSize: 14,
    toolchains: null,
    // The code step on screen: its languages, the starter and any edits in each, the active language, and the
    // solution gate. Edits last only while the learner is on the step, as the design says.
    code: null,
    running: false,
    // The output element a run writes to. A sample sets its own; the main Run and Check clear it, so they write to the pane.
    activeOutput: null,
  };
  const scrollPositions = new Map();
  // True while saved answers are being put back, so restoring them doesn't save them again.
  let restoring = false;

  // ---- Glyphs, theme, and zoom ----

  function setupGlyphs() {
    document.getElementById('moon').innerHTML = window.icon('moon', 16);
    document.getElementById('sun').innerHTML = window.icon('sun', 16);
    document.getElementById('copy-output').innerHTML = window.icon('copy');
    document.getElementById('clear').innerHTML = window.icon('clear');
    document.getElementById('copy-source').innerHTML = window.icon('copy');
    document.getElementById('popout').innerHTML = window.icon('popout');
    document.getElementById('popout-copy').innerHTML = window.icon('copy');
    document.getElementById('popout-dock').innerHTML = window.icon('dock');
    document.getElementById('previous-icon').innerHTML = window.icon('triangle-left', 16);
    document.getElementById('next-icon').innerHTML = window.icon('triangle-right', 16);
    document.getElementById('run-icon').innerHTML = window.icon('triangle-right', 12);
  }

  function applyTheme(light) {
    document.body.classList.toggle('light', light);
    ui.theme.checked = light;
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }

  function setupTheme() {
    applyTheme(localStorage.getItem('theme') === 'light');
    ui.theme.addEventListener('change', () => applyTheme(ui.theme.checked));
  }

  // Ctrl with the mouse wheel changes the lesson's text size. The page itself never zooms.
  function setupZoom() {
    document.addEventListener(
      'wheel',
      (event) => {
        if (!event.ctrlKey) return;
        event.preventDefault();
        if (!ui.lesson.contains(event.target)) return;
        state.lessonSize = Math.min(28, Math.max(10, state.lessonSize + (event.deltaY < 0 ? 1 : -1)));
        document.documentElement.style.setProperty('--lesson-size', `${state.lessonSize}px`);
      },
      { passive: false },
    );
  }

  // ---- Messages ----

  function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.remove('hidden');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => ui.toast.classList.add('hidden'), 2500);
  }

  function appendOutput(text, className) {
    const target = state.activeOutput || ui.output;
    const span = document.createElement('span');
    if (className) span.className = className;
    span.textContent = text;
    target.append(span);
    target.scrollTop = target.scrollHeight;
  }

  // Shows a tick in place of a copy glyph for a moment, so the learner knows the copy worked.
  function copyText(text, button) {
    navigator.clipboard.writeText(text).catch(() => showToast('The text could not be copied.'));
    if (!button) return;
    const original = button.innerHTML;
    button.innerHTML = window.icon('checkmark');
    window.setTimeout(() => {
      button.innerHTML = original;
    }, 1200);
  }

  // ---- Languages: one choice, shared by the examples in the lesson and the tabs in the source ----

  function currentLanguage() {
    const saved = localStorage.getItem('language');
    return LANGUAGES.includes(saved) ? saved : 'csharp';
  }

  function chooseLanguage(language) {
    localStorage.setItem('language', language);
  }

  // Shows the chosen language's example in every examples block on the page.
  function applyLanguage(language) {
    for (const block of ui.lesson.querySelectorAll('[data-examples]')) {
      for (const tab of block.querySelectorAll('.language-tab')) {
        tab.classList.toggle('active', tab.dataset.language === language);
      }
      for (const pane of block.querySelectorAll('.example-pane')) {
        pane.hidden = pane.dataset.language !== language;
      }
    }
  }

  // ---- Tabs ----

  // Steps without code open on the Lesson tab. A code step opens on the Source tab.
  function showTab(name) {
    for (const button of document.querySelectorAll('.tab')) {
      button.classList.toggle('active', button.dataset.tab === name);
    }
    if (name === 'lesson' && state.current) {
      ui.lesson.scrollTop = scrollPositions.get(state.current.id) || 0;
    }
    refreshPaneVisibility();
  }

  // While the lesson is open in its own window, the Lesson tab shows a Re-dock panel. The Source tab stays usable.
  function refreshPaneVisibility() {
    const tab = activeTab();
    const redock = !isPopout && state.popoutOpen && tab === 'lesson';
    ui.redock.classList.toggle('hidden', !redock);
    ui.lesson.classList.toggle('hidden', redock || tab !== 'lesson');
    ui.source.classList.toggle('hidden', tab !== 'source');
  }

  function activeTab() {
    const active = document.querySelector('.tab.active');
    return active && active.dataset.tab === 'lesson' ? 'lesson' : 'source';
  }

  function setupTabs() {
    for (const button of document.querySelectorAll('.tab')) {
      button.addEventListener('click', () => showTab(button.dataset.tab));
    }
  }

  // ---- Source: the code of a step, with language tabs, an editor, Run, and the solution gate ----

  // Loads the toolchains once. A language whose tools are missing gets no tab.
  async function loadToolchains() {
    if (state.toolchains !== null) return;
    try {
      state.toolchains = await window.runner.toolchains();
    } catch (error) {
      state.toolchains = {};
      showToast(`The installed languages could not be checked: ${error.message}`);
    }
  }

  // Colors the editor's text. Each call supersedes the one before, so a slow result can't overwrite a newer one.
  let highlightSeq = 0;

  // One line number per line of text, from 1 to the last line.
  function lineNumbers(text) {
    return Array.from({ length: text.split('\n').length }, (_item, index) => String(index + 1)).join('\n');
  }

  async function refreshHighlight() {
    const code = state.code;
    // The prompt is shown rendered and read-only, so only the main file is colored.
    const language = code === null ? null : code.file === 'prompt' ? null : code.active;
    ui.gutter.textContent = language === null ? '' : lineNumbers(ui.editor.value);
    if (language === null) {
      ui.highlight.innerHTML = '';
      return;
    }
    const seq = ++highlightSeq;
    try {
      const html = await window.runner.highlight(ui.editor.value, language);
      if (seq === highlightSeq) {
        ui.highlight.innerHTML = html + '\n';
        syncHighlightScroll();
      }
    } catch {
      // Without coloring the text is still shown, so a failed highlight is not reported.
    }
  }

  // The coloring layer follows the editor's scroll position, so the two line up.
  function syncHighlightScroll() {
    ui.highlight.scrollTop = ui.editor.scrollTop;
    ui.highlight.scrollLeft = ui.editor.scrollLeft;
    ui.gutter.scrollTop = ui.editor.scrollTop;
  }

  // Shows the read-only solution for the active language, colored the same way.
  async function showSolution(code) {
    const text = code.active && code.solutions ? (code.solutions[code.active] ?? '') : '';
    ui.solutionGutter.textContent = lineNumbers(text);
    const seq = ++highlightSeq;
    try {
      const html = await window.runner.highlight(text, code.active || '');
      if (seq === highlightSeq) ui.solutionCode.innerHTML = html;
    } catch {
      ui.solutionCode.textContent = text;
    }
  }

  // The file drop-down: the step's main file for the active language, and prompt.md when the step has one.
  function renderFileSelect() {
    const code = state.code;
    ui.fileSelect.hidden = code === null || code.prompt === null;
    if (code === null) return;
    const mainName = code.active ? `main.${EXTENSIONS[code.active]}` : 'main';
    const options = [['code', mainName]];
    if (code.prompt !== null) options.push(['prompt', 'prompt.md']);
    ui.fileSelect.replaceChildren(
      ...options.map(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        option.selected = value === code.file;
        return option;
      }),
    );
  }

  // The text under edit is kept per file: the main file for each language, and prompt.md.
  function editKey() {
    const code = state.code;
    if (code === null) return null;
    return code.file === 'prompt' ? 'prompt' : code.active;
  }

  function saveEditorText() {
    const key = editKey();
    if (state.code !== null && key !== null && !ui.editor.hidden) state.code.edits[key] = ui.editor.value;
  }

  // Moves between main.* and prompt.md. Viewing the prompt closes the solutions, which belong to the main file.
  function selectFile(file) {
    const code = state.code;
    if (code === null || code.file === file) return;
    saveEditorText();
    code.file = file;
    renderFileSelect();
    renderSourceTabs();
    showCode();
  }

  function canRun(language) {
    return Boolean(state.toolchains && state.toolchains[language] && state.toolchains[language].available);
  }

  function setRunButtonsVisible(visible) {
    ui.run.hidden = !visible;
    ui.stopRun.hidden = !visible;
    ui.check.hidden = !visible;
  }

  // Sets up the Source tab for a lesson. A step without code shows a note, and a code step shows its editor.
  async function renderSource(lesson) {
    const hasCode = lesson.languages.length > 0;
    ui.noCode.hidden = hasCode;
    ui.noToolchain.hidden = true;
    ui.sourceLanguages.replaceChildren();
    ui.solutionsToggle.hidden = !lesson.gated;
    ui.resetSource.hidden = !hasCode;
    ui.modified.hidden = true;
    setRunButtonsVisible(hasCode);
    // Check applies only to a step with an expected output, which is homework. Other code steps get Run alone.
    ui.check.hidden = !lesson.expected;
    ui.editor.hidden = true;
    ui.promptView.hidden = true;
    ui.solutions.hidden = true;
    if (!hasCode) {
      state.code = null;
      renderFileSelect();
      ui.noCode.textContent = 'This step has no source code.';
      return;
    }

    const edits = {};
    for (const language of lesson.languages) {
      edits[language] = normalizeLineEndings(lesson.starters[language] ?? '');
    }
    if (lesson.prompt !== null) edits.prompt = lesson.prompt;
    state.code = {
      id: lesson.id,
      file: 'code',
      prompt: lesson.prompt,
      languages: lesson.languages,
      starters: lesson.starters,
      edits,
      active: null,
      solutionsRevealed: lesson.solutionsRevealed,
      gated: lesson.gated,
      solutions: null,
      solutionsOpen: false,
    };
    ui.noCode.textContent = '';
    renderFileSelect();

    await loadToolchains();
    // The lesson may have changed while the toolchains were being checked, so the step is checked again first.
    if (state.code === null || state.code.id !== lesson.id) return;
    renderSourceTabs();
    showCode();
  }

  // The language tabs. Normally only languages that can run here get a tab. Once the solutions are open, all of
  // the step's languages get a tab, so every sample can be read.
  function renderSourceTabs() {
    const code = state.code;
    if (code === null) return;
    const choices = code.languages.filter((language) => code.solutionsOpen || canRun(language));
    // The language tabs choose the main file, so they're hidden while the prompt is showing.
    ui.sourceLanguages.hidden = code.file === 'prompt';
    if (code.file === 'prompt') {
      ui.noToolchain.hidden = true;
      return;
    }

    ui.sourceLanguages.replaceChildren(
      ...choices.map((language) => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'language-tab';
        tab.dataset.language = language;
        tab.textContent = LABELS[language];
        tab.addEventListener('click', () => selectLanguage(language));
        return tab;
      }),
    );

    if (choices.length === 0) {
      ui.noToolchain.textContent =
        'None of this step\'s languages can run on this computer. Install the tools for one of them, then open the step again.';
      ui.noToolchain.hidden = false;
      code.active = null;
      return;
    }
    ui.noToolchain.hidden = true;
    const preferred = currentLanguage();
    // Keep the language being edited. Only choose a default when there isn't one yet, or it's no longer available.
    if (!choices.includes(code.active)) code.active = choices.includes(preferred) ? preferred : choices[0];
    for (const tab of ui.sourceLanguages.querySelectorAll('.language-tab')) {
      tab.classList.toggle('active', tab.dataset.language === code.active);
    }
  }

  // Shows either the editor for the active language, or the read-only solutions once they are open.
  function showCode() {
    const code = state.code;
    if (code === null) return;
    ui.solutionsToggle.textContent = code.solutionsOpen
      ? 'Hide solutions'
      : code.solutionsRevealed
        ? 'Show solutions'
        : 'Show solutions (spoiler)';
    ui.solutionsToggle.setAttribute('aria-expanded', String(code.solutionsOpen));

    if (code.solutionsOpen && code.file !== 'prompt') {
      ui.editor.hidden = true;
      ui.solutions.hidden = false;
      showSolution(code);
      ui.promptView.hidden = true;
      ui.modified.hidden = true;
      ui.resetSource.disabled = true;
      setRunEnabled(code.active !== null && !state.running);
      return;
    }

    ui.solutions.hidden = true;
    ui.resetSource.disabled = false;
    const onPrompt = code.file === 'prompt';
    ui.promptView.hidden = !onPrompt;
    ui.promptView.innerHTML = onPrompt ? code.prompt : '';
    ui.editor.hidden = onPrompt || code.active === null;
    ui.editor.readOnly = false;
    ui.editor.value = onPrompt ? '' : code.active ? code.edits[code.active] : '';
    ui.resetSource.hidden = onPrompt;
    updateDirty();
    refreshHighlight();
    setRunEnabled(code.active !== null && !state.running);
  }

  function selectLanguage(language) {
    const code = state.code;
    if (code === null) return;
    // Keep the edits made to the language being left.
    if (code.active !== null && !ui.editor.hidden) code.edits[code.active] = ui.editor.value;
    chooseLanguage(language);
    applyLanguage(language);
    code.active = language;
    renderSourceTabs();
    showCode();
  }

  // Line endings are compared as LF, because a text area always stores LF. A starter read from a CRLF file would
  // otherwise look modified as soon as it is shown.
  function normalizeLineEndings(text) {
    return text.replace(/\r\n?/g, '\n');
  }

  // The file under edit differs from the step's starter. The prompt is never edited, so it is never modified.
  function isDirty() {
    const code = state.code;
    if (code === null || code.file === 'prompt' || code.active === null) return false;
    const text = ui.editor.hidden ? code.edits[code.active] : ui.editor.value;
    return normalizeLineEndings(text) !== normalizeLineEndings(code.starters[code.active] ?? '');
  }

  // Shows the "modified" indicator and enables Reset only while the file differs from its starter.
  function updateDirty() {
    const dirty = isDirty();
    ui.modified.hidden = !dirty;
    ui.resetSource.disabled = !dirty || (state.code !== null && state.code.solutionsOpen);
  }

  function setRunEnabled(enabled) {
    ui.run.disabled = !enabled;
    ui.check.disabled = !enabled;
  }

  // The solution gate. The first press asks the main process for the solutions, which also keeps the gate open for
  // later visits. After that, the button hides and shows the solutions.
  async function toggleSolutions() {
    const code = state.code;
    if (code === null || !code.gated) return;
    if (!code.solutionsOpen && code.solutions === null) {
      try {
        const result = await window.runner.revealSolutions(code.id);
        code.solutions = result.code;
        code.prompt = result.prompt;
        code.solutionsRevealed = true;
      } catch (error) {
        showToast(error.message);
        return;
      }
    }
    if (!code.solutionsOpen) code.file = 'code';
    code.solutionsOpen = !code.solutionsOpen;
    renderFileSelect();
    renderSourceTabs();
    showCode();
  }

  function setupSource() {
    ui.editor.addEventListener('input', () => {
      saveEditorText();
      refreshHighlight();
      updateDirty();
    });
    ui.editor.addEventListener('scroll', syncHighlightScroll);
    ui.resetSource.addEventListener('click', () => {
      const code = state.code;
      if (code === null) return;
      const key = editKey();
      if (key === null || key === 'prompt') return;
      code.edits[key] = normalizeLineEndings(code.starters[key] ?? '');
      ui.editor.value = code.edits[key];
      refreshHighlight();
      updateDirty();
    });
    ui.fileSelect.addEventListener('change', () => selectFile(ui.fileSelect.value));
    ui.solutionsToggle.addEventListener('click', () => {
      toggleSolutions();
    });
    ui.run.addEventListener('click', () => {
      runCode();
    });
    ui.check.addEventListener('click', () => {
      checkCode();
    });
    ui.stopRun.addEventListener('click', () => {
      window.runner.stopRun();
    });
  }

  // ---- Running a step's code ----

  function setRunning(running) {
    state.running = running;
    ui.stopRun.disabled = !running;
    if (running) {
      ui.run.disabled = true;
      ui.check.disabled = true;
    } else if (state.code !== null) {
      setRunEnabled(state.code.active !== null);
    }
  }

  // What Run and Check send. With the solutions open, that's the solution for the active language. Otherwise it's the
  // learner's text for the active language, edited or not. When another file is selected in a multi-file step, the text
  // kept for main is used, so Run always runs main in that case.
  function sourceForRun(code) {
    if (code.solutionsOpen) return code.solutions ? (code.solutions[code.active] ?? '') : '';
    if (code.file === 'prompt') return code.edits[code.active] ?? '';
    return ui.editor.value;
  }

  async function runCode() {
    const code = state.code;
    if (code === null || code.active === null || state.running || state.current === null) return;
    const source = sourceForRun(code);
    ui.output.textContent = '';
    state.activeOutput = null;
    setRunning(true);
    try {
      await window.runner.runCode(state.current.id, code.active, source);
    } catch (error) {
      appendOutput(`${error.message}\n`, 'error');
      setRunning(false);
    }
  }

  // The Check button: a syntax check, then the output check if the syntax passes. Results are shown in the output pane.
  async function checkCode() {
    const code = state.code;
    if (code === null || code.active === null || state.running || state.current === null) return;
    const language = code.active;
    const source = sourceForRun(code);
    ui.output.textContent = '';
    state.activeOutput = null;
    setRunning(true);
    try {
      reportCheck(language, await window.runner.checkCode(state.current.id, language, source));
    } catch (error) {
      appendOutput(`${error.message}\n`, 'error');
    } finally {
      setRunning(false);
    }
  }

  function reportCheck(language, result) {
    if (result.kind === 'diagnostics') {
      for (const item of result.items) {
        appendOutput(`main.${EXTENSIONS[language]}:${item.line}:${item.column} - error: ${item.message}\n`, 'error');
      }
      appendOutput(`\nCheck found ${result.items.length} problem${result.items.length === 1 ? '' : 's'}.\n`, 'status');
    } else if (result.kind === 'no-expected') {
      appendOutput('Check passed: no syntax errors. This step has no expected output to compare.\n', 'status');
    } else if (result.kind === 'passed') {
      appendOutput('Check passed: no errors, and the output matches the expected result.\n', 'status');
    } else {
      appendOutput('The output does not match the expected result.\n\nExpected:\n', 'error');
      appendOutput(`${result.expected}\n\nActual:\n`, 'error');
      appendOutput(`${result.actual}\n`, 'error');
    }
  }

  function handleRunEvent(event) {
    if (event.kind === 'stdout') {
      appendOutput(event.text);
    } else if (event.kind === 'stderr') {
      appendOutput(event.text, 'error');
    } else if (event.kind === 'done') {
      if (event.timedOut) {
        appendOutput('\nThe program was stopped because it ran for too long.\n', 'error');
      } else {
        appendOutput(`\nThe program finished with exit code ${event.code ?? 'unknown'}.\n`, 'status');
      }
      setRunning(false);
    }
  }

  // ---- Navigation: the lesson list, and showing a lesson ----

  function renderNavigation() {
    ui.chapters.replaceChildren();
    for (const chapter of state.catalog) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'nav-row' + (chapter.id === state.chapterId ? ' selected' : '');
      row.textContent = chapter.label;
      row.addEventListener('click', () => openLesson(chapter.id));
      ui.chapters.append(row);
    }

    ui.lessons.replaceChildren();
    const chapter = state.catalog.find((candidate) => candidate.id === state.chapterId);
    if (!chapter) return;
    for (const step of chapter.steps) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'nav-row step' + (step.id === (state.current && state.current.id) ? ' selected' : '');
      row.textContent = step.title;
      row.addEventListener('click', () => openLesson(step.id));
      ui.lessons.append(row);
    }
  }

  function outputMessage(lesson) {
    if (lesson.kind === 'chapter') return 'This is a chapter introduction. There is no code to run.';
    if (lesson.languages.length > 0) return 'Press Run to run this step in the language you chose.';
    return 'This step has no code to run.';
  }

  async function openLesson(id) {
    let lesson;
    try {
      lesson = await window.runner.openLesson(id);
    } catch (error) {
      showToast(error.message);
      return;
    }

    displayLesson(lesson);
    if (isPopout) {
      // The pop-out reports its move, so the main window's lesson list and Next button follow it.
      window.runner.popoutNavigated(lesson.id);
      return;
    }
    try {
      await window.runner.visit(lesson.id);
    } catch (error) {
      showToast(`Progress could not be saved: ${error.message}`);
    }
    window.runner.syncPopout(lesson.id);
  }

  // Shows a lesson that has already been loaded. A normal move uses it, and so does a redraw after a progress reset.
  // The tab the learner is on stays put, so moving between steps doesn't switch them back to the Lesson tab.
  function displayLesson(lesson) {
    if (state.current) scrollPositions.set(state.current.id, ui.lesson.scrollTop);
    state.current = lesson;
    state.chapterId = lesson.id.split('/')[0];
    state.previous = lesson.previous;
    state.next = lesson.next;

    ui.title.textContent = lesson.title;
    // The HTML comes from the course's own Markdown, rendered with raw HTML turned off.
    ui.lesson.innerHTML = lesson.html;
    indexLessonParts(ui.lesson);
    buildSamples(ui.lesson);
    decorateCodeBlocks(ui.lesson);
    applyLanguage(currentLanguage());
    restoreProgress(lesson.progress || { quizzes: {}, spoilers: {} });
    ui.output.textContent = outputMessage(lesson);
    ui.next.disabled = lesson.next === null;
    ui.next.title = lesson.next ? `Next: ${lesson.next.title}` : 'This is the last lesson.';
    ui.nextHint.textContent = lesson.next ? lesson.next.title : '';
    ui.previous.disabled = lesson.previous === null;
    ui.previous.title = lesson.previous ? `Previous: ${lesson.previous.title}` : 'This is the first lesson.';
    ui.previousHint.textContent = lesson.previous ? lesson.previous.title : '';

    renderSource(lesson);
    showTab(activeTab());
    ui.lesson.scrollTop = scrollPositions.get(lesson.id) || 0;
    renderNavigation();
  }

  // Redraws the lesson on screen from the saved progress, which has just been cleared.
  async function redrawCurrent() {
    if (!state.current) return;
    try {
      displayLesson(await window.runner.openLesson(state.current.id));
    } catch (error) {
      showToast(error.message);
    }
  }

  // ---- Quizzes and spoilers ----

  // A quiz answer: the chosen answer shows its explanation beneath it, and a wrong answer is marked in red.
  // The listener is added once, to the lesson pane, so it keeps working for every lesson shown in it.
  function wireQuizzes(root) {
    root.addEventListener('change', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== 'radio') return;
      const quiz = input.closest('[data-quiz]');
      if (!quiz) return;

      const choices = Array.from(quiz.querySelectorAll('.quiz-choice'));
      for (const choice of choices) {
        choice.classList.remove('right', 'picked-wrong');
        choice.querySelector('.quiz-explain').hidden = true;
        if (choice.dataset.correct === 'true') choice.classList.add('right');
      }
      const picked = choices.find((choice) => choice.querySelector('input').checked);
      if (!picked) return;
      if (picked.dataset.correct !== 'true') picked.classList.add('picked-wrong');
      picked.querySelector('.quiz-explain').hidden = false;
      if (!restoring) saveProgress('quiz', Number(quiz.dataset.quizIndex), choices.indexOf(picked));
    });
  }

  // Every code block in a lesson gets a copy glyph. It shows on hover, and it copies the block's text, not the button.
  // The glyph is added once per container, so redrawing a lesson doesn't stack buttons. A sample's highlighted view is
  // skipped here, because its container gets the glyph instead.
  function decorateCodeBlocks(root) {
    for (const pre of root.querySelectorAll('pre:not(.sample-highlight)')) {
      addCopyGlyph(pre, () => (pre.querySelector('code') || pre).textContent);
    }
  }

  function addCopyGlyph(container, textOf) {
    if (container.dataset.copyReady === 'true') return;
    container.dataset.copyReady = 'true';
    container.style.position = 'relative';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.title = 'Copy code';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = window.icon('copy');
    Object.assign(button.style, {
      position: 'absolute',
      top: '6px',
      right: '6px',
      zIndex: '2',
      opacity: '0',
      transition: 'opacity 0.15s',
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      padding: '2px',
      lineHeight: '0',
    });
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      copyText(textOf(), button);
    });
    container.append(button);
    container.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });
    container.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });
  }

  // The text style shared by a sample's highlighted view and its editor, so the two line up exactly.
  function sampleTextStyle(extra) {
    return Object.assign(
      {
        fontFamily: 'Consolas, "Cascadia Mono", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
        padding: '10px 12px',
        margin: '0',
        border: 'none',
        whiteSpace: 'pre',
        tabSize: '4',
        boxSizing: 'border-box',
        wordBreak: 'normal',
      },
      extra,
    );
  }

  // Turns each sample in a lesson's examples into an editor. The highlighted code sits under a transparent text area,
  // so the learner types into a normal editor and sees colored code. Each sample has its own Run, Reset, and output.
  function buildSamples(root) {
    for (const sample of root.querySelectorAll('[data-sample]')) {
      if (sample.dataset.built === 'true') continue;
      sample.dataset.built = 'true';
      const language = sample.dataset.language;
      const pre = sample.querySelector('pre');
      const code = pre.querySelector('code') || pre;
      const source = code.textContent;
      pre.classList.add('sample-highlight');

      const frame = document.createElement('div');
      frame.className = 'sample-code';
      frame.style.position = 'relative';
      frame.style.margin = '0 0 8px';

      const editor = document.createElement('textarea');
      editor.className = 'sample-editor';
      editor.spellcheck = false;
      editor.wrap = 'off';
      editor.value = source;
      editor.rows = Math.max(1, source.split('\n').length);
      Object.assign(
        editor.style,
        sampleTextStyle({
          display: 'block',
          width: '100%',
          position: 'relative',
          resize: 'none',
          overflow: 'hidden',
          background: 'transparent',
          color: 'transparent',
          caretColor: 'CanvasText',
          outline: 'none',
        }),
      );
      // The highlighted view is placed over the editor. It doesn't take the pointer, so clicks reach the text area.
      Object.assign(
        pre.style,
        sampleTextStyle({
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          overflow: 'hidden',
          pointerEvents: 'none',
        }),
      );
      code.style.fontFamily = 'inherit';

      const refresh = async () => {
        try {
          code.innerHTML = (await window.runner.highlight(editor.value, language)) + '\n';
          pre.scrollTop = editor.scrollTop;
          pre.scrollLeft = editor.scrollLeft;
        } catch {
          code.textContent = editor.value + '\n';
        }
      };

      const actions = document.createElement('div');
      Object.assign(actions.style, { display: 'flex', gap: '8px', marginBottom: '6px' });
      const run = document.createElement('button');
      run.type = 'button';
      run.textContent = 'Run';
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.textContent = 'Reset';
      for (const button of [run, reset]) {
        Object.assign(button.style, { padding: '3px 12px', cursor: 'pointer' });
      }
      actions.append(run, reset);

      const output = document.createElement('pre');
      output.className = 'sample-output';
      output.hidden = true;
      Object.assign(output.style, sampleTextStyle({ maxHeight: '260px', overflow: 'auto', marginTop: '8px' }));

      editor.addEventListener('input', refresh);
      editor.addEventListener('scroll', () => {
        pre.scrollTop = editor.scrollTop;
        pre.scrollLeft = editor.scrollLeft;
      });
      reset.addEventListener('click', () => {
        editor.value = source;
        refresh();
      });
      run.addEventListener('click', async () => {
        if (state.running || state.current === null) return;
        output.textContent = '';
        output.hidden = false;
        state.activeOutput = output;
        setRunning(true);
        try {
          await window.runner.runSample(state.current.id, language, editor.value);
        } catch (error) {
          appendOutput(`${error.message}\n`, 'error');
          setRunning(false);
        }
      });

      frame.append(pre, editor);
      sample.replaceChildren(frame, actions, output);
      addCopyGlyph(frame, () => editor.value);
      refresh();
    }
  }

  // Each quiz and spoiler in a lesson is numbered from the top, so its saved state can be matched on the next run.
  function indexLessonParts(root) {
    root.querySelectorAll('[data-quiz]').forEach((quiz, index) => {
      quiz.dataset.quizIndex = String(index);
    });
    root.querySelectorAll('[data-spoiler]').forEach((spoiler, index) => {
      spoiler.dataset.spoilerIndex = String(index);
    });
  }

  // Puts back the quiz answers and spoiler states saved for this lesson. Restoring doesn't save again.
  function restoreProgress(progress) {
    restoring = true;
    try {
      for (const quiz of ui.lesson.querySelectorAll('[data-quiz]')) {
        const chosen = progress.quizzes[quiz.dataset.quizIndex];
        if (chosen === undefined) continue;
        const radio = quiz.querySelectorAll('input[type="radio"]')[chosen];
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      for (const spoiler of ui.lesson.querySelectorAll('[data-spoiler]')) {
        if (progress.spoilers[spoiler.dataset.spoilerIndex] === true) {
          setSpoilerOpen(spoiler, true);
        }
      }
    } finally {
      restoring = false;
    }
  }

  // Saves one answer or spoiler state for the lesson on screen. A failed save is shown as a message.
  function saveProgress(kind, index, value) {
    if (!state.current) return;
    window.runner.recordProgress(state.current.id, kind, index, value).catch((error) => {
      showToast(`Progress could not be saved: ${error.message}`);
    });
  }

  function setSpoilerOpen(spoiler, open) {
    const toggle = spoiler.querySelector('.spoiler-toggle');
    spoiler.querySelector('.spoiler-body').hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Hide example (spoiler)' : 'Show example (spoiler)';
  }

  // Clicks inside the lesson: spoilers, language tabs in examples, and links.
  ui.lesson.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const toggle = target ? target.closest('.spoiler-toggle') : null;
    if (toggle) {
      const spoiler = toggle.closest('[data-spoiler]');
      const opening = spoiler.querySelector('.spoiler-body').hidden;
      setSpoilerOpen(spoiler, opening);
      if (!restoring) saveProgress('spoiler', Number(spoiler.dataset.spoilerIndex), opening);
      return;
    }

    // A language tab shows that language's example in every examples block, and the choice is remembered.
    const language = target ? target.closest('.language-tab') : null;
    if (language) {
      chooseLanguage(language.dataset.language);
      applyLanguage(language.dataset.language);
      return;
    }

    // Links open in the learner's browser, not in the runner.
    const link = target ? target.closest('a[href]') : null;
    if (link) {
      event.preventDefault();
      window.runner.openExternal(link.getAttribute('href'));
    }
  });

  // ---- Next, Previous, the keyboard, and the buttons ----

  ui.next.addEventListener('click', () => {
    if (state.next) openLesson(state.next.id);
  });

  ui.previous.addEventListener('click', () => {
    if (state.previous) openLesson(state.previous.id);
  });

  // Ctrl+Left and Ctrl+Right move the cursor by word inside the editor, so they only change lesson elsewhere.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'F5') {
      // F5 runs the step, and Ctrl+F5 checks it. Both do what the buttons do, and the browser's reload is turned off.
      event.preventDefault();
      if (event.ctrlKey) checkCode();
      else runCode();
      return;
    }
    if (event.key === 'Escape' && state.running) {
      window.runner.stopRun();
      return;
    }
    if (!event.ctrlKey || event.altKey || event.shiftKey) return;
    if (event.target === ui.editor) return;
    if (event.key === 'ArrowRight' && state.next) {
      event.preventDefault();
      openLesson(state.next.id);
    } else if (event.key === 'ArrowLeft' && state.previous) {
      event.preventDefault();
      openLesson(state.previous.id);
    }
  });

  function setupButtons() {
    wireQuizzes(ui.lesson);
    // Ctrl+Alt+Shift+Backspace clears saved progress: quiz answers, spoiler states, the last lesson, visited steps,
    // and solution reveals.
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey && event.shiftKey && event.key === 'Backspace') {
        event.preventDefault();
        window.runner.resetProgress();
      }
    });
    if (window.runner) {
      window.runner.onProgressReset(() => {
        redrawCurrent();
        showToast('Progress reset');
      });
      window.runner.onRunEvent((event) => handleRunEvent(event));
    }
    document.getElementById('copy-output').addEventListener('click', (event) => {
      copyText(ui.output.textContent, event.currentTarget);
    });
    document.getElementById('clear').addEventListener('click', () => {
      ui.output.textContent = '';
    });
    document.getElementById('copy-source').addEventListener('click', (event) => {
      if (activeTab() === 'lesson') {
        copyText(state.current ? state.current.markdown : '', event.currentTarget);
      } else {
        copyText(ui.promptView.hidden ? (ui.editor.hidden ? ui.solutionCode.textContent : ui.editor.value) : ui.promptView.textContent, event.currentTarget);
      }
    });
    document.getElementById('popout').addEventListener('click', () => {
      if (state.current) window.runner.popOutLesson(state.current.id);
    });
    document.getElementById('popout-copy').addEventListener('click', (event) => {
      copyText(state.current ? state.current.markdown : '', event.currentTarget);
    });
    document.getElementById('popout-dock').addEventListener('click', () => {
      window.runner.closePopout();
    });
    document.getElementById('redock-button').addEventListener('click', () => {
      window.runner.closePopout();
    });
  }

  function setupPopoutState() {
    if (!window.runner) return;
    window.runner.onPopoutState((popoutState) => {
      state.popoutOpen = popoutState.open;
      refreshPaneVisibility();
    });
    // The pop-out moved to another lesson. Follow it, unless the main window already shows that lesson.
    window.runner.onPageNavigated((id) => {
      if (!state.current || state.current.id !== id) openLesson(id);
    });
  }

  // ---- Startup ----

  async function start() {
    setupGlyphs();
    setupTheme();
    setupZoom();
    setupTabs();
    setupSource();
    setupButtons();
    // The runner starts on the Lesson tab. After that, moving between steps keeps whichever tab the learner is on.
    showTab('lesson');

    if (!window.runner) {
      ui.title.textContent = 'The runner could not connect to its main process.';
      return;
    }

    if (isPopout) {
      document.body.classList.add('popout');
      // The pop-out shows the lesson given in the address, and follows the main window when it's asked to.
      window.runner.onShowLesson((id) => {
        // The main window's sync arrives for the lesson already shown after a pop-out move. Ignore it, so the two
        // windows don't loop.
        if (!state.current || state.current.id !== id) openLesson(id);
      });
      await openLesson(startLesson || (await firstLessonId()));
      return;
    }

    setupPopoutState();
    state.popoutOpen = (await window.runner.popoutState()).open;
    refreshPaneVisibility();

    try {
      state.catalog = await window.runner.listCatalog();
      if (state.catalog.length === 0) {
        ui.title.textContent = 'No chapters were found.';
        return;
      }
      const known = new Set(state.catalog.flatMap((chapter) => [chapter.id, ...chapter.steps.map((step) => step.id)]));
      const saved = await window.runner.getState();
      const startId = saved.lastStep && known.has(saved.lastStep) ? saved.lastStep : state.catalog[0].id;
      await openLesson(startId);
    } catch (error) {
      ui.title.textContent = 'The course could not be loaded.';
      showToast(error.message);
    }
  }

  async function firstLessonId() {
    const catalog = await window.runner.listCatalog();
    return catalog.length ? catalog[0].id : '';
  }

  // The pop-out has no chapter list, so its Next button needs the catalog too.
  if (isPopout && window.runner) {
    window.runner.listCatalog().then((catalog) => {
      state.catalog = catalog;
    });
  }

  start();
})();
