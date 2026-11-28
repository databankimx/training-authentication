# DataBank IMX - Authentication for Automation

## License and Support

This repository is provided under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the materials in this repository, subject to the terms of that license.

This repository is provided for training and reference purposes only. DataBank IMX does not provide warranties, guarantees, maintenance, troubleshooting, implementation assistance, or technical support for this code or its use. Use it in any way permitted by the MIT License, but you are responsible for evaluating, adapting, testing, and supporting any use of it in your own environment.

---

## What is this repository for?

* A tutorial on proving identity and checking it, for scripts, services, and tools that call other systems
* The client side covers how a script obtains and uses a token without leaking it
* The server side covers how an API checks each token and each request
* Every concept is taught in C#, Python, and JavaScript, and every sample runs without network access
* A desktop lesson runner (Windows) that shows each lesson, runs its code, and checks the exercises

---

## Who is this for?

* Developers and DevOps staff who write scripts or services that call other systems
* Developers who build or maintain APIs that must check who is calling them

**Prerequisites**

* No prior experience with identity systems is assumed
* Some familiarity with a scripting language is helpful, because every exercise is a short program

This is a standalone tutorial. It has no prerequisite tutorial.

---

## About

* **Author:** [Scott McLean](mailto:smclean@databankimx.com)
* **Purpose:** Internal training on authentication and authorization for automation at DataBank IMX

---

## DataBank Responsibilities for Custom Code

