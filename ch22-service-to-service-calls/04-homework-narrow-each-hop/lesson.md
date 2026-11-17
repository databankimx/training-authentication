# Homework: Narrow Each Hop

A front-end service received a user's token with the scopes `reports.read` and `orders.read`. It now needs to call three downstream services. For each call, the front end should request a token for that service's audience, with only the scope that call needs, and only if the inbound token grants that scope. If the inbound token does not grant it, the front end refuses the call without asking for a token.

The starter has the inbound scopes and the three calls. Each call gives a name, the audience of the target service, and the scope the call needs.

Print one line per call, in one of these two forms:

~~~text
reports: token for https://api.example.invalid/reports with reports.read
invoices: refused, invoices.read not granted
~~~

The expected output is three lines:

~~~text
reports: token for https://api.example.invalid/reports with reports.read
orders: token for https://api.example.invalid/orders with orders.read
invoices: refused, invoices.read not granted
~~~

> **Aside: the inbound token is the ceiling.**
> A downstream token can never grant more than the inbound token did. A call for a scope the inbound token lacks is refused here, not passed on for the downstream service to decide.

> **Common mistake.** Requesting a token with every scope the inbound token holds, because it's simpler. Each downstream call should get only what it needs, so a leak of one hop's token exposes as little as possible.

> **.NET Framework 4.8.** This exercise uses dictionaries, tuples, and string formatting, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
