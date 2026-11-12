// core/run.js
//
// Works out how to run a step's code for each language. The runner writes the learner's code to a file with the
// name given here, then starts the command this module returns. Nothing is run from the course folder.

'use strict';

const FILE_NAMES = {
  csharp: 'main.cs',
  python: 'main.py',
  javascript: 'main.js',
};

// The command to run one file. For C#, `dotnet run` runs a single source file directly (.NET 10 SDK).
function commandFor(language, file) {
  switch (language) {
    case 'csharp':
      return { command: 'dotnet', args: ['run', file] };
    case 'python':
      return { command: 'python', args: [file] };
    case 'javascript':
      return { command: 'node', args: [file] };
    default:
      throw new Error(`The runner has no way to run ${language}.`);
  }
}

module.exports = { FILE_NAMES, commandFor };
