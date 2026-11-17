# Summary: Service-to-Service Calls

This chapter covered how each service in a call chain holds its own identity, how a service reuses its token between calls, how a token exchange carries the user's identity downstream, and why a forwarded token is dangerous. You've cached a service token, and narrowed a token to each downstream call.

## What you learned

- Every service in a chain has its own identity, and asks for a new token for each downstream call.
- Forwarding the token a service received gives the next hop a token meant for another audience, and carries more scope than that hop needs.
- A token is refused by any service whose audience is not its own, so an audience check on every service stops a forwarded token.
- A service reuses its token until it is within the safety margin of expiry, then fetches a new one, and it protects that fetch from concurrent callers.
- A token exchange gives the downstream service a token for its own audience, with the user as the subject and the calling service as the actor.
- The subject says for whom a call is made. The actor says which service made it. Both must be checked, and neither proves the other.
- Workload identities and signed assertions reduce the stored secrets a chain depends on.
- A downstream token can never grant more than the inbound token did.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A service receives a token issued for another service. Its signature and expiry are valid. What should it do?
○ Accept it, because the token is genuine and not expired.
→ Genuine and unexpired do not make a token meant for this service. The audience decides that.
◉ Refuse it, because the token's audience is not this service.
→ Right. Every service refuses a token whose audience is not its own, whatever else checks out.
○ Accept it, and pass it on to the next service, so the chain keeps the same identity.
→ Passing the token on is the mistake this chapter describes. Each hop asks for its own token.
```

```quiz
What does the subject of an exchanged token tell a downstream service?
◉ For whom the call is made, which is the user the request is done on behalf of.
→ Right. The subject names the user, and the actor names the service that made the call.
○ Which service made the call, so the service can be audited.
→ That is the actor's job. The subject says something different.
○ Which scopes the caller may use, so the downstream service needs no further checks.
→ Scopes are one part of the decision. The subject does not replace the scope check.
```

```quiz
A service has a token that expires in 40 seconds, and the safety margin is 60 seconds. What should it do before its next call?
○ Use the token, because it has not expired yet.
→ A token inside the margin should be refreshed before use, even though it is still valid.
○ Fetch a new token for every call from now on, to avoid this situation.
→ Fetching on every call adds cost without making tokens safer. The margin rule is enough.
◉ Fetch a new token before the call, because the remaining time is within the margin.
→ Right. The margin exists so that a call never starts with a token that could expire during it.
```

---
