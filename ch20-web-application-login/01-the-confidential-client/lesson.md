# 1. The Confidential Client

A web application that runs on a server can keep a secret. It's a confidential client, and the secret never reaches the browser. That's what separates it from the tool in Chapter 9, which couldn't keep one. The secret lets the server prove itself when it exchanges the authorization code for tokens, and the code exchange happens server to server, where the browser can't see it.

## The steps

The diagram lists the steps of a login that the application starts, and which party does each one.

~~~text
1. Browser -> application: open the login page
2. Application -> browser: redirect to the identity provider, with state and nonce
3. Browser -> identity provider: the person signs in
4. Identity provider -> browser: redirect back to the application, with code and state
5. Browser -> application: the callback
6. Application: check that state matches the one stored in the session
7. Application -> identity provider: exchange the code and client secret (server to server)
8. Identity provider -> application: tokens, including an ID token
9. Application: check the ID token, including its nonce
10. Application -> browser: session cookie, and the person is signed in
~~~

## Why the secret stays on the server

The client secret proves the application is who it says it is during the code exchange. If the browser held it, anyone who could read the page could use the secret, and the application's identity would be public. The browser holds only the session cookie, which says who is signed in to the application, not the tokens or the secret.

## The ID token

The exchange returns an ID token that says who signed in. The application checks its signature and audience, as Chapter 17 described, and it also checks the nonce. The nonce is the value the application sent with the login request, and the ID token must carry the same one. A token from a different login does not match, and it is refused.

> **Aside: the browser sees the redirects, not the tokens.**
> The authorization code travels through the browser, but it's useless without the client secret. The tokens never pass through the browser, so the browser never holds an access token.

> **Common mistake.** Putting the client secret in the page's JavaScript, or in a settings file the browser can download. A secret that a browser can read is public, and the confidential client stops being one.

---
