# 2. Checking the Example Signature

The sample takes the published example token from the JWT documentation, recomputes its signature with the key that documentation names, and compares the two. The key is well known, so the result proves nothing about who made the token. It shows only how the check is done.

~~~examples source
```csharp
using System.Security.Cryptography;
using System.Text;

// The published example and its well-known key. The signature proves nothing about who made the token.
var secret = "your-256-bit-secret";
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Base64url without padding, as JWTs write it.
static string Base64UrlEncode(byte[] bytes) =>
    Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

var parts = token.Split('.');
var signingInput = Encoding.ASCII.GetBytes($"{parts[0]}.{parts[1]}");
var digest = HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), signingInput);
var expected = Base64UrlEncode(digest);

// FixedTimeEquals compares every byte, so the time taken doesn't reveal where a mismatch starts.
var valid = CryptographicOperations.FixedTimeEquals(
    Encoding.ASCII.GetBytes(expected),
    Encoding.ASCII.GetBytes(parts[2]));
Console.WriteLine(valid ? "valid" : "invalid");
```
```python
import base64
import hashlib
import hmac

# The published example and its well-known key. The signature proves nothing about who made the token.
secret = b"your-256-bit-secret"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

header, payload, signature = token.split(".")
signing_input = f"{header}.{payload}".encode("ascii")
digest = hmac.new(secret, signing_input, hashlib.sha256).digest()
expected = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")

# compare_digest takes the same time whether the first or the last character differs.
valid = hmac.compare_digest(expected, signature)
print("valid" if valid else "invalid")
```
```javascript
const crypto = require("node:crypto");

// The published example and its well-known key. The signature proves nothing about who made the token.
const secret = "your-256-bit-secret";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const [header, payload, signature] = token.split(".");
const expected = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");

// timingSafeEqual needs both values to be the same length, so the lengths are compared first.
const valid =
  expected.length === signature.length &&
  crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
console.log(valid ? "valid" : "invalid");
```
~~~

The output is the same in every language:

~~~text
valid
~~~

> **.NET Framework 4.8.** The C# sample uses `HMACSHA256.HashData` and `CryptographicOperations.FixedTimeEquals`. Neither is in .NET Framework 4.8. The 4.8 alternative is to create an `HMACSHA256` instance with the key, call `ComputeHash`, and compare the two byte arrays in a loop that always examines every byte, combining the differences with a bitwise OR, and never stops at the first mismatch. The rest of the sample works on 4.8 unchanged.

Edit the signature in one tab, change its last character, and press Run. The output changes to `invalid`. That's the whole check: any change to the signed text, or to the signature, makes the calculation disagree.

> **Aside: the key is the whole secret.**
> Anyone who holds the secret can make a signature that passes this check, for any header and payload they like. That's why the key has to be kept as carefully as a password, and why a token signed this way can only be trusted by systems that hold the same key.

> **Common mistake.** Comparing signatures with `==`. Ordinary comparison stops at the first differing character, which is a small but real leak. Use the constant-time comparison each language provides.

---
