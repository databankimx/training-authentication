// test/gating.test.js
//
// The spoiler gate applies to homework only. A step is gated when it has code, is homework, and is marked as a spoiler.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { isGatedStep } = require('../core/gating');

function step(overrides = {}) {
  return {
    kind: 'step',
    languages: ['csharp', 'python', 'javascript'],
    spoiler: true,
    section: 'homework',
    ...overrides,
  };
}

test('homework with a spoiler and code is gated', () => {
  assert.equal(isGatedStep(step()), true);
});

test('a step that is not homework is not gated, even with a spoiler flag', () => {
  assert.equal(isGatedStep(step({ section: null })), false);
  assert.equal(isGatedStep(step({ section: 'lesson' })), false);
});

test('homework without the spoiler flag is not gated', () => {
  assert.equal(isGatedStep(step({ spoiler: false })), false);
  assert.equal(isGatedStep(step({ spoiler: undefined })), false);
});

test('a step with no code is not gated', () => {
  assert.equal(isGatedStep(step({ languages: [] })), false);
});

test('a chapter introduction is not gated', () => {
  assert.equal(isGatedStep({ kind: 'chapter', section: 'homework', spoiler: true }), false);
});

test('a missing item is not gated', () => {
  assert.equal(isGatedStep(null), false);
  assert.equal(isGatedStep(undefined), false);
});

test('the spoiler flag must be exactly true, not a truthy value', () => {
  assert.equal(isGatedStep(step({ spoiler: 'yes' })), false);
  assert.equal(isGatedStep(step({ spoiler: 1 })), false);
});
