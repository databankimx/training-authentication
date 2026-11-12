// core/sources.js
//
// Works out the code a step's Source pane shows. A step with main files of its own uses them. A step without any takes
// its code from one examples block in its lesson, so the Source pane and the lesson show the same code. The block is the
// one marked "~~~examples source". Without a mark, the first examples block is used. Nothing here runs code or reads
// files. main.js reads the lesson and passes the text in.

'use strict';

const { parseExamples, LANGUAGES } = require('./markdown');

// The code for each language in the chosen examples block of a lesson, or null when there is no usable block.
// Languages the course doesn't use are ignored.
function sourceFromExamples(markdown) {
  const blocks = [...markdown.matchAll(/~~~examples( source)?\n([\s\S]*?)~~~/g)];
  if (blocks.length === 0) return null;
  const chosen = blocks.find((block) => block[1] !== undefined) ?? blocks[0];
  const variants = parseExamples(chosen[2]);
  const found = LANGUAGES.filter((language) => language in variants);
  if (found.length === 0) return null;
  return Object.fromEntries(found.map((language) => [language, variants[language]]));
}

module.exports = { sourceFromExamples };
