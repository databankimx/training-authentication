# 3. The Session and the Nonce

After the callback passes its checks, the application starts its own session for the person. The session is a cookie that the browser sends back with each request, and it's the only credential the browser holds. Its protection matters as much as the login that created it.

## Protecting the session cookie

A session cookie is protected by its attributes, which the server sets when it creates the cookie.

- **HttpOnly** stops page scripts from reading the cookie, which limits what a script injected into the page could take.
- **Secure** sends the cookie only over HTTPS, so it never travels over an unencrypted connection.
- **SameSite** limits when the browser sends the cookie on requests that start on another site, which blocks many cross-site attacks on the session.
- **A short lifetime**, with a sign-out that removes the session on the server as well as in the browser, limits how long a stolen cookie is useful.

The cookie holds an identifier for the session, not the tokens. The session data stays on the server, so the browser never sees an access token or the client secret.

## The nonce

The nonce is a random value the application creates for each login. It's sent with the login request, and the identity provider writes it into the ID token it issues. When the application receives the ID token, it compares the nonce in the token with the one it stored for the login. A match shows the token was issued for this login, and a mismatch means the token belongs to another request, and must be refused.

The nonce and the state do different jobs. The state ties the callback to the browser's session, and it's checked before the code is exchanged. The nonce ties the ID token to the login, and it's checked after the exchange.

> **Aside: a session is a promise, and its lifetime is part of it.**
> A session that never ends keeps a person signed in on a shared machine long after they've left. Choose a lifetime that matches the application's risk, and end the session on the server when the person signs out.

> **Common mistake.** Storing the access token in the session cookie, or in local storage in the browser. The browser then holds the credential that the API accepts, and a script on the page can read it. Keep tokens on the server, and give the browser only the session.

---
