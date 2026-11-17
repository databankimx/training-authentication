# 2. Building the Token Request

The token request is a form body, a list of name and value pairs joined by `&`, with each value encoded. The body is what the script sends. The sample builds that body, then prints a copy in which the secret is replaced by `****`. The printed copy is safe to show. The body the script would really send contains the real secret.

## The sample

The client identifier and the secret are fake, and the token endpoint is a reserved example address. The sample does not send anything. It only builds and prints the request.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
using System.Linq;

// Example values only. The secret is fake, and the endpoint is reserved for examples. Nothing is sent.
var tokenEndpoint = "https://login.example.invalid/oauth/token";
var parameters = new[]
{
    ("grant_type", "client_credentials"),
    ("client_id", "example-client"),
    ("client_secret", "example-secret-not-real"),
    ("scope", "reports.read"),
};

// The body a real request would send, with the secret in it.
var body = string.Join("&", parameters.Select(p => $"{p.Item1}={Uri.EscapeDataString(p.Item2)}"));

// The same body with the secret masked, which is the only form the script shows.
var shown = string.Join("&", parameters.Select(p =>
    p.Item1 == "client_secret" ? $"{p.Item1}=****" : $"{p.Item1}={Uri.EscapeDataString(p.Item2)}"));

Console.WriteLine($"POST {tokenEndpoint}");
Console.WriteLine(shown);
```
```python
from urllib.parse import quote

# Example values only. The secret is fake, and the endpoint is reserved for examples. Nothing is sent.
token_endpoint = "https://login.example.invalid/oauth/token"
parameters = [
    ("grant_type", "client_credentials"),
    ("client_id", "example-client"),
    ("client_secret", "example-secret-not-real"),
    ("scope", "reports.read"),
]

# The body a real request would send, with the secret in it.
body = "&".join(f"{name}={quote(value, safe='')}" for name, value in parameters)

# The same body with the secret masked, which is the only form the script shows.
shown = "&".join(
    f"{name}=****" if name == "client_secret" else f"{name}={quote(value, safe='')}"
    for name, value in parameters
)

print(f"POST {token_endpoint}")
print(shown)
```
```javascript
// Example values only. The secret is fake, and the endpoint is reserved for examples. Nothing is sent.
const tokenEndpoint = "https://login.example.invalid/oauth/token";
const parameters = [
  ["grant_type", "client_credentials"],
  ["client_id", "example-client"],
  ["client_secret", "example-secret-not-real"],
  ["scope", "reports.read"],
];

// The body a real request would send, with the secret in it.
const body = parameters.map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join("&");

// The same body with the secret masked, which is the only form the script shows.
const shown = parameters
  .map(([name, value]) => (name === "client_secret" ? `${name}=****` : `${name}=${encodeURIComponent(value)}`))
  .join("&");

console.log(`POST ${tokenEndpoint}`);
console.log(shown);
```
~~~

The output is the same in every language:

~~~text
POST https://login.example.invalid/oauth/token
grant_type=client_credentials&client_id=example-client&client_secret=****&scope=reports.read
~~~

Change the scope in one tab to `reports.read reports.write`, and press Run. The encoded scope becomes `reports.read%20reports.write`. Notice that the secret stays masked, and that the code builds the real body the same way it builds the shown one.

> **Aside: the body and the printout are different on purpose.**
> A script needs the real secret to send the request, but nothing it prints or logs should contain it. Building the shown form from the same parameters, with one field masked, keeps the two in step without copying the secret into output.

> **Common mistake.** Logging the request body while debugging a failed token request. The body holds the secret, so the log holds it too. Log the endpoint and the status code, and keep the body out of the log.

---
