# Homework: The Unprotected Route

A developer adds a route, `/exports`, to an API. It returns every customer's order history as a file. The route is registered in the same place as the protected ones, but the developer forgets to attach the scope check, so any caller with a valid token, even one with no scopes at all, can download the file.

Write a short answer that does three things. Name the design weakness that let this happen. Say what a deny-by-default design would have done with the same route. Then describe one change to the API's structure that would stop a route being registered without a decision.

Write in your own words, in a short paragraph for each part.

~~~spoiler
The weakness is that protection is optional at the point where a route is added. The route is registered in the same place as the protected ones, so a developer who forgets the check gets a working endpoint with no warning. Nothing in the design asks whether the route has a decision, so the gap is only found by someone reading the code closely, or by an attacker.

A deny-by-default design would have refused `/exports` for every caller, because the route would not be on the table of endpoints the API serves. Its absence from the table is the decision, and the developer would have had to add a row, with a requirement, before the route could be reached. The forgotten check would then show up as a missing row in review.

A structural change would make the requirement part of registration itself. For example, the route-registration function could refuse to register a route without a requirement, which is either a scope or an explicit public marker. Then a route without a decision fails at startup, rather than being exposed in production. The table of requirements can also be checked by a test that calls every registered route with no token and with a token lacking the scope, so a new route without protection fails the build.
~~~

---
