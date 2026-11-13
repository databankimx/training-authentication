# Summary: Authorization Code with PKCE

This chapter covered how a tool that can't keep a secret still signs a person in safely. You've seen how the verifier and the challenge are made, computed the challenge against the published test value, and written the check the server makes at the token endpoint.

## What you learned

- A tool on a person's machine can't keep a client secret, so PKCE uses a value created fresh for each sign-in.
- The verifier is a random string kept by the tool. The challenge is its SHA-256 digest, encoded with base64url.
- The challenge is sent with the sign-in request, and the server stores it with the code it issues.
- At the token endpoint, the server computes the challenge from the verifier it received and compares it with the stored one.
- An intercepted code is useless alone, because the verifier never leaves the tool.
- The method is S256. Always use it, not the plain method.
- An empty verifier is refused before any comparison, and the comparison itself must be constant time.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
Why does a tool on a person's computer use PKCE instead of a client secret?
○ Because PKCE is faster to compute than a client secret.
→ Speed is not the reason. A secret embedded in the tool can be read by anyone who has the software.
◉ Because the tool cannot keep a secret, so PKCE uses a value created fresh for each sign-in.
→ Right. The verifier stays in the tool for one sign-in and is never reused, so there is no long-lived secret to steal.
○ Because the server no longer checks the authorization code.
→ The server still checks the code. PKCE adds a check on top of it, rather than removing one.
```

```quiz
Which value does the tool send with the sign-in request?
○ The verifier, so the server can compute the challenge itself.
→ The verifier stays with the tool. Sending it would let anyone who sees the request complete the exchange.
○ The client secret, so the server can identify the tool.
→ A tool on a person's machine has no secret to send. The challenge takes its place.
◉ The challenge, which is the S256 digest of the verifier.
→ Right. The challenge can be shared, because it can't be turned back into the verifier.
```

```quiz
A token request arrives with an empty verifier. What should the server do?
◉ Refuse the request, because a missing verifier cannot match the stored challenge.
→ Right. The server checks for a missing verifier before it compares anything.
○ Compute the challenge from the empty string, and accept it if the result matches.
→ The digest of an empty string is a real value, so this would be an accident. Refuse the empty verifier first.
○ Issue the tokens, because the authorization code is still valid.
→ A valid code alone is not enough. The verifier must match the stored challenge.
```

---
