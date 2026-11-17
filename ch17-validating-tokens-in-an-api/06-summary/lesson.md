# Summary: Validating Tokens in an API

This chapter covered what an API checks on every token, in what order, and why the API holds its own settings for the issuer, the keys, and the algorithm. You've seen a protected endpoint tested with three fixed requests, and narrowed a validator to the one algorithm the API accepts.

## What you learned

- Every request's token must pass a fixed sequence of checks: the header, the algorithm, the signature, the issuer, the audience, and the expiry.
- The order matters. The algorithm decides how the signature is checked, and claims are read only after the signature has been verified.
- Each check refuses the request on its own, so a validator that skips one check accepts a class of tokens it should refuse.
- The clock tolerance should be small, because a large one lets a leaked token stay usable.
- The API chooses its issuers, keys, and algorithms from its own configuration. A token is the thing being checked, not the source of the rules.
- A test host runs the real pipeline without a network, so a test of the protected endpoint exercises the real validation.
- A test should include one request for each refusal the API is meant to make.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
Why does the validator check the algorithm before the signature?
○ Because the signature is always checked first in every library.
→ The order is a design choice. The reason is that the algorithm decides how the signature is checked.
◉ Because the algorithm decides how the signature is checked, so the allowed list must be applied first.
→ Right. An algorithm the API does not accept must be refused before the signature is checked with it.
○ Because the expiry is the only check that matters, and the others come after it.
→ Expiry is one check among several, and no single check is enough on its own.
```

```quiz
A validator checks the signature and the expiry, but not the audience. What can happen?
◉ A token issued for a different API from the same issuer is accepted.
→ Right. The audience check is what refuses tokens meant for other APIs.
○ Nothing, because a signature from the issuer proves the token was meant for this API.
→ A signature proves who issued the token, not who it is for. Another API from the same issuer is a different audience.
○ The token is refused, because a missing audience check makes every token invalid.
→ A missing check does not refuse tokens. It lets through the ones that check was meant to catch.
```

```quiz
Where should the validator get the key used to check a signature?
○ From the key identifier in the token's header, looked up in whatever location the header names.
→ The token must not choose the key it is checked against, since the token is the thing being checked.
○ From the key the token itself includes, because the issuer put it there.
→ A key inside the token is the token's own claim. The API must use a key it trusts for the issuer.
◉ From the API's own configuration, or from the issuer it trusts for that issuer.
→ Right. The keys belong to the API's trust decisions, not to the token.
```

---
