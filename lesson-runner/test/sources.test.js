// test/sources.test.js
//
// Checks which code a step's Source pane shows when the step has no main files of its own: the first examples block
// in the lesson, for the course's languages.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { sourceFromExamples } = require('../core/sources');

const lesson = [
  '# A reading step',
  '',
  '~~~examples',
  '```csharp',
  'Console.WriteLine("one");',
  '```',
  '```python',
  'print("one")',
  '```',
  '```javascript',
  'console.log("one");',
  '```',
  '~~~',
  '',
  '~~~examples',
  '```python',
  'print("two")',
  '```',
  '~~~',
  '',
].join('\n');

test('the source is the code of the first examples block, for each language', () => {
  const source = sourceFromExamples(lesson);
  assert.deepEqual(Object.keys(source), ['csharp', 'python', 'javascript']);
  assert.equal(source.python, 'print("one")\n');
});

test('a later examples block does not replace the first', () => {
  const source = sourceFromExamples(lesson);
  assert.doesNotMatch(source.python, /two/);
});

test('a block marked as the source is used, even when it is not the first', () => {
  const marked = lesson.replace('~~~examples\n```python', '~~~examples source\n```python');
  const source = sourceFromExamples(marked);
  assert.equal(source.python, 'print("two")\n');
});

test('a lesson with no examples has no source', () => {
  assert.equal(sourceFromExamples('# Just text\n\nNo code here.\n'), null);
});

test('languages the course does not use are ignored', () => {
  const source = sourceFromExamples('~~~examples\n```rust\nfn main() {}\n```\n```python\nprint(1)\n```\n~~~\n');
  assert.deepEqual(Object.keys(source), ['python']);
});

test('an examples block with no course language gives no source', () => {
  assert.equal(sourceFromExamples('~~~examples\n```rust\nfn main() {}\n```\n~~~\n'), null);
});
