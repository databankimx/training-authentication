# 3. Validating the Claims

The defences in the table are checks that run on every request. This sample shows two of them together: the expiry check and the audience check. The claims are given directly, as already-decoded values, so the example concentrates on the decision. The signature check from Chapter 5 would run first in a real API.

The fixed inputs are three cases. A valid token for this API, an expired token, and a token issued for a different API.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
// The API's own identifier, the time now, and three fixed sets of claims. A real API reads the time from the clock.
var apiAudience = "https://api.example.invalid/reports";
var now = 1893455900L;

static string Decide(long exp, string aud, string expectedAud, long now)
{
    if (exp <= now) return "rejected: expired";
    if (aud != expectedAud) return "rejected: wrong audience";
    return "accepted";
}

Console.WriteLine($"valid:        {Decide(1893456000L, "https://api.example.invalid/reports", apiAudience, now)}");
Console.WriteLine($"expired:      {Decide(1893455000L, "https://api.example.invalid/reports", apiAudience, now)}");
Console.WriteLine($"other API:    {Decide(1893456000L, "https://api.example.invalid/orders", apiAudience, now)}");
```
```python
# The API's own identifier, the time now, and three fixed sets of claims. A real API reads the time from the clock.
api_audience = "https://api.example.invalid/reports"
now = 1893455900

def decide(exp, aud, expected_aud, now):
    if exp <= now:
        return "rejected: expired"
    if aud != expected_aud:
        return "rejected: wrong audience"
    return "accepted"

print(f"valid:        {decide(1893456000, 'https://api.example.invalid/reports', api_audience, now)}")
print(f"expired:      {decide(1893455000, 'https://api.example.invalid/reports', api_audience, now)}")
print(f"other API:    {decide(1893456000, 'https://api.example.invalid/orders', api_audience, now)}")
```
```javascript
// The API's own identifier, the time now, and three fixed sets of claims. A real API reads the time from the clock.
const apiAudience = "https://api.example.invalid/reports";
const now = 1893455900;

function decide(exp, aud, expectedAud, now) {
  if (exp <= now) return "rejected: expired";
  if (aud !== expectedAud) return "rejected: wrong audience";
  return "accepted";
}

console.log(`valid:        ${decide(1893456000, "https://api.example.invalid/reports", apiAudience, now)}`);
console.log(`expired:      ${decide(1893455000, "https://api.example.invalid/reports", apiAudience, now)}`);
console.log(`other API:    ${decide(1893456000, "https://api.example.invalid/orders", apiAudience, now)}`);
```
~~~

The output is the same in every language:

~~~text
valid:        accepted
expired:      rejected: expired
other API:    rejected: wrong audience
~~~

Change the `now` value in one tab to `1893456500`, which is after the valid token's expiry, and press Run. The first line becomes `rejected: expired`. The decision depends on the time the check is run, which is why the clock must be the real one.

> **.NET Framework 4.8.** The C# lines put string literals inside interpolation braces. That's a C# 11 feature, so the 4.8 alternative is to move each literal into a variable before the `Console.WriteLine` line. The logic is unchanged.

> **Aside: the order of the checks is part of the design.**
> The sample checks expiry first, then audience. Either order refuses the bad cases, but a check that stops at its first failure gives a clear reason. Choose an order, and keep it, so the reasons in the logs mean the same thing every time.

> **Common mistake.** Checking that the audience is present, rather than that it matches. A token with any audience passes a presence check, and the token from another API then gets through.

---
