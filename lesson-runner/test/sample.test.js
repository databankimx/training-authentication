// test/sample.test.js
//
// Checks the markup an examples block produces for its samples. Each language's sample is editable and runnable in
// place, the code inside it is escaped, and an example with a ghost marker keeps its read-only rendering.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRenderer } = require('../core/markdown');

const examples =
  '~~~examples\n' +
  '```csharp\nConsole.WriteLine("<b>hi</b>");\n```\n' +
  '```python\nprint("hi")\n```\n' +
  '```javascript\nconsole.log("hi");\n```\n' +
  '~~~\n';

test('every language pane holds one sample, marked for the renderer', () => {
  const html = createRenderer().render(examples);
  for (const language of ['csharp', 'python', 'javascript']) {
    assert.match(html, new RegExp(`class="sample" data-sample data-language="${language}"`));
  }
});

test('a sample keeps its code, escaped, in a block the renderer can turn into an editor', () => {
  const html = createRenderer().render(examples);
  assert.match(html, /<pre><code class="language-csharp">Console\.WriteLine\(&quot;&lt;b&gt;hi&lt;\/b&gt;&quot;\);<\/code><\/pre>/);
  assert.doesNotMatch(html, /<b>hi<\/b>/);
});

test('a sample does not keep the trailing newline of its fence', () => {
  const html = createRenderer().render(examples);
  assert.doesNotMatch(html, /print\(&quot;hi&quot;\)\n<\/code>/);
  assert.match(html, /<code class="language-python">print\(&quot;hi&quot;\)<\/code>/);
});

test('an example with a ghost marker keeps the read-only shadow rendering', () => {
  const html = createRenderer().render(
    '~~~examples\n```csharp\nx{{ghost}}ghosted{{/ghost}}\n```\n```python\ny\n```\n```javascript\nz\n```\n~~~\n',
  );
  assert.match(html, /<pre class="shadow">/);
  assert.match(html, /class="ghost"/);
});

test('a broken examples block still renders as an error, not as samples', () => {
  const html = createRenderer().render('~~~examples\n```csharp\nx\n```\n~~~\n');
  assert.match(html, /quiz-error/);
  assert.doesNotMatch(html, /data-sample/);
});
