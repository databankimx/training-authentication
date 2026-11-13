# 2. Checking Requested Scopes

A client can protect itself before it sends a request. It keeps a list of the scopes it is allowed to ask for, and it checks every scope in a request against that list. A request with one scope outside the list is refused locally, so a mistake never reaches the identity provider, and never reaches a log as a token request that half-worked.

The sample keeps a small allowed list, checks a requested list against it, and reports the first scope that isn't allowed. The lists are fake and fixed, so the output repeats.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
using System.Collections.Generic;
using System.Linq;

// The scopes this client may request, and the scopes this request asks for. Both are fixed for the example.
var allowed = new HashSet<string> { "reports.read", "orders.read", "reports.write" };
var requested = new[] { "reports.read", "orders.write" };

// The first requested scope that isn't on the allowed list, or null when every scope is allowed.
var refused = requested.FirstOrDefault(scope => !allowed.Contains(scope));
Console.WriteLine(refused is null
    ? "all requested scopes are allowed"
    : $"not allowed: {refused}");
```
```python
# The scopes this client may request, and the scopes this request asks for. Both are fixed for the example.
allowed = {"reports.read", "orders.read", "reports.write"}
requested = ["reports.read", "orders.write"]

# The first requested scope that isn't on the allowed list, or None when every scope is allowed.
refused = next((scope for scope in requested if scope not in allowed), None)
print("all requested scopes are allowed" if refused is None else f"not allowed: {refused}")
```
```javascript
// The scopes this client may request, and the scopes this request asks for. Both are fixed for the example.
const allowed = new Set(["reports.read", "orders.read", "reports.write"]);
const requested = ["reports.read", "orders.write"];

// The first requested scope that isn't on the allowed list, or undefined when every scope is allowed.
const refused = requested.find((scope) => !allowed.has(scope));
console.log(refused === undefined ? "all requested scopes are allowed" : `not allowed: ${refused}`);
```
~~~

The output is the same in every language:

~~~text
not allowed: orders.write
~~~

Add `orders.write` to the allowed set, and press Run. The output becomes `all requested scopes are allowed`. The check is a fixed list, so the decision is only as good as the list, and the list should be reviewed like any other access control.

> **Aside: the local check is not the server's check.**
> The identity provider still decides what a token contains. A local check stops a request your code should never make, and it doesn't replace the server's own decision.

> **Common mistake.** Checking only that the requested scopes are non-empty, and not that each one is allowed. A check that passes any non-empty list lets a single broad scope through.

---
