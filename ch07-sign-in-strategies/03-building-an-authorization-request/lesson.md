# 3. Building an Authorization Request

When an application sends a person to the identity provider, it sends a URL. The URL carries the parameters that describe the request: which application is asking, where the identity provider should send the person back, what kind of response is wanted, which scopes are requested, and a value the application will check when the person returns.

## The sample

The sample builds that URL from example values. Each value is percent-encoded, so characters such as `:`, `/`, and spaces are written in a form that survives the trip through a browser. The scopes are separated by spaces, which become `%20`.

~~~examples source
```csharp
// Example values only. The client identifier and the state are fake, and the addresses are reserved for examples.
var authorizeEndpoint = "https://login.example.invalid/authorize";
var parameters = new[]
{
    ("client_id", "example-client"),
    ("redirect_uri", "https://app.example.invalid/callback"),
    ("response_type", "code"),
    ("scope", "openid profile"),
    ("state", "example-state"),
};
var query = string.Join("&", parameters.Select(p => $"{p.Item1}={Uri.EscapeDataString(p.Item2)}"));
Console.WriteLine($"{authorizeEndpoint}?{query}");
```
```python
from urllib.parse import quote

# Example values only. The client identifier and the state are fake, and the addresses are reserved for examples.
authorize_endpoint = "https://login.example.invalid/authorize"
parameters = [
    ("client_id", "example-client"),
    ("redirect_uri", "https://app.example.invalid/callback"),
    ("response_type", "code"),
    ("scope", "openid profile"),
    ("state", "example-state"),
]
query = "&".join(f"{name}={quote(value, safe='')}" for name, value in parameters)
print(f"{authorize_endpoint}?{query}")
```
```javascript
// Example values only. The client identifier and the state are fake, and the addresses are reserved for examples.
const authorizeEndpoint = "https://login.example.invalid/authorize";
const parameters = [
  ["client_id", "example-client"],
  ["redirect_uri", "https://app.example.invalid/callback"],
  ["response_type", "code"],
  ["scope", "openid profile"],
  ["state", "example-state"],
];
const query = parameters.map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join("&");
console.log(`${authorizeEndpoint}?${query}`);
```
~~~

The output is the same in every language:

~~~text
https://login.example.invalid/authorize?client_id=example-client&redirect_uri=https%3A%2F%2Fapp.example.invalid%2Fcallback&response_type=code&scope=openid%20profile&state=example-state
~~~

Edit the scope in one tab, add `email` after `profile`, and press Run. The scope value changes to `openid%20profile%20email`, and nothing else does. Adding a scope is a request for more access, so every scope you add must be one the application really needs.

> **Aside: the state is the application's own check.**
> The `state` parameter is a value the application creates, sends out, and checks when the person comes back. A returned response with a different state is a response the application didn't ask for. The check against forged responses depends on the application keeping the value and comparing it.

> **Common mistake.** Building the URL by joining strings without encoding the values. A redirect address with its own query string then splits the parameters in the wrong places. Encode every value, and leave the names as they are.

---
