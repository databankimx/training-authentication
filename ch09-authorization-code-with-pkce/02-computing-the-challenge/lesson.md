# 2. Computing the Code Challenge

The challenge is computed in three steps: take the verifier's ASCII bytes, take their SHA-256 digest, and encode the digest with base64url without padding. The sample does exactly that, using the verifier from the PKCE specification (RFC 7636), whose challenge is published there too. Since the published challenge is known, a correct result proves your code is right.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
using System.Security.Cryptography;
using System.Text;

// The verifier is the RFC 7636 test value. A real app generates a new random verifier for every sign-in.
var verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
var digest = SHA256.HashData(Encoding.ASCII.GetBytes(verifier));
var challenge = Convert.ToBase64String(digest).TrimEnd('=').Replace('+', '-').Replace('/', '_');

Console.WriteLine($"code_challenge={challenge}");
Console.WriteLine("code_challenge_method=S256");
```
```python
import base64
import hashlib

# The verifier is the RFC 7636 test value. A real app generates a new random verifier for every sign-in.
verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
digest = hashlib.sha256(verifier.encode("ascii")).digest()
challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")

print(f"code_challenge={challenge}")
print("code_challenge_method=S256")
```
```javascript
const crypto = require("node:crypto");

// The verifier is the RFC 7636 test value. A real app generates a new random verifier for every sign-in.
const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
const challenge = crypto.createHash("sha256").update(verifier, "ascii").digest("base64url");

console.log(`code_challenge=${challenge}`);
console.log("code_challenge_method=S256");
```
~~~

The output is the same in every language:

~~~text
code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
code_challenge_method=S256
~~~

> **.NET Framework 4.8.** The C# sample uses `SHA256.HashData`, which is not in .NET Framework 4.8. The 4.8 alternative is to create a `SHA256` instance with `SHA256.Create()`, call `ComputeHash` on the bytes, and use the same encoding steps. The output is identical.

Change one character of the verifier in one tab, and press Run. The challenge changes completely, which is the property the server relies on. A verifier that doesn't produce the stored challenge is refused.

> **Aside: the verifier's length and characters.**
> The specification requires a verifier of 43 to 128 characters from a fixed set: letters, digits, and the characters `-`, `.`, `_`, and `~`. The test value here is 43 characters long, the shortest allowed.

> **Common mistake.** Computing the digest of the base64url text of the verifier, rather than of the verifier itself. The server hashes the verifier as sent, so the challenge must be made from exactly the same characters.

---