All DataBank employees - including those working with AI-assisted tools - are bound by the Development Rules of Engagement, published as the [development-rules-of-engagement.pdf](https://databankimx.sharepoint.com/:b:/r/sites/Hub-PS/DevTools/Policies/development-rules-of-engagement.pdf?d=w1c01477e09e048acbe4c96eba851a183&csf=1&web=1&e=uL7JEw). That document defines the rules for quoting, approving, developing, reviewing, scanning, storing, and delivering custom code for client work.

Key obligations that apply to everyone on every custom code engagement:

* **You own the code you deliver.** This applies equally to hand-written code, AI-assisted code, and AI-generated code. "The AI wrote it" is not an acceptable explanation for a production issue, a failed review, a security finding, or a support problem.
* **Code must be reviewed before delivery.** Review is interactive and must confirm that the code works, meets DataBank standards, is maintainable, and that the developer understands it well enough to explain, debug, and maintain it. Polished or well-formatted output - including AI-generated output - is not evidence of correctness.
* **Code must be in source control before delivery.** All custom code must be committed to the appropriate DataBank GitHub Enterprise repository before it is delivered to a client, regardless of whether the client receives source code, compiled binaries, or deployed functionality.
* **CI scanning must pass before delivery.** Required checks are the standards policy scan, SonarQube, and Snyk. A passing local build is not a substitute.
* **All third-party dependencies must be license-vetted.** The license must permit closed-source commercial use. Copyleft or unclear licensing must be escalated before use. Dependencies must not be added simply because an AI tool suggested them.
* **Only approved AI tools may be used.** Use only IT-approved tools through company accounts. All data entered into AI systems is subject to the [DataBank AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==) and must be treated as confidential by default.
* **Custom code is billable work.** Code must be tied to an approved quote or engagement before commitment or delivery. Development quotes require approval from the Development Director or delegated development leadership before being sent externally.
* **Exceptions require explicit approval.** Time pressure alone is not a reason to bypass quote approval, source control, review, or CI scanning.

See the Development Rules of Engagement linked above for the full policy, including billing and quoting rules, source-code delivery rules, the delivery readiness checklist, and the exception process.

> Policy document links point to DataBank internal locations. They may not open for readers outside DataBank IMX.

---

## Setup and requirements

The tutorial is at [databankimx/training-authentication](https://github.com/databankimx/training-authentication). Run the setup script once from the tutorial's folder, then start the reader:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
cd lesson-runner
npm start
```

The script installs what's missing, including Git, PowerShell 7, Node.js, Python 3.12, and the .NET 10 SDK, and it clones the repository if you run it from elsewhere. [QUICKSTART.md](QUICKSTART.md) has the details.

* Windows 10 or 11
* Git, PowerShell 7, Node.js 24 or later, Python 3.12, and the .NET 10 SDK. The setup script installs any that are missing.
* The Visual Studio Build Tools with the C++ workload, the fallback if Electron's download fails. The setup script installs them if they're missing. They need an Administrator PowerShell.
* Visual Studio Code, with the Microsoft C# and Python extensions. The setup script installs them.
* No account, token, or password is needed for any exercise. The keys, secrets, and tokens in the samples are fake and labelled as such.

---

## Third Party Licenses

Each library used in this repository is listed below. Check each library's license file before you use it outside this repository.

| Component | License | Used for |
|---|---|---|
| Electron | MIT | The lesson runner's desktop window |
| markdown-it | MIT | Rendering lesson Markdown |
| highlight.js | BSD-3-Clause | Coloring code in the lessons and the editor |
| express | MIT | JavaScript sample server |
| jose | MIT | JavaScript sample token handling |
| PyJWT | MIT | Python sample token handling |
| cryptography | Apache 2.0 or BSD-3-Clause | Python sample signatures and keys |
| FastAPI | MIT | Python sample API |
| httpx | BSD-3-Clause | Python sample HTTP calls |

---

## Running the tutorial

### Lesson runner

The reader is a window, built on the same runner as the other tutorials in this collection. Each lesson shows its examples in source, then the output.

* **Run** executes the code in the Source pane, using the language you've chosen. The output appears below the editor.
* **Check** compares the output with the expected result.
* **Show solution (spoiler)** shows one correct answer, after you've tried.
* **Reset** puts back the starter text of an exercise.
* Examples in the lessons can be edited and run in place. Each code block has a copy button, which appears when you hover over it.

The first time you run a C# file, the .NET SDK may print a long welcome message and wait. If it does, press Escape to stop the program, then run it again. After that first run, C# files run as expected.

Keyboard shortcuts:

| Key | Action |
|---|---|
| F5 | Run the step |
| Ctrl+F5 | Check the step |
| Escape | Stop a run that's in progress |
| Ctrl+Left, Ctrl+Right | Previous and next lesson, unless the cursor is in the editor |
| Ctrl+Alt+Shift+Backspace | Clear saved progress: quiz answers, spoiler states, visited steps, and the last lesson opened |

### How the samples run

* **C#** runs as a single file with `dotnet run`. The samples use the .NET 10 SDK, and the lessons say which parts need changes for .NET Framework 4.8.
* **Python** runs in the tutorial's own environment, `.venv`, which the setup script creates from `requirements.txt`.
* **JavaScript** runs from the `samples` folder, which holds its own package file and packages.

Every sample is offline. The keys, secrets, tokens, and addresses are fake, and the reserved `.invalid` domain is used for every address. No sample contacts a real identity provider.

---

## Repository structure

```
training-authentication/
|- ch00-introduction/ to ch23-capstone/   - Chapters, each with lesson.md and step folders
|- ch24-appendix/                        - Cheat sheet, glossary, and refusal and leak guidance
|- lesson-runner/                        - Electron desktop reader
|- samples/                              - JavaScript sample packages (.runs is created by the reader)
|- resources/                            - Design notes (internal, not published)
|- requirements.txt                      - Pinned Python packages
|- setup.ps1
|- QUICKSTART.md
```

Each step folder has a `lesson.json`, a `lesson.md`, and, for exercises, a `main` and `solution` file in each language.

| Chapter | Topic |
|---|---|
| 00 Introduction | What the tutorial covers, the difference between identity and permission, and how it is organized |
| 01 Who Is Calling | Authentication and authorization, the `Authorization` header, and the 401 and 403 responses |
| 02 Keeping Secrets Out of the Code | Where secrets belong, and how to read one safely |
| 03 API Keys | What a key identifies, where it travels, and why it doesn't belong in a URL |
| 04 Inside a Token | The three parts of a JWT, decoding a token, and why decoding is not verifying |
| 05 Checking a Signature | How an HMAC signature proves a token is unchanged, and key pairs |
| 06 Expiry and Refresh | Why tokens expire, safety margins, and refresh tokens |
| 07 Sign-In Strategies | Federation, single sign-on, SAML and OpenID Connect, sessions, provisioning, and multi-factor sign-in |
| 08 The Client Credentials Flow | A script that signs in as itself |
| 09 Authorization Code with PKCE | How a tool that can't keep a secret still signs a person in |
| 10 The Device Code Flow | Signing in on a device with no browser |
| 11 Scopes and Least Privilege | Asking for only the permissions a job needs |
| 12 Identity Platforms in Practice | Matching the concepts to Microsoft Entra ID, Okta, AWS, Google Cloud, and Keycloak |
| 13 When a Request Is Refused | Telling the refusals apart, and retrying safely |
| 14 Logging Without Leaking | What a log line should hold, and how to redact a secret |
| 15 Audits and Compliance | What auditors ask about authentication, and the evidence they need. This describes common practice, not compliance advice |
| 16 Penetration Testing of Authentication | Permission and scope, common flaws, and writing a finding |
| 17 Validating Tokens in an API | The checks on every request, with a protected endpoint tested in a test host |
| 18 Keys, Discovery, and Rotation | Finding an issuer's keys, selecting a key by its identifier, and caching through rotation |
| 19 Protecting Endpoints | Deny by default, per-endpoint decisions, and testing every endpoint |
| 20 Web Application Login | The confidential client, the state and nonce, and the session cookie |
| 21 Cross-Site Request Forgery | How the attack works, and the token and origin checks that stop it |
| 22 Service-to-Service Calls | Each hop's identity, token reuse, token exchange, and the confused deputy |
| 23 Capstone | A client, a simulated identity provider, and a protected API, followed by a reading on moving to a real provider. The real-provider section is optional and has no check |
| 24 Appendix | A cheat sheet, a glossary, a pointer to the platform comparison, and what to do when a request is refused or a secret leaks |

---

## Known conflicts and compatibility notes

* The reader and the setup script run on Windows only.
* The C# samples use the .NET 10 SDK. The lessons say which parts change for .NET Framework 4.8.
* The reader needs the Visual Studio Build Tools as a fallback when Electron's download fails. Installing them needs an Administrator PowerShell.

---

## Authorship note

This tutorial was written by me to teach DataBank IMX developers how authentication works for automation. I used generative AI in places for drafting, review, and cleanup, as with the other training repositories.

~ Scott McLean, 2026

---

## Release version

| Date | Changes |
|---|---|
| [date] | Initial release: Chapters 0 to 24, the lesson runner, and the setup script |

---

## Contact

* [Scott McLean](mailto:smclean@databankimx.com)
* [Dev Team](mailto:development@databankimx.com)
