// test/run.test.js
//
// Checks the command for each language, and the toolchain check with a stand-in for the real commands.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { FILE_NAMES, commandFor } = require('../core/run');
const { probe, probeAll, COMMANDS } = require('../core/toolchains');

test('each course language maps to its source file name', () => {
  assert.deepEqual(FILE_NAMES, { csharp: 'main.cs', python: 'main.py', javascript: 'main.js' });
});

test('each language runs its file with its own command', () => {
  const environment = { python: 'C:\\course\\.venv\\Scripts\\python.exe' };
  assert.deepEqual(commandFor('csharp', 'main.cs', environment), { command: 'dotnet', args: ['run', 'main.cs'] });
  assert.deepEqual(commandFor('python', 'main.py', environment), { command: environment.python, args: ['main.py'] });
  assert.deepEqual(commandFor('javascript', 'main.js', environment), { command: 'node', args: ['main.js'] });
});

test('an unknown language is refused', () => {
  assert.throws(() => commandFor('typescript', 'main.ts', {}), /no way to run typescript/);
});

test('a language whose command runs is available, with its first line of version output', async () => {
  const fakeRun = (command, args, options, callback) => callback(null, '10.0.100\nmore text\n', '');
  const result = await probe('csharp', fakeRun);
  assert.deepEqual(result, { available: true, version: '10.0.100' });
});

test('a language whose command is missing is unavailable', async () => {
  const fakeRun = (command, args, options, callback) => callback(new Error('not found'), '', '');
  const result = await probe('python', fakeRun);
  assert.deepEqual(result, { available: false, version: null });
});

test('probeAll checks every course language', async () => {
  const fakeRun = (command, args, options, callback) =>
    command === 'node' ? callback(new Error('missing'), '', '') : callback(null, 'v1\n', '');
  const result = await probeAll(fakeRun);
  assert.deepEqual(Object.keys(result).sort(), Object.keys(COMMANDS).sort());
  assert.equal(result.javascript.available, false);
  assert.equal(result.csharp.available, true);
  assert.equal(result.python.available, true);
});
