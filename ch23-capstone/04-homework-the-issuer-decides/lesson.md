# Homework: The Issuer Decides

The identity provider in the capstone issued a token to any request with the right secret, for whatever scope the client asked for. A real provider decides more carefully. It checks the client, and then it grants only the scopes that client has been registered for, and it reports the scopes it refused.

The starter has one registered client, with its secret and the scopes it may be granted, and three token requests. Write the decision for each request, in this order:

1. If the client is not registered, or the secret is wrong, refuse the request with `invalid_client`.
2. Otherwise, grant each requested scope that the client is registered for, and deny each one it is not.

Print one line per request. For a granted request, print the granted scopes and then the denied ones, in the form `request 1: granted reports.read, denied orders.write`. For a refused request, print `request 2: refused, invalid_client`. Keep the scopes in the order they were requested.

The expected output is:

~~~text
request 1: granted reports.read, denied orders.write
request 2: refused, invalid_client
request 3: refused, invalid_client
~~~

> **Aside: the provider's list is the ceiling.**
> A client can ask for any scope it likes. The provider decides what it gets, and it never grants a scope that the client's registration does not name. A scope that is missing from the registration is a scope the client cannot have, however it asks.

> **Common mistake.** Granting every requested scope, and leaving the API to refuse the ones it doesn't want. The token then carries access that should never have been issued, and any service that receives it can see that access.

> **.NET Framework 4.8.** This exercise uses dictionaries, tuples, and string formatting, which .NET Framework 4.8 provides. The C# solution uses the `Split(' ', ...)` overload, which exists only in .NET Core. On 4.8, use `Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)`.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
