# 2. Selecting a Key by kid

The sample takes a key set of the kind an issuer publishes, builds a lookup from each key's identifier to its details, and then looks up two identifiers, as two tokens might name them. One is published and the other is not.

The key set is fixed and offline, so the output is the same on every run. The `n` values are placeholders, not real key material. A real API fetches the key set from the address the discovery document names, and this sample replaces that fetch with the fixed text.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
using System.Text.Json;

// The key set as an issuer publishes it. The n values are placeholders, not real key material.
var jwks = @"{
  ""keys"": [
    { ""kty"": ""RSA"", ""kid"": ""rsa-2026-01"", ""use"": ""sig"", ""alg"": ""RS256"", ""n"": ""example-placeholder"", ""e"": ""AQAB"" },
    { ""kty"": ""RSA"", ""kid"": ""rsa-2026-02"", ""use"": ""sig"", ""alg"": ""RS256"", ""n"": ""example-placeholder"", ""e"": ""AQAB"" }
  ]
}";

// Build a lookup from each published kid to the algorithm its key is for.
var algorithms = new Dictionary<string, string>();
using (var document = JsonDocument.Parse(jwks))
{
    foreach (var key in document.RootElement.GetProperty("keys").EnumerateArray())
    {
        algorithms[key.GetProperty("kid").GetString()] = key.GetProperty("alg").GetString();
    }
}

// Two tokens name the key they were signed with. One name is published, and the other is not.
foreach (var kid in new[] { "rsa-2026-02", "rsa-2025-09" })
{
    string algorithm;
    Console.WriteLine(algorithms.TryGetValue(kid, out algorithm)
        ? $"key found: {kid} ({algorithm})"
        : $"unknown kid, refused: {kid}");
}
```
```python
import json

# The key set as an issuer publishes it. The n values are placeholders, not real key material.
jwks = """{
  "keys": [
    {"kty": "RSA", "kid": "rsa-2026-01", "use": "sig", "alg": "RS256", "n": "example-placeholder", "e": "AQAB"},
    {"kty": "RSA", "kid": "rsa-2026-02", "use": "sig", "alg": "RS256", "n": "example-placeholder", "e": "AQAB"}
  ]
}"""

# Build a lookup from each published kid to the algorithm its key is for.
algorithms = {key["kid"]: key["alg"] for key in json.loads(jwks)["keys"]}

# Two tokens name the key they were signed with. One name is published, and the other is not.
for kid in ["rsa-2026-02", "rsa-2025-09"]:
    if kid in algorithms:
        print(f"key found: {kid} ({algorithms[kid]})")
    else:
        print(f"unknown kid, refused: {kid}")
```
```javascript
// The key set as an issuer publishes it. The n values are placeholders, not real key material.
const jwks = `{
  "keys": [
    {"kty": "RSA", "kid": "rsa-2026-01", "use": "sig", "alg": "RS256", "n": "example-placeholder", "e": "AQAB"},
    {"kty": "RSA", "kid": "rsa-2026-02", "use": "sig", "alg": "RS256", "n": "example-placeholder", "e": "AQAB"}
  ]
}`;

// Build a lookup from each published kid to the algorithm its key is for.
const algorithms = new Map(JSON.parse(jwks).keys.map((key) => [key.kid, key.alg]));

// Two tokens name the key they were signed with. One name is published, and the other is not.
for (const kid of ["rsa-2026-02", "rsa-2025-09"]) {
  console.log(algorithms.has(kid) ? `key found: ${kid} (${algorithms.get(kid)})` : `unknown kid, refused: ${kid}`);
}
```
~~~

The output is the same in every language:

~~~text
key found: rsa-2026-02 (RS256)
unknown kid, refused: rsa-2025-09
~~~

Add a third kid, `rsa-2026-03`, to the list in one tab, and press Run. It's refused, because the key set doesn't publish it. Adding it to the key set, and nothing else, makes it accepted. That's the whole effect of a key rotation on the API: the set changes, and the API follows.

> **.NET Framework 4.8.** The C# sample uses `System.Text.Json`, which .NET Framework 4.8 doesn't include. The 4.8 alternative is Newtonsoft.Json: `JObject.Parse(jwks)` gives the same access to `keys`, `kid`, and `alg`. The rest of the sample, including its `using` block and `TryGetValue`, works on 4.8 as written.

> **Aside: the key set is data, not a secret.**
> Public keys are meant to be read by anyone. What must stay protected is the integrity of the set: the API should fetch it from the issuer it trusts, over a secure connection, and not from an address a token gives it.

> **Common mistake.** Treating an unknown kid as a reason to use the only key in the set. The unknown kid means the token was signed with a key the API doesn't know about, and the request should be refused.

---
