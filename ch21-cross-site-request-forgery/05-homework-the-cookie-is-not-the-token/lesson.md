# Homework: The Cookie Is Not the Token

A colleague proposes a shortcut. The application already has a session cookie, so the page should copy that cookie's value into a header on every state-changing request, and the server should accept the request when the two match. Write a short answer that explains why this does not protect the application against a forged request, and what a real anti-forgery token must have that the cookie does not.

Write in your own words, in a short paragraph or two.

~~~spoiler
The browser sends the session cookie automatically with every request to the application, including a forged one. A page on another site can cause the request, and the cookie comes with it. The attacker's request therefore carries the cookie, which is the one value the shortcut compares. The check passes for the attacker, because the value they need is the one the browser attaches for them.

For the page to send a header with the cookie's value, the page would have to read the cookie. A page on another site cannot read the application's cookies, which is why it can't do that. But the shortcut's safety depends on that fact, and the header adds nothing against a forged request, since the attacker never needed to set the header.

A real anti-forgery token must be a value the attacker's page cannot read and the browser does not attach automatically. It is generated for the session, held by the server and delivered to the application's own page, and then sent in a header the page sets. Because no other site can read it, an attacker's request has no way to include the matching value, and the server refuses it.
~~~

---
