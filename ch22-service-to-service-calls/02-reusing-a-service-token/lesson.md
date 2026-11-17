# 2. Reusing a Service Token

A service that calls another service many times should not ask the identity provider for a new token on every call. It keeps the token it got, uses it until it is close to expiry, and then fetches a new one. Chapter 6 covered the margin that decides "close to expiry". This sample puts that rule into a cache that a service call would use.

The sample makes four calls at fixed times. The token it fetches lasts an hour, and the margin is one minute. The first call fetches a token. The next two reuse it. The fourth call falls inside the margin, so the cache fetches again. The fetch is simulated, and it counts how many times it runs.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
// Times are in seconds from an arbitrary start, so the output repeats. A real service reads the clock.
const long TokenLifetime = 3600;
const long Margin = 60;
var fetches = 0;
string currentToken = null;
long expiresAt = 0;

// Returns the token to use at this time, and whether it was fetched or reused for this call.
string GetToken(long now, out string outcome)
{
    if (currentToken == null || expiresAt - now <= Margin)
    {
        fetches++;
        currentToken = "service-token-" + fetches;
        expiresAt = now + TokenLifetime;
        outcome = "fetched token";
    }
    else
    {
        outcome = "reused token";
    }
    return currentToken;
}

foreach (var callTime in new long[] { 0, 600, 1200, 3560 })
{
    GetToken(callTime, out var outcome);
    Console.WriteLine($"call at {callTime}: {outcome}");
}
Console.WriteLine($"token fetches: {fetches}");
```
```python
# Times are in seconds from an arbitrary start, so the output repeats. A real service reads the clock.
TOKEN_LIFETIME = 3600
MARGIN = 60

fetches = 0
current_token = None
expires_at = 0

def get_token(now):
    global fetches, current_token, expires_at
    if current_token is None or expires_at - now <= MARGIN:
        fetches += 1
        current_token = f"service-token-{fetches}"
        expires_at = now + TOKEN_LIFETIME
        return "fetched token"
    return "reused token"

for call_time in [0, 600, 1200, 3560]:
    outcome = get_token(call_time)
    print(f"call at {call_time}: {outcome}")
print(f"token fetches: {fetches}")
```
```javascript
// Times are in seconds from an arbitrary start, so the output repeats. A real service reads the clock.
const TOKEN_LIFETIME = 3600;
const MARGIN = 60;

let fetches = 0;
let currentToken = null;
let expiresAt = 0;

function getToken(now) {
  if (currentToken === null || expiresAt - now <= MARGIN) {
    fetches++;
    currentToken = `service-token-${fetches}`;
    expiresAt = now + TOKEN_LIFETIME;
    return "fetched token";
  }
  return "reused token";
}

for (const callTime of [0, 600, 1200, 3560]) {
  console.log(`call at ${callTime}: ${getToken(callTime)}`);
}
console.log(`token fetches: ${fetches}`);
```
~~~

The output is the same in every language:

~~~text
call at 0: fetched token
call at 600: reused token
call at 1200: reused token
call at 3560: fetched token
token fetches: 2
~~~

Change the last call time in one tab to 3000, and press Run. The fourth line becomes `reused token`, and the total becomes 1, because 3000 leaves more than a minute of the token's life. The margin alone decides when the cache refetches.

> **.NET Framework 4.8.** This sample uses `out` parameters, local functions, and string interpolation, which .NET Framework 4.8 supports. The `out var` declaration needs C# 7, which 4.8 supports too.

> **Aside: the cache is shared state.**
> A service that handles many requests at once may run the fetch from several places together. Protect the check and the fetch so that only one caller fetches at a time, as Chapter 6 described for refresh.

> **Common mistake.** Fetching a token for every call "to be safe". It doubles the load on the identity provider, and it slows every call by a network round trip, without making any token safer.

---
