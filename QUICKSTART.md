# Quick start

This guide gets the Authentication for Automation reader open. The reader is a desktop window, so the tutorial needs no server, no browser, and no accounts. Once the reader is open, the lessons explain the rest.

## Quick setup with the script

### What gets installed

By default, the setup installs:

* Notepad++
* Git
* PowerShell 7
* Node.js 24 or newer
* Python 3.12
* .NET SDK 10
* Microsoft Visual C++ runtime
* VS Code, with the extensions ms-dotnettools.csharp, ms-dotnettools.csdevkit, ms-python.python

The C++ Build Tools aren't installed up front. The script installs them only if Electron's binary can't download.

The setup then runs these steps: Tutorial JavaScript samples; Repository Python environment; Lesson runner packages; Lesson runner tests. At the end it opens the repository in VS Code and starts the lesson runner window (Electron).

### Getting started

There are three methods available to set up this tutorial. They are currently Windows-only.

#### Full Automation (if you don't have Git currently set up)

This process will install Git and copy the repository to a subfolder of `C:\Development\training` and install all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-authentication`
2. Open PowerShell using "Run as Administrator"
3. Run the script below

```pwsh
# Obtain the load tutorial script
irm https://raw.githubusercontent.com/databankimx/training-shared-template/main/load-tutorial.ps1 -OutFile "$env:TEMP\load-tutorial.ps1"

# Perform automated setup
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\load-tutorial.ps1" -RepoUrl https://github.com/databankimx/training-authentication.git
```

#### Automated Setup from Local Repo (assumes you already have Git installed and set up)

In this process, you pull the existing repository and then run its setup script, which installs all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-authentication`
2. Open PowerShell using "Run as Administrator"
3. If you will use the default base directory `C:\Development\training`, run the following:

```pwsh
# Create the base folder if it doesn't exist yet
New-Item -ItemType Directory -Force -Path C:\Development\training | Out-Null
```

4. Clone the repository. If you're using a different base directory, replace `C:\Development\training` with your path:

```pwsh
# Go there and clone the tutorial
cd C:\Development\training
git clone https://github.com/databankimx/training-authentication.git
cd training-authentication
```

5. If desired, edit the setup configuration, which determines what software is installed automatically (see "Change what gets installed" below)

```pwsh
# Optional: edit setup.json before installations
notepad setup.json
```

6. Save the configuration if you edited it, then run the setup script

##### If using the default base path, run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

##### If using a different base path, replace `<BASE_DIR>` with your path and run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -BaseDirectory <BASE_DIR>
```

#### Manual Setup from Local Repo

If you want to do everything manually, you can pull the repository and set up software on your own.

1. Obtain the tutorial's GitHub slug name, which is `training-authentication`
2. Run the script below

```pwsh
git clone https://github.com/databankimx/training-authentication.git
```

3. Review README.md and QUICKSTART.md in the repository for instructions for manual setup.

### Switches and notes

* `-SkipInstall` checks what's installed and installs nothing.
* `-NoLaunch` runs the setup but doesn't open VS Code or start the runner.
* `-SkipTests` skips the course tests, which the setup runs by default.
* Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.
* If an install needs administrator rights, the script stops before installing anything and asks you to run it again from an Administrator PowerShell window.

### Change what gets installed

The settings are in `setup.json`, in the repository folder. Open it in any text editor:

* Set an install's `"install"` to `true` to include it, or `false` to skip it.
* `"pinned"` sets the version. `"extensions"` lists the VS Code extensions to add.
* Save the file, then run `setup.ps1` again. It skips what's already installed.

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

- **The first C# run prints a long .NET welcome message and waits.** This happens once, the first time the .NET SDK runs on your computer. Press Escape to stop it, then run the file again. After that, C# runs as expected.
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
