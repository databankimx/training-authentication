# 1. How a Signature Proves a Token Is Unchanged

A signature is a calculation over the first two parts of a token. The issuer computes it once, when the token is created, and attaches it as the third part. A verifier later repeats the same calculation on whatever it received. If the result matches the signature in the token, the header and payload are the ones the issuer signed.

The diagram follows the calculation from the secret to the comparison.

~~~text
header + "." + payload --+
                         |
secret --> HMAC-SHA256 <-+
                |
                v
           digest (bytes)
                |
                v
     expected signature (base64url)
                |
signature in token --> compare (constant time)
                |
                valid if equal, invalid if different
~~~

## The shared-key version

The simplest signature for a JWT uses HMAC with SHA-256. HMAC takes two inputs, a secret key and a message, and produces a fixed-length digest. The message is the header and payload joined by a dot, exactly as they appear in the token. The digest is then encoded with base64url, and that's the signature.

~~~text
signature = base64url( HMAC-SHA256( secret, header + "." + payload ) )
~~~

To verify, the server takes the header and payload it received, computes the same digest with its copy of the secret, and compares the result with the signature in the token. Change a single character in the header or payload and the digest changes completely, so the comparison fails.

## What the comparison must not reveal

The comparison should take the same time whether the first character differs or the last one does. A comparison that stops at the first difference can leak, bit by bit, how much of a forged signature was correct. Use a comparison routine designed for this, which the sample shows.

> **Aside: the algorithm in the header is not a choice for the token to make.**
> The header names the algorithm, and a careless verifier trusts that name. Some older libraries accepted a header that said "none", which means no signature at all. A verifier should decide which algorithms it accepts before it reads the token, and reject any header that asks for something else.

> **Common mistake.** Verifying the signature against the header and payload as parsed JSON, rather than as the exact text in the token. Re-serializing the JSON can change its spacing or order, and then the digest no longer matches. Verify the original text.

---
