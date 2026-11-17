// main.js
//
// The Electron main process. It finds the course, renders lessons, saves progress, checks which languages can run,
// runs a step's code when asked, opens links in the browser, and manages the pop-out lesson window. The page talks
// to this process only through the preload bridge.

'use strict';

const { app, BrowserWindow, ipcMain, Menu, screen, shell } = require('electron');
const { execFile, spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const { loadCatalog, flatten, summarize, neighbors } = require('./core/catalog');
const { createRenderer } = require('./core/markdown');
const { sourceFromExamples } = require('./core/sources');
const { highlightCode, markdownHighlight } = require('./core/highlight');
const {
  emptyState,
  loadState,
  saveState,
  markVisited,
  recordProgress,
  lessonProgress,
  recordSolutionsRevealed,
  solutionsRevealed,
} = require('./core/state');
const { loadWindowState, saveWindowState, isVisibleOn } = require('./core/window-state');
const { probeAll } = require('./core/toolchains');
const { FILE_NAMES, commandFor, environmentFor, runFolderFor, prerequisiteProblem } = require('./core/run');
const { syntaxCommand, parseDiagnostics, outputMatches } = require('./core/check');
const { isGatedStep } = require('./core/gating');

// The runner lives in lesson-runner/, inside the course folder.
const courseRoot = path.resolve(__dirname, '..');
const rendererDir = path.join(__dirname, 'renderer');
const md = createRenderer({ highlight: markdownHighlight });

// The file extension for each language's starter and solution files: main.cs and solution.cs, and so on.
const EXTENSIONS = { csharp: 'cs', python: 'py', javascript: 'js' };
// The languages a lesson's examples are written in. A sample can run in any of them.
const SAMPLE_LANGUAGES = ['csharp', 'python', 'javascript'];
// Time allowed for one run. C# is slower to start, because the first run compiles the file.
const TIME_LIMIT_MS = { csharp: 60000, python: 10000, javascript: 10000 };

let mainWindow = null;
let popoutWindow = null;
let toolchainCache = null;
let activeRun = null;

function stateFile() {
  return path.join(app.getPath('userData'), 'progress.json');
}

function currentItems() {
  return flatten(loadCatalog(courseRoot));
}

function findItem(id) {
  return currentItems().find((candidate) => candidate.id === id) ?? null;
}

// A step's own main files, one per language, read from its folder. Missing files are skipped.
function codeFiles(item, prefix) {
  const files = {};
  for (const language of item.languages) {
    const file = path.join(item.dir, `${prefix}.${EXTENSIONS[language]}`);
    if (fs.existsSync(file)) files[language] = fs.readFileSync(file, 'utf8');
  }
  return files;
}

// The examples in a step's lesson text, as the code for each language. Null when the lesson has none.
function exampleSource(item) {
  if (!fs.existsSync(item.markdownPath)) return null;
  return sourceFromExamples(fs.readFileSync(item.markdownPath, 'utf8'));
}

// The languages a step's Source pane can run: its own list, or the languages of its examples. A chapter has none.
function codeLanguages(item) {
  if (item.kind !== 'step') return [];
  if (item.languages.length > 0) return item.languages;
  const examples = exampleSource(item);
  return examples ? Object.keys(examples) : [];
}

// The starting code for each language: the step's main files, or, for a reading step, its examples.
function startingCode(item) {
  if (item.kind !== 'step') return {};
  if (item.languages.length > 0) return codeFiles(item, 'main');
  return exampleSource(item) ?? {};
}

// Which course languages can run here. The check runs once per session, and the result is kept.
function toolchains() {
  if (toolchainCache === null) toolchainCache = probeAll(execFile);
  return toolchainCache;
}

function openLesson(id) {
  const items = currentItems();
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Unknown lesson: ${id}`);

  const markdown = fs.readFileSync(item.markdownPath, 'utf8');
  const { previous, next } = neighbors(items, id);
  const state = loadState(stateFile());
  const isCodeStep = codeLanguages(item).length > 0;
  const gated = isGatedStep(item);
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    html: md.render(markdown),
    markdown,
    previous: previous ? { id: previous.id, title: previous.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
    isLast: next === null,
    progress: lessonProgress(state, id),
    // For a code step: the languages it covers, its starter code in each, and whether its solutions are revealed.
    // The solutions themselves are not sent until the learner opens the gate.
    languages: isCodeStep ? codeLanguages(item) : [],
    starters: isCodeStep ? startingCode(item) : {},
    expected: isCodeStep ? (item.expected ?? null) : null,
    gated,
    solutionsRevealed: gated && solutionsRevealed(state, id),
    // The learner's prompt file for a code step, if the step has one. It's language-neutral, so it isn't per language.
    // The sample prompt (prompt.md) is part of the solution, so like the solutions it is sent only once the gate is open.
    // It is rendered here, and the page shows it read-only.
    prompt: gated && solutionsRevealed(state, id) && fs.existsSync(path.join(item.dir, 'prompt.md'))
      ? md.render(fs.readFileSync(path.join(item.dir, 'prompt.md'), 'utf8'))
      : null,
  };
}

// Links in a lesson open in the learner's browser. Only web addresses are allowed, so a lesson can't start a program.
function openInBrowser(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
  shell.openExternal(parsed.toString());
  return true;
}

// Keeps a window from navigating away from the lesson page. Every outside link opens in the browser instead.
function guardWindow(window) {
  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    openInBrowser(url);
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    openInBrowser(url);
    return { action: 'deny' };
  });
}

function sendPopoutState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('popout:state', { open: popoutWindow !== null });
  }
}

function windowStateFile() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

// The pop-out reopens where it was last closed, if enough of that place is still on a screen. Otherwise the default
// place is used, so an unplugged monitor can't leave the window off-screen.
function savedPopoutBounds() {
  const saved = loadWindowState(windowStateFile());
  if (!saved) return null;
  const workAreas = screen.getAllDisplays().map((display) => display.workArea);
  return isVisibleOn(saved, workAreas) ? saved : null;
}

// Saves the pop-out's position and size as it moves, resizes, and closes. Moves are saved after a short pause, so a
// drag writes the file once rather than many times.
function rememberPopout(window) {
  let timer = null;
  const save = () => {
    if (window.isDestroyed()) return;
    const maximized = window.isMaximized();
    const bounds = maximized ? window.getNormalBounds() : window.getBounds();
    saveWindowState(windowStateFile(), { ...bounds, maximized });
  };
  const later = () => {
    clearTimeout(timer);
    timer = setTimeout(save, 400);
  };
  window.on('move', later);
  window.on('resize', later);
  window.on('close', save);
}

function openPopout(id) {
  if (popoutWindow !== null) {
    popoutWindow.webContents.send('page:show', id);
    popoutWindow.focus();
    return;
  }
  const saved = savedPopoutBounds();
  popoutWindow = createWindow({ mode: 'lesson', lesson: id, width: 900, height: 700, saved });
  if (saved && saved.maximized) popoutWindow.maximize();
  rememberPopout(popoutWindow);
  popoutWindow.on('closed', () => {
    popoutWindow = null;
    sendPopoutState();
  });
  sendPopoutState();
}

// Stops the run in progress, if there is one.
function stopActiveRun() {
  if (activeRun !== null) {
    activeRun.kill();
    activeRun = null;
  }
}

// Writes the learner's code to a file in the user data folder, runs it, and streams its output to the window that asked.
// A sample (an example in a lesson's text) may come from any lesson, so it needs no step and no homework rules. A step's
// run must be a code step in a language it covers.
async function startRun(sender, lessonId, language, code, sample = false) {
  const item = findItem(lessonId);
  if (sample) {
    if (!item || !SAMPLE_LANGUAGES.includes(language)) throw new Error('This example has no code in that language.');
  } else if (!item || item.kind !== 'step' || !codeLanguages(item).includes(language)) {
    throw new Error('This step has no code in that language.');
  }
  if (typeof code !== 'string' || code.length > 200000) throw new Error('The code is too long to run.');

  const tool = (await toolchains())[language];
  if (!tool || !tool.available) throw new Error(`${language} is not installed on this computer.`);

  stopActiveRun();
  const problem = prerequisiteProblem(language, courseRoot);
  if (problem) throw new Error(problem);
  const dir = runFolderFor(language, lessonId, courseRoot, app.getPath('userData'));
  fs.mkdirSync(dir, { recursive: true });
  const file = FILE_NAMES[language];
  fs.writeFileSync(path.join(dir, file), code, 'utf8');

  const { command, args } = commandFor(language, file, environmentFor(courseRoot));
  const send = (payload) => {
    if (!sender.isDestroyed()) sender.send('run:event', payload);
  };
  const child = spawn(command, args, { cwd: dir, windowsHide: true, shell: false });
  activeRun = child;
  child.stdin.end();

  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill();
  }, TIME_LIMIT_MS[language]);

  child.stdout.on('data', (chunk) => send({ kind: 'stdout', text: chunk.toString() }));
  child.stderr.on('data', (chunk) => send({ kind: 'stderr', text: chunk.toString() }));
  child.on('error', (error) => send({ kind: 'stderr', text: `${error.message}\n` }));
  child.on('close', (exitCode) => {
    clearTimeout(timer);
    if (activeRun === child) activeRun = null;
    send({ kind: 'done', code: exitCode, timedOut });
  });
}

// Writes the learner's code into the run folder, for one step and language.
function writeSource(lessonId, language, code) {
  const item = findItem(lessonId);
  if (!item || item.kind !== 'step' || !codeLanguages(item).includes(language)) {
    throw new Error('This step has no code in that language.');
  }
  if (typeof code !== 'string' || code.length > 200000) throw new Error('The code is too long to check.');
  const problem = prerequisiteProblem(language, courseRoot);
  if (problem) throw new Error(problem);
  const dir = runFolderFor(language, lessonId, courseRoot, app.getPath('userData'));
  fs.mkdirSync(dir, { recursive: true });
  const file = FILE_NAMES[language];
  fs.writeFileSync(path.join(dir, file), code, 'utf8');
  return { item, dir, file };
}

// Runs a command to the end and keeps what it printed. Check needs the output, so this doesn't stream it.
function runToEnd(command, args, cwd, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, windowsHide: true, shell: false });
    child.stdin.end();
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => {
      clearTimeout(timer);
      resolve({ exitCode: null, stdout, stderr: stderr + error.message });
    });
    child.on('close', (exitCode) => {
      clearTimeout(timer);
      resolve({ exitCode, stdout, stderr });
    });
  });
}

// The Check button. The syntax check runs first. If it passes and the step has an expected output, the program runs
// and its output is compared with that expected output. A step with no expected output gets the syntax check only.
async function checkSource(lessonId, language, code) {
  const { item, dir, file } = writeSource(lessonId, language, code);
  const tool = (await toolchains())[language];
  if (!tool || !tool.available) throw new Error(`${language} is not installed on this computer.`);

  const syntax = syntaxCommand(language, file);
  const syntaxResult = await runToEnd(syntax.command, syntax.args, dir, TIME_LIMIT_MS[language]);
  const diagnostics = parseDiagnostics(language, syntaxResult);
  if (diagnostics.length > 0) return { kind: 'diagnostics', items: diagnostics };
  if (item.expected === null) return { kind: 'no-expected' };

  // For C#, the syntax check is a run of the program, so its output is the output to compare.
  let output = syntaxResult;
  if (language !== 'csharp') {
    const run = commandFor(language, file, environmentFor(courseRoot));
    output = await runToEnd(run.command, run.args, dir, TIME_LIMIT_MS[language]);
  }
  if (outputMatches(item.expected, output.stdout)) return { kind: 'passed' };
  return { kind: 'mismatch', expected: item.expected, actual: output.stdout };
}

function registerHandlers() {
  ipcMain.handle('catalog:list', () => summarize(loadCatalog(courseRoot)));
  ipcMain.handle('lesson:open', (_event, id) => openLesson(String(id)));
  ipcMain.handle('state:get', () => loadState(stateFile()));
  ipcMain.handle('state:visit', (_event, id) => {
    const items = currentItems();
    if (!items.some((item) => item.id === id)) throw new Error(`Unknown lesson: ${id}`);
    const next = markVisited(loadState(stateFile()), id);
    saveState(stateFile(), next);
    return next;
  });
  ipcMain.handle('link:open', (_event, url) => openInBrowser(String(url)));
  ipcMain.handle('progress:record', (_event, id, kind, index, value) => {
    const lessonId = String(id);
    if (!currentItems().some((item) => item.id === lessonId)) throw new Error(`Unknown lesson: ${lessonId}`);
    if (kind !== 'quiz' && kind !== 'spoiler') throw new Error(`Unknown progress kind: ${kind}`);
    if (!Number.isInteger(index) || index < 0 || index > 999) throw new Error('Progress index out of range');
    const valid = kind === 'quiz' ? Number.isInteger(value) && value >= 0 && value <= 99 : typeof value === 'boolean';
    if (!valid) throw new Error(`Invalid ${kind} value`);
    saveState(stateFile(), recordProgress(loadState(stateFile()), lessonId, kind, index, value));
  });
  // Clears saved progress and tells every open window to redraw its lesson.
  ipcMain.handle('progress:reset', () => {
    saveState(stateFile(), emptyState());
    for (const window of [mainWindow, popoutWindow]) {
      if (window && !window.isDestroyed()) window.webContents.send('progress:reset');
    }
  });
  // Opens a code step's solution gate. Only then are its solutions sent to the page, and the gate stays open.
  ipcMain.handle('solutions:reveal', (_event, id) => {
    const lessonId = String(id);
    const item = findItem(lessonId);
    if (!isGatedStep(item)) throw new Error('This step has no solutions to reveal.');
    const solutions = codeFiles(item, 'solution');
    if (Object.keys(solutions).length === 0) throw new Error('The solution files for this step are missing.');
    saveState(stateFile(), recordSolutionsRevealed(loadState(stateFile()), lessonId));
    // The sample prompt and its reasoning (prompt.md) are part of the solution. They are rendered, and read-only in the page.
    const promptFile = path.join(item.dir, 'prompt.md');
    const prompt = fs.existsSync(promptFile) ? md.render(fs.readFileSync(promptFile, 'utf8')) : null;
    return { code: solutions, prompt };
  });
  ipcMain.handle('toolchains:get', () => toolchains());
  ipcMain.handle('code:highlight', (_event, code, language) => highlightCode(String(code), String(language)));
  ipcMain.handle('run:start', (event, id, language, code) =>
    startRun(event.sender, String(id), String(language), code),
  );
  ipcMain.handle('sample:run', (event, id, language, code) =>
    startRun(event.sender, String(id), String(language), code, true),
  );
  ipcMain.handle('check:run', (_event, id, language, code) => checkSource(String(id), String(language), code));
  ipcMain.handle('run:stop', () => {
    stopActiveRun();
  });
  ipcMain.handle('popout:open', (_event, id) => {
    openPopout(String(id));
  });
  ipcMain.handle('popout:navigated', (_event, id) => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('page:navigated', String(id));
  });
  ipcMain.handle('popout:sync', (_event, id) => {
    if (popoutWindow !== null) popoutWindow.webContents.send('page:show', String(id));
  });
  ipcMain.handle('popout:close', () => {
    if (popoutWindow !== null) popoutWindow.close();
  });
  ipcMain.handle('popout:state', () => ({ open: popoutWindow !== null }));
}

// A window for the lesson page. The main window shows the whole runner. A pop-out shows the lesson alone.
// A saved place, when given, sets the window's position as well as its size.
function createWindow({ mode, lesson, width = 1280, height = 820, saved = null }) {
  const placement = saved
    ? { x: saved.x, y: saved.y, width: saved.width, height: saved.height }
    : { width, height };
  const window = new BrowserWindow({
    ...placement,
    minWidth: 720,
    minHeight: 520,
    title: 'Authentication for Automation',
    icon: fs.existsSync(path.join(rendererDir, 'app.png')) ? path.join(rendererDir, 'app.png') : undefined,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  guardWindow(window);
  const query = mode ? { mode, lesson: lesson ?? '' } : undefined;
  window.loadFile(path.join(rendererDir, 'index.html'), query ? { query } : undefined);
  return window;
}

app.whenReady().then(() => {
  // The File, Edit, View, and Window menus are not used, so the menu bar is removed.
  Menu.setApplicationMenu(null);
  registerHandlers();
  mainWindow = createWindow({});
  mainWindow.on('closed', () => {
    mainWindow = null;
    stopActiveRun();
    if (popoutWindow !== null) popoutWindow.close();
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow({});
    }
  });
});

app.on('window-all-closed', () => {
  stopActiveRun();
  app.quit();
});
