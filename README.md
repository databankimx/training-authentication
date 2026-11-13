# Authentication for Automation

Scripts, services, and tools that call other systems need to prove who they are, and every API they call needs to decide whether to believe them. This tutorial teaches both sides. The client side covers how a script obtains and uses a token without leaking it. The server side covers how an API checks each token and each request. Every concept is taught in C#, Python, and JavaScript, and every sample runs without network access.

## Quick start

The tutorial is at [databankimx/training-authentication](https://github.com/databankimx/training-authentication). Run the setup script once from the tutorial's folder, then start the reader:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
cd lesson-runner
npm start
```

The script installs what's missing, including Git, PowerShell 7, Node.js, Python 3.12, and the .NET 10 SDK, and it clones the repository if you run it from elsewhere. You don't need an account, a token, or a real identity provider. [QUICKSTART.md](QUICKSTART.md) has the details.

## What you need

- Windows 10 or 11
- Git, PowerShell 7, Node.js 24 or later, Python 3.12, and the .NET 10 SDK. The setup script installs any that are missing.
- The Visual Studio Build Tools with the C++ workload, the fallback if Electron's download fails. The setup script installs them if they're missing. They need an Administrator PowerShell.
- Visual Studio Code, with the Microsoft C# and Python extensions. The setup script installs them.

No prior experience with identity systems is assumed. Some familiarity with a scripting language is helpful, because every exercise is a short program.

## The chapters

Work through them in order. Each chapter has a short introduction, a few steps, and a summary with three quizzes. Many steps end with an exercise: you type part of a program in the Source pane, and the check compares its output with the expected result.

0. **Introduction.** What the tutorial covers, the difference between identity and permission, and how it is organized.
1. **Who Is Calling.** Authentication and authorization, the `Authorization` header, and the 401 and 403 responses.
2. **Keeping Secrets Out of the Code.** Where secrets belong, and how to read one safely.
3. **API Keys.** What a key identifies, where it travels, and why it doesn't belong in a URL.
4. **Inside a Token.** The three parts of a JWT, decoding a token, and why decoding is not verifying.
5. **Checking a Signature.** How an HMAC signature proves a token is unchanged, and key pairs.
6. **Expiry and Refresh.** Why tokens expire, safety margins, and refresh tokens.
7. **Sign-In Strategies.** Federation, single sign-on, SAML and OpenID Connect, sessions, provisioning, and multi-factor sign-in.
8. **The Client Credentials Flow.** A script that signs in as itself.
9. **Authorization Code with PKCE.** How a tool that can't keep a secret still signs a person in.
10. **The Device Code Flow.** Signing in on a device with no browser.
11. **Scopes and Least Privilege.** Asking for only the permissions a job needs.
12. **Identity Platforms in Practice.** Matching the concepts to Microsoft Entra ID, Okta, AWS, Google Cloud, and Keycloak.
13. **When a Request Is Refused.** Telling the refusals apart, and retrying safely.
14. **Logging Without Leaking.** What a log line should hold, and how to redact a secret.
15. **Audits and Compliance.** What auditors ask about authentication, and the evidence they need. This describes common practice, not compliance advice.
16. **Penetration Testing of Authentication.** Permission and scope, common flaws, and writing a finding.
17. **Validating Tokens in an API.** The checks on every request, with a protected endpoint tested in a test host.
18. **Keys, Discovery, and Rotation.** Finding an issuer's keys, selecting a key by its identifier, and caching through rotation.
19. **Protecting Endpoints.** Deny by default, per-endpoint decisions, and testing every endpoint.
20. **Web Application Login.** The confidential client, the state and nonce, and the session cookie.
21. **Cross-Site Request Forgery.** How the attack works, and the token and origin checks that stop it.
22. **Service-to-Service Calls.** Each hop's identity, token reuse, token exchange, and the confused deputy.
23. **Capstone.** A client, a simulated identity provider, and a protected API, followed by a reading on moving to a real provider. The real-provider section is optional and has no check.
24. **Appendix.** A cheat sheet, a glossary, a pointer to the platform comparison, and what to do when a request is refused or a secret leaks.

## The reader

The reader is a window, built on the same runner as the other tutorials in this collection. Each lesson shows its examples in source, then the output.

- **Run** executes the code in the Source pane, using the language you've chosen. The output appears below the editor.
- **Check** compares the output with the expected result.
- **Show solution (spoiler)** shows one correct answer, after you've tried.
- **Reset** puts back the starter text of an exercise.
- Examples in the lessons can be edited and run in place. Each code block has a copy button, which appears when you hover over it.

### Keyboard shortcuts

- **F5** runs the step.
- **Ctrl+F5** checks the step.
- **ESC** stops a run that's in progress.
- **Ctrl+Left** and **Ctrl+Right** move to the previous and next lesson, unless the cursor is in the editor.
- **Ctrl+Alt+Shift+Backspace** clears your saved progress: quiz answers, spoiler states, visited steps, and the last lesson you opened. The lesson on screen is then redrawn.

## How the samples run

- **C#** runs as a single file with `dotnet run`. The samples use the .NET 10 SDK, and the lessons say which parts need changes for .NET Framework 4.8.
- **Python** runs in the tutorial's own environment, `.venv`, which the setup script creates from `requirements.txt`.
- **JavaScript** runs from the `samples` folder, which holds its own package file and packages.

Every sample is offline. The keys, secrets, tokens, and addresses are fake, and the reserved `.invalid` domain is used for every address. No sample contacts a real identity provider.

## Accounts and credentials

No exercise needs an account, a token, or a password. Keys and secrets in the samples are fake, and they're labelled as such. Chapter 23 has an optional section for readers who have a test account of their own. It has no check, and the reader never asks for, stores, or displays a credential.

## Conventions used in this tutorial

- Use hyphens, not em dashes.
- Use plain text symbols, not emojis.
- End each lesson with a horizontal rule.

## Folder layout

- `setup.ps1` prepares the tools, the Python environment, the JavaScript packages, and the reader.
- `QUICKSTART.md` explains setup and the reader.
- `requirements.txt` lists the Python packages, with pinned versions.
- `ch00-introduction\` through `ch23-capstone\` hold the chapters, and `ch24-appendix\` holds the appendix. Each chapter has a `lesson.md`, and its steps are folders with a `lesson.json`, a `lesson.md`, and, for exercises, a `main` and `solution` file in each language.
- `lesson-runner\` is the reader: a desktop window built with Electron.
- `samples\` holds the JavaScript sample packages. Its `.runs` folder is created by the reader and isn't committed.
- `resources\` holds the design notes for this tutorial, and it isn't published.

---

*Authentication for Automation is a standalone tutorial. It has no prerequisite tutorial.*
