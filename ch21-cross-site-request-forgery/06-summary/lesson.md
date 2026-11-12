# Summary: Cross-Site Request Forgery

This chapter covered how a request started from another site reaches a signed-in application, and the defences that refuse it: an anti-forgery token bound to the session, an origin check, and the SameSite cookie attribute. You've refused four forged or mistaken requests in the sample, and applied the checks in order in the homework.

## What you learned

- Browsers send cookies with requests started from other sites, so the session cookie alone does not show that a request was intended.
- The application refuses a state-changing request whose origin is not its own.
- The anti-forgery token must be a value the attacker's page cannot read, sent in a header, and checked against the session.
- The session cookie is not the anti-forgery token, because the browser attaches the cookie to forged requests as well.
- SameSite Strict and Lax limit when the browser sends a cookie on cross-site requests, but the token check stays in place, because the defence should not depend on one browser setting.
- A token is bound to the session that issued it, and rotated when the session starts or changes, not on every request.
- A missing origin is not a reason to skip the token check.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A state-changing request arrives with a valid session cookie, and no anti-forgery token. What should the application do?
○ Accept it, because the session cookie proves the person is signed in.
→ The cookie is sent automatically, even on a forged request. It doesn't show the request was intended.
◉ Refuse it, because the anti-forgery token is missing.
→ Right. The token shows that the request came from the application's own page.
○ Accept it, because the request has the same origin as the cookie.
→ Origin and cookie do not show intent. The anti-forgery token is the check that does.
```

```quiz
Why does an attacker's page not need to read the session cookie to attack a signed-in person?
◉ Because the browser attaches the cookie to the request automatically, and the damage comes from the change the request makes.
→ Right. The attacker needs the request to be sent, not the cookie to be read.
○ Because the attacker can steal the cookie from the person's computer.
→ The attack does not depend on stealing the cookie. The browser sends it.
○ Because the attacker can guess the session identifier.
→ The attack does not rely on guessing. The browser sends the cookie it already holds.
```

```quiz
What is the main effect of the SameSite Lax setting?
○ It stops every request from another site, including links.
→ Lax still sends the cookie on top-level navigations, such as following a link.
○ It replaces the need for an anti-forgery token.
→ The token check stays in place. Browser settings are not a substitute for the application's own defence.
◉ It stops the browser sending the cookie on cross-site requests made by another site's page, while keeping it for ordinary link navigation.
→ Right. Lax blocks the form and script requests that the attack relies on, and keeps the common case working.
```

---
