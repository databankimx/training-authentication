# Homework: The Checks in Order

The starter has the application's origin, and four state-changing requests. Each request has a label, an origin (null when the request has none), the anti-forgery token it sends in its header (null when it sends none), and the token the session holds in its cookie.

Apply these checks in order, and refuse a request at the first one it fails:

1. If the request has an origin, and the origin is not the application's, refuse it with 403.
2. If the request sends no token, refuse it with 403.
3. If the token it sends does not match the session's token, refuse it with 403.
4. Otherwise allow it with 200.

Print one line per request, in the form `label: status`. The expected output is four lines:

~~~text
same origin, matching token: 200
same origin, no token: 403
other origin, matching token: 403
no origin, mismatched token: 403
~~~

> **Aside: the order is part of the rule.**
> The origin check comes first, so a request from another site is refused even when it carries a valid token. The token check then covers requests that have no origin at all.

> **Common mistake.** Allowing a request because its origin is missing, and skipping the token check. A missing origin is not a reason to trust a request, so the token check always runs.

> **.NET Framework 4.8.** This exercise uses `Dictionary`, tuples, and string formatting, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
