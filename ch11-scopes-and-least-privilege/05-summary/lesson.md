# Summary: Scopes and Least Privilege

This chapter covered what a scope grants, why a token should carry only the scopes its job needs, and how a client can check its requested scopes before it sends them.

## What you learned

- A scope names one permission, and a token carries only the scopes it was granted.
- Least privilege means a job holds only the access it needs, so a leaked token does limited damage.
- Scopes tend to accumulate, so review them against what the job actually does.
- Wildcard and administrative scopes are the most dangerous entries in a request.
- A client can check every requested scope against an allowed list before sending the request.
- The first disallowed scope should stop the request, and a check that passes any non-empty list is no check at all.
- A local check is not the server's decision. The identity provider still decides what a token contains.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A script's token is leaked. Which scopes make the leak most serious?
○ Only the scopes that the script uses every day.
→ Daily use is not the measure. Any scope the token carries is access an attacker could use.
◉ The broad scopes the script never needs, because a leaked token can use them too.
→ Right. A leaked token carries every scope it was granted, so unused broad scopes are pure risk.
○ The scopes with the shortest names, because they are the easiest to guess.
→ Names are not the risk. What the scope allows is.
```

```quiz
A client checks its requested scopes against an allowed list. Which check is correct?
◉ Confirm that every requested scope appears on the allowed list.
→ Right. A single disallowed scope should stop the request.
○ Confirm that the list of requested scopes is not empty.
→ A non-empty list can still contain a scope that isn't allowed. Check each scope.
○ Confirm that the list has no more than five scopes.
→ The number of scopes is not the test. Whether each one is allowed is.
```

```quiz
What is the purpose of a local scope check, when the identity provider also decides what a token contains?
○ It replaces the identity provider's decision, so the server can be skipped.
→ The local check does not replace the server's decision. The server still decides.
○ It is only for documentation, so it has no effect on the request.
→ It has an effect. It stops a request your code should never make.
◉ It stops a request your code should never make, before it reaches the identity provider.
→ Right. The local check catches mistakes early, and the server's check remains the final decision.
```

---
