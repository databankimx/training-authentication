// core/run.js
//
// Works out how to run a step's code for each language. The runner writes the learner's code to a file with the
// name given here, then starts the command this module returns.
//
// Python and JavaScript use the tutorial's own environment, which setup.ps1 creates. Python runs with the interpreter
// in the tutorial's .venv. JavaScript runs under samples/, because Node finds packages by walking up from the file's
// folder, and samples/node_modules holds the tutorial's packages.

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const FILE_NAMES = {
  csharp: 'main.cs',
  python: 'main.py',
  javascript: 'main.js',
};

// The Python interpreter inside the tutorial's environment, as setup.ps1 creates it.
function environmentFor(courseRoot) {
  return { python: path.join(courseRoot, '.venv', 'Scripts', 'python.exe') };
}

// The folder a run happens in. JavaScript runs under samples/.runs so that Node finds samples/node_modules. C# and
// Python run in the user data folder.
function runFolderFor(language, lessonId, courseRoot, userDataDir) {
  const name = lessonId.replace(/[^A-Za-z0-9-]+/g, '_');
  if (language === 'javascript') return path.join(courseRoot, 'samples', '.runs', name);
  return path.join(userDataDir, 'runs', name);
}

// What must be in place before a language can run, or null when it is ready. The message says what to do.
function prerequisiteProblem(language, courseRoot) {
  if (language === 'python' && !fs.existsSync(environmentFor(courseRoot).python)) {
    return 'The tutorial Python environment is missing. Run setup.ps1 in the training-authentication folder.';
  }
  if (language === 'javascript') {
    const modules = path.join(courseRoot, 'samples', 'node_modules');
    if (!fs.existsSync(path.join(modules, 'express')) || !fs.existsSync(path.join(modules, 'jose'))) {
      return 'The JavaScript sample packages are missing. Run setup.ps1 in the training-authentication folder.';
    }
  }
  return null;
}

// The command to run one file. For C#, `dotnet run` runs a single source file directly (.NET 10 SDK).
function commandFor(language, file, environment) {
  switch (language) {
    case 'csharp':
      return { command: 'dotnet', args: ['run', file] };
    case 'python':
      return { command: environment.python, args: [file] };
    case 'javascript':
      return { command: 'node', args: [file] };
    default:
      throw new Error(`The runner has no way to run ${language}.`);
  }
}

module.exports = { FILE_NAMES, commandFor, environmentFor, runFolderFor, prerequisiteProblem };
