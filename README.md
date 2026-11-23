# Authentication for Automation

## License and Support

This repository is provided under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the materials in this repository, subject to the terms of that license.

This repository is provided for training and reference purposes only. DataBank IMX does not provide warranties, guarantees, maintenance, troubleshooting, implementation assistance, or technical support for this code or its use. Use it in any way permitted by the MIT License, but you are responsible for evaluating, adapting, testing, and supporting any use of it in your own environment.

## DataBank Responsibilities for Custom Code

All DataBank employees - including those working with AI-assisted tools - are bound by the [Development Rules of Engagement](development-rules-of-engagement.md). That document defines the rules for quoting, approving, developing, reviewing, scanning, storing, and delivering custom code for client work.

Key obligations that apply to everyone on every custom code engagement:

- **You own the code you deliver.** This applies equally to hand-written code, AI-assisted code, and AI-generated code. "The AI wrote it" is not an acceptable explanation for a production issue, a failed review, a security finding, or a support problem.
- **Code must be reviewed before delivery.** Review is interactive and must confirm that the code works, meets DataBank standards, is maintainable, and that the developer understands it well enough to explain, debug, and maintain it. Polished or well-formatted output - including AI-generated output - is not evidence of correctness.
- **Code must be in source control before delivery.** All custom code must be committed to the appropriate DataBank GitHub Enterprise repository before it is delivered to a client, regardless of whether the client receives source code, compiled binaries, or deployed functionality.
- **CI scanning must pass before delivery.** Required checks are the standards policy scan, SonarQube, and Snyk. A passing local build is not a substitute.
- **All third-party dependencies must be license-vetted.** The license must permit closed-source commercial use. Copyleft or unclear licensing must be escalated before use. Dependencies must not be added simply because an AI tool suggested them.
- **Only approved AI tools may be used.** Use only IT-approved tools through company accounts. All data entered into AI systems is subject to the [DataBank AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==) and must be treated as confidential by default.
- **Custom code is billable work.** Code must be tied to an approved quote or engagement before commitment or delivery. Development quotes require approval from the Development Director or delegated development leadership before being sent externally.
- **Exceptions require explicit approval.** Time pressure alone is not a reason to bypass quote approval, source control, review, or CI scanning.

See the [Development Rules of Engagement](development-rules-of-engagement.md) for the full policy, including billing and quoting rules, source-code delivery rules, the delivery readiness checklist, and the exception process.

---

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
