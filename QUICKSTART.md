# Quick start

This guide gets the Authentication for Automation reader open. The reader is a desktop window, so the tutorial needs no server, no browser, and no accounts. Once the reader is open, the lessons explain the rest.

## Quick setup with the script

The tutorial lives at [databankimx/training-authentication](https://github.com/databankimx/training-authentication).

`setup.ps1` does the whole setup. You can run it from anywhere. If it isn't inside the repository, it clones the repository into `C:\Development\training\training-authentication` and runs the cloned copy. It then:

- checks for Git, and installs it with winget if it's missing
- checks for PowerShell 7, and installs it with winget if it's missing. If the script was started in Windows PowerShell 5.1, it relaunches itself in PowerShell 7 once that's installed
- checks for Node.js 24 or later, and installs the LTS release with winget if it's missing
- checks for Python 3.12, installs it with winget if it's missing, creates the `.venv` folder, and installs the packages in `requirements.txt`
- checks for the C++ Build Tools, which are the fallback if Electron's download fails
- installs the JavaScript sample packages in `samples\`
- installs the reader's packages exactly as recorded in `lesson-runner\package-lock.json`
- makes sure the Electron binary is present, and if its download fails, rebuilds the native modules with the C++ environment and tries again
- checks for Visual Studio Code, installs it with winget if it's missing, and adds the Microsoft C# and Python extensions
- runs the reader's tests, and stops at the first failure

It's safe to run more than once. Anything already in place is skipped. The script doesn't change your global Git, Python, or Node.js settings, and it doesn't ask for an account or a credential.

Open PowerShell, and run:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

The `-ExecutionPolicy Bypass` part lets this one script run. It doesn't change any setting on your machine.

The C++ Build Tools are about 4 to 5 GB and can take several minutes. They need an **Administrator** PowerShell. If you aren't an administrator, the script stops at that step and says so. Open PowerShell as Administrator, and run the script again.

If a tool was installed during the run, open a new PowerShell window and run the script again, so the new tool is on the `PATH`.

If you only want to check your setup, without installing anything, add `-SkipInstall`:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -SkipInstall
```

When the script finishes, it prints a summary and the command to start the reader. Every line should say `ok`.

Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.

## Requirements

- Windows 10 or 11
- Git, PowerShell 7, Node.js 24 or later, Python 3.12, and the .NET 10 SDK. The script installs any that are missing.
- The Visual Studio Build Tools with the C++ workload, the fallback for Electron's download. The script installs them if they're missing.
- Visual Studio Code, with the Microsoft C# and Python extensions. The script installs them.

## Start the reader

```pwsh
cd C:\Development\training\training-authentication\lesson-runner
npm start
```

The reader opens on the first chapter. Close the window normally to stop it.

Run `npm start` from the `lesson-runner` folder. The tutorial's root folder has no `package.json` for the reader, so `npm start` there fails.

## How the lessons work

- The **sidebar** lists the chapters, and the steps in the chosen chapter. Use **Next** and **Previous** to move through the tutorial in order.
- Read each lesson in the **Lesson** tab. Examples show the code, then its output.
- Exercises use the **Source** tab. The first lines of the program are usually given. Type the rest, then press **Run** to see the output, or **Check** to compare it with the expected result.
- Examples in the lessons can be edited and run in place, without changing the exercise.
- A failed check shows what was different, and a passed check shows a green message.
- **Show solution (spoiler)** opens one correct answer, read-only. Try the exercise first.
- **Reset** puts back the text the exercise started with.
- Each code block has a copy button, which appears when you hover over it.

### Keyboard shortcuts

- **F5** runs the step.
- **Ctrl+F5** checks the step.
- **ESC** stops a run that's in progress.
- **Ctrl+Left** and **Ctrl+Right** move to the previous and next lesson, unless the cursor is in the editor.
- **Ctrl+Alt+Shift+Backspace** clears your saved progress, as described below.

The chapter called **Appendix** is a cheat sheet, glossary, and a guide to refused requests and leaked secrets. It has no exercises.

## How the samples run

- **C#** samples run as a single file with `dotnet run`. The first run takes longer, while the packages are fetched.
- **Python** samples run with the interpreter in `.venv`, so they use the packages the setup installed.
- **JavaScript** samples run from `samples\.runs`, which lets Node find the packages in `samples\node_modules`.

Samples that start a local server, in Chapters 17 to 23, can trigger a **Windows Firewall** prompt the first time they run. The prompt asks whether to allow Node.js to accept connections. The samples only use 127.0.0.1, so choose **Allow** for private networks. There's no need to allow public networks.

## The practice files

The reader doesn't need a practice folder. Exercises run their programs in the reader's own run folders, and nothing is written to your repositories or your global settings. The samples fetch no data from the network.

## Your progress

The reader saves your progress as you go, in a folder outside the repository, so it's never committed:

```
%APPDATA%\training-authentication-runner\
```

The saved progress includes which lessons you've visited, the solutions you've revealed, and the last lesson you opened. To clear it, press **Ctrl+Alt+Shift+Backspace**. The lesson on screen is redrawn with the cleared progress, and the next start opens the first lesson.

## Troubleshooting

- **Setup says a tool is missing and winget is not available.** Install **App Installer** from the Microsoft Store, or install the missing tool by hand, then run the script again.
- **Setup says Node.js is too old.** Install the current LTS release from [nodejs.org](https://nodejs.org), open a new PowerShell window, and run the script again.
- **Setup says Python 3.12 isn't available.** Install Python 3.12 from [python.org](https://www.python.org), or run the script again so winget can install it. Check that `py -3.12 --version` works in a new window.
- **Setup says the C++ Build Tools need an Administrator.** Open PowerShell as Administrator, then run the script again.
- **Setup says `pip install` failed.** Check the messages above it. Usually the network or a proxy is the cause. Then run the script again.
- **Setup says `npm ci` or `npm install` failed.** Check your network access to the npm registry, then run the script again. Don't delete `package-lock.json` to get past the error.
- **Setup says the Electron binary still won't download.** Check your network access to github.com, and that the C++ Build Tools are installed. Then run the script again.
- **Setup says the tests failed.** The message names the failing check. Send the full output to the tutorial's owner.
- **Setup says the folder is not a complete copy of the tutorial.** The folder at `C:\Development\training\training-authentication` exists but has no reader in it. Move or rename it, then run the script again, so the repository can be cloned into a new folder.
- **A Python sample says `No module named 'jwt'`, or a JavaScript sample says `Cannot find package 'express'`.** The packages aren't installed where the reader looks. Run the setup script again. The reader also says this in the output, and names the script to run.
- **A C# sample prints warnings about vulnerabilities or nullable references.** The samples turn these off with lines at the top of each file. If a warning still appears, send the full output to the tutorial's owner.
- **`npm start` fails with "package.json not found".** You're in the tutorial's root folder. Change to `lesson-runner` first.
- **A sidebar label shows a number twice.** Close the reader and open it again. If it persists, send a screenshot to the tutorial's owner.
- **A JavaScript sample waits, then says it can't connect.** Windows Firewall may have blocked the local connection. Allow Node.js for private networks, then run the sample again.
