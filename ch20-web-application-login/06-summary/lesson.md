# Summary: Web Application Login

This chapter covered how a server-side web application signs a person in, why its client secret stays on the server, how the callback is checked against the session, and how the session cookie is protected. You've checked a callback's state against a session, and checked an ID token's nonce against the stored value.

## What you learned

- A confidential client keeps its secret on the server, and uses it in the code exchange, which happens server to server.
- The state is random, is stored in the session, and is compared on every callback before the code is exchanged.
- The nonce is random, is sent with the login, and is compared with the ID token's nonce after the exchange.
- A missing check is not a passing check. Each comparison needs its presence check first.
- The session cookie should be HttpOnly, Secure, and SameSite, and should have a lifetime that matches the risk.
- Tokens stay on the server. The browser holds only the session.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
Why does a web application keep its client secret on the server?
◉ Because the browser can read anything the page holds, so a secret there would be public.
→ Right. A confidential client can keep a secret only where no one else can read it.
○ Because the secret is too large to send to a browser.
→ The size is not the reason. The secret must stay where it cannot be read.
○ Because the identity provider only accepts secrets from servers in a particular data centre.
→ The identity provider does not check where a secret is kept. The point is that the browser must never hold it.
```

```quiz
A callback arrives with a state value that is present but differs from the one stored in the session. What should the application do?
○ Accept the callback, because a state value was supplied.
→ A state that is present but does not match is the case the check exists to catch. Presence is not enough.
○ Accept the callback, then compare the state after the tokens are issued.
→ The state must be compared before the code is exchanged, so a mismatched callback never produces tokens.
◉ Refuse the callback, because the state does not match the one the session stored.
→ Right. A callback is accepted only when its state belongs to the session that started the login.
```

```quiz
Why is the nonce checked against the ID token rather than the callback?
○ Because the callback has no state, so the nonce replaces it there.
→ The callback has a state, and that is checked separately. The nonce is a different value with a different job.
◉ Because the ID token is what must match the login, and the nonce is written into it by the identity provider.
→ Right. The identity provider writes the nonce into the ID token, so the application compares it there.
○ Because the nonce is only checked once the session has expired.
→ The timing is not the reason. The nonce is checked when the ID token arrives.
```

---
