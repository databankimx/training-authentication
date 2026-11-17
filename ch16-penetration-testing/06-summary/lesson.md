# Summary: Penetration Testing of Authentication

This chapter covered what makes a penetration test authorized, the authentication flaws testers most often find, and how a developer builds in the defence against each one. You've written a claims check that refuses a token meant for another API, and written a finding without reproduction steps.

## What you learned

- A test is authorized by written permission from the owner of the system, which names the scope, the methods, the dates, and the contacts.
- A tester who finds something outside the scope stops, records it, and reports it, rather than exploring further.
- Common flaws include unlimited sign-in attempts, tokens accepted without an expiry or audience check, permissive redirect addresses, missing PKCE, credentials in URLs and logs, session fixation, over-broad scopes, trusting the algorithm in a token, and a missing state check.
- Each flaw has a defence that belongs in every place a decision is made, not in one place.
- A claims check needs both the expiry check and the audience check, because each one refuses a different case.
- A finding describes the gap, its impact, and the fix. It never includes steps to reproduce the flaw.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A tester finds a system, linked from the one in scope, that the permission does not cover. What should the tester do?
○ Test it briefly, because it is closely related to the system in scope.
→ Closely related is not the same as covered. Testing it without permission is out of bounds.
◉ Stop, record what was seen, and report it to the contact named in the permission.
→ Right. Anything outside the agreed scope is reported, not explored.
○ Test it, and ask for permission afterwards if it causes no problems.
→ Permission must come first. Asking afterwards does not make an unauthorized test lawful.
```

```quiz
A validator checks that a token's audience field is present. Why is that not enough?
◉ Because a token issued for any other API has an audience too, so a presence check accepts it.
→ Right. The audience must match this API's own identifier, not merely exist.
○ Because audience fields are never present in real tokens.
→ They are present in real tokens. The check must test that the value matches this API.
○ Because the audience should be checked before the signature, not after it.
→ The order is a design choice. The problem is that the check tests the wrong thing.
```

```quiz
Which of these is the right content for a finding's recommendation?
○ The exact sequence of requests that caused the failure, so the owner can repeat it.
→ A finding must not include steps to reproduce the flaw, because the report can be read by many people.
○ A statement that the system is insecure, with no further detail.
→ A recommendation must say what defence to build and how to confirm it works.
◉ The defence the owner should build in, and how to confirm that it works.
→ Right. The recommendation names the fix and the evidence that the fix works.
```

---
