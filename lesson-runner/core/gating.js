// core/gating.js
//
// Decides which steps have their solutions behind a spoiler. Only homework is gated. A homework step is gated when it
// has code and its lesson.json says so: "section": "homework" and "spoiler": true. Every other step shows its code.
// Nothing here reads or sends code. It only answers the question.

'use strict';

// True when a catalog item is a homework step whose solutions must stay behind the spoiler gate.
function isGatedStep(item) {
  return (
    Boolean(item) &&
    item.kind === 'step' &&
    Array.isArray(item.languages) &&
    item.languages.length > 0 &&
    item.spoiler === true &&
    item.section === 'homework'
  );
}

module.exports = { isGatedStep };
