# Homework: The Decision Table

The starter has a table of the API's endpoints, with the scope each one requires, and an empty requirement for the public endpoint. It also has five requests. Each request names a path, and the scopes its token carries, or no token at all.

Write the decision for each request, following these rules in order:

1. A path that is not in the table is refused with 404. The API does not serve it, and it is not guessed at.
2. A path with an empty requirement is public, and is allowed with 200.
3. A request with no token is refused with 401.
4. A request whose scopes include the required scope is allowed with 200.
5. Any other request is refused with 403.

Print one line per request, in the form `path, label: status`. The label is the scopes joined by a space, or `no token`. The expected output is five lines:

~~~text
/health, no token: 200
/reports, reports.read: 200
/orders, reports.read: 403
/invoices, reports.read orders.write: 404
/reports, no token: 401
~~~

> **Aside: the order of the rules is the policy.**
> Rule 1 comes first, so an unknown path is refused even when its token is valid. Rule 2 comes before the token check, so a public endpoint needs no token at all. Changing the order changes the answers, so keep it fixed.

> **Common mistake.** Treating a missing path as public, or as a 403. An unlisted path is refused because no one decided to open it, and 404 is the honest answer.

> **.NET Framework 4.8.** This exercise uses `Dictionary`, arrays, and string formatting, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
