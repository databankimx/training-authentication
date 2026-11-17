# 2. Common Flaws and Their Defenses

The flaws below appear again and again in authentication reviews. Each row describes the flaw at the level of design, and the defence a developer builds in. None of the rows describes how to exploit the flaw.

| Flaw | What it looks like in design | Defence |
|---|---|---|
| No limit on sign-in attempts | The login endpoint accepts unlimited guesses from one client | Rate limits per account and per client, with lockout or delay after repeated failures |
| Tokens accepted without checking expiry | The API verifies the signature but never reads the expiry | Check expiry, with a small clock tolerance, on every request |
| Tokens accepted without checking audience | A token issued for one API is accepted by another | Check the audience against the API's own identifier |
| Permissive redirect addresses | The provider sends the person to any address the client asks for | Register exact redirect addresses, and compare them exactly |
| Missing PKCE in a public client | A tool exchanges a code without a verifier | Require PKCE for every public client, with the S256 method |
| Credentials in URLs or logs | Keys and tokens appear in addresses, logs, and error messages | Keep credentials in headers, and redact them before any log is written |
| Session fixation | A session identifier is kept the same after sign-in | Issue a new session identifier at every sign-in |
| Over-broad scopes | A client holds scopes its job never uses | Request and grant the scopes the job needs, and review them |
| Trusting the algorithm in the token | The verifier accepts whatever algorithm the header names | Accept only the algorithms the verifier expects |
| Missing state check | A sign-in response is accepted without checking the state value | Compare the returned state with the one the application sent |

## Reading the table

Most flaws come from a check that exists in a different place, or in a different form, from where it should. A verifier that checks the signature but not the expiry looks secure in a review of the signature code alone. The defence is a check in every place a decision is made, not one check in one place.

> **Aside: the defence is also a test.**
> Each defence in the table can be tested. A token with a past expiry should be refused, and a sign-in with a wrong state should be refused. Build those tests into the code, and the defences stay in place when the code changes.

> **Common mistake.** Relying on a firewall, or on obscurity, instead of the authentication check itself. A system reachable from anywhere on a network needs its own checks, whatever sits in front of it.

---
