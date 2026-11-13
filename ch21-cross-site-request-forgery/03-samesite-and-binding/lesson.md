# 3. SameSite and Binding

The anti-forgery token and the origin check are the application's defences. The browser offers one more, through the SameSite attribute on cookies. It tells the browser when to send a cookie with a request that starts on another site, and it's set by the server when the cookie is created.

## The SameSite values

- **Strict** sends the cookie only on requests that start on the same site. A link from another site arrives without the cookie, so the person appears signed out there until they navigate within the application.
- **Lax** sends the cookie on top-level navigations, such as following a link, but not on requests made by another site's page, such as a form or a script posting to the application. Most sessions use Lax, because it keeps the common case of following a link working.
- **None** sends the cookie on every cross-site request. It must be paired with the Secure attribute, and it should be used only when the application truly needs cross-site cookies, because it removes this protection.

SameSite is a strong layer, but it depends on the browser enforcing it, and on the request type. A state-changing request sent by a form on another site is the case Lax blocks. The anti-forgery token still belongs in place, because not every client enforces SameSite, and because the defence should not depend on one browser setting.

## Binding the token to the session

A token is bound to a session when it is valid only for the session that holds it. The application stores the token in the session, and it accepts a request only when the header matches the session's token. A token issued for one session is useless in another, because the other session holds a different value.

A token that isn't bound to a session can be reused. If the application accepts any token it has ever issued, a token obtained from one visit works for every other user's request. Bind the token to the session, and rotate it when the session changes, such as at sign-in.

> **Aside: the cookie is not the token.**
> The session cookie identifies the person. The anti-forgery token proves that the page making the request came from the application. Keep them separate, so that holding one does not give the other.

> **Common mistake.** Rotating the anti-forgery token on every request, so a page that loaded earlier can no longer submit its form. Rotate it when the session starts or changes, and keep it stable for the session's life.

---
