# 2. Decoding an Example Token

Decoding means reversing the base64url encoding and reading the JSON that comes out. It takes a few lines in any language, and it's worth doing once by hand, because it shows you what's inside a token before any library hides the details.

## The example

The token below is the public example from the JWT documentation. It's signed with a secret that is widely known, so it's safe to decode here, and it must never be trusted for anything real. The sample decodes the payload and prints three claims.

~~~examples source
```csharp
using System.Text;
using System.Text.Json;

// A public example from the JWT documentation. It is signed with a well-known secret, so never trust it for anything real.
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Restores the standard Base64 characters and padding, then decodes the bytes.
static byte[] Base64UrlDecode(string input)
{
    var text = input.Replace('-', '+').Replace('_', '/');
    switch (text.Length % 4)
    {
        case 2: text += "=="; break;
        case 3: text += "="; break;
    }
    return Convert.FromBase64String(text);
}

var parts = token.Split('.');
var payloadJson = Encoding.UTF8.GetString(Base64UrlDecode(parts[1]));
using var document = JsonDocument.Parse(payloadJson);
var claims = document.RootElement;

var subject = claims.GetProperty("sub").GetString();
var name = claims.GetProperty("name").GetString();
var issuedAt = claims.GetProperty("iat").GetInt64();
Console.WriteLine($"Subject: {subject}");
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Issued at (Unix seconds): {issuedAt}");
```
```python
import base64
import json

# A public example from the JWT documentation. It is signed with a well-known secret, so never trust it for anything real.
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

# Restores the padding that base64url leaves out, then decodes the bytes.
def base64url_decode(text):
    padded = text + "=" * (-len(text) % 4)
    return base64.urlsafe_b64decode(padded)

header, payload, signature = token.split(".")
claims = json.loads(base64url_decode(payload))

print(f"Subject: {claims['sub']}")
print(f"Name: {claims['name']}")
print(f"Issued at (Unix seconds): {claims['iat']}")
```
```javascript
// A public example from the JWT documentation. It is signed with a well-known secret, so never trust it for anything real.
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Node reads base64url directly, so the payload needs no conversion.
const [header, payload, signature] = token.split(".");
const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

console.log(`Subject: ${claims.sub}`);
console.log(`Name: ${claims.name}`);
console.log(`Issued at (Unix seconds): ${claims.iat}`);
```
~~~

The output is the same in every language:

~~~text
Subject: 1234567890
Name: John Doe
Issued at (Unix seconds): 1516239022
~~~

Press Run in each tab, then edit the token in one of them, change a single character in the payload, and press Run again. The decoded output changes, or the decode fails. Either way, notice that nothing in the sample checked whether the token is genuine. That check is the subject of Chapter 5.

> **Aside: why the padding matters.**
> Base64 pads the output to a multiple of four characters with `=`. Base64url drops the padding, so a decoder must add it back before decoding. Most mistakes in hand-written decoders come from that step.

> **Common mistake.** Decoding the signature as if it were JSON. The signature is raw bytes, not a claim, and it only makes sense to a verifier. Decode the header and payload, and leave the signature to the check.

---
