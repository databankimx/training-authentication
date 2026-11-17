# Summary: Who Is Calling

This chapter covered how a request says who is calling. You've seen the difference between authentication and authorization, what the Authorization header carries, and how to build a Basic header and a bearer header yourself.

## What you learned

- Authentication proves who is calling. Authorization decides what that caller may do. They happen in that order.
- A 401 means authentication failed, and a 403 means authorization failed.
- The Authorization header carries a scheme and a credential, separated by one space.
- A bearer token is treated as belonging to whoever holds it, so it must be protected like a password.
- Basic joins a user name and a password with a colon, then encodes the result as Base64. Base64 is an encoding, not a secret.
- A credential belongs in the header, never in the URL, where it ends up in logs and history.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
An API returns 403 for a request that carried a valid token. Which step failed?
○ Authentication, because the token must have been wrong.
→ The token was accepted, since the API responded with a decision. Look at the step after that.
◉ Authorization, because the API knows who is calling and has decided against the request.
→ Right. A 403 means the caller is known, and the caller isn't permitted to do this.
○ Neither, because a 403 is a server fault, not a refusal.
→ A 403 is a refusal of a known caller, and it's worth reading that way.
```

```quiz
Which Authorization header is built correctly for a bearer token?
○ Authorization: Bearer: example-token-not-real
→ The colon after the scheme isn't part of the format. Remove it.
○ Authorization=Bearer example-token-not-real
→ The header uses a colon between the name and the value, and a space after the scheme.
◉ Authorization: Bearer example-token-not-real
→ Right. A name, a colon, then the scheme, one space, and the token.
```

```quiz
You want to pass a token to an API. Where should it go?
◉ In the Authorization header, over HTTPS.
→ Right. The header is the standard place for a credential, and HTTPS protects it in transit.
○ In the URL, as a query parameter, because it's easy to test.
→ Query strings are written to logs and history, so a token there leaks easily.
○ In the request body, under a field called token.
→ That works for some APIs, but the Authorization header is the standard place, and it's the one most APIs expect.
```

---
