# 1. The Three Parts of a Token

A JSON Web Token has three parts, separated by dots. Here's the shape, with each part marked.

~~~text
header.payload.signature
~~~

The header says how the token is signed. The payload carries the claims, which are statements about the caller and the token. The signature is the proof that the header and the payload haven't been changed since the token was issued.

The diagram labels each part of a token and what it carries.

~~~text
  eyJhbGciOiJI...  .  eyJzdWIiOiJz...  .  SflKxwRJSMeKKF2Q...
  ---------------     ---------------     -------------------
      header              payload              signature
  how it's signed     the claims          checked by the verifier
~~~

## Encoding

Each part is encoded with base64url, a version of Base64 that uses characters safe in a URL. The header and the payload are JSON text before encoding. The signature is bytes before encoding. Because base64url uses `-` and `_` in place of `+` and `/`, and drops the trailing `=` padding, a token can be placed in a URL or a header without escaping.

Encoding is not a secret. Anyone who has the token can read the header and payload in seconds, so never assume a token's contents are hidden.

## Common claims

A claim is one entry in the payload. These are the ones you'll meet most often.

- **sub** (subject) identifies who or what the token is about. It might be a person, or a service account.
- **iss** (issuer) names the system that issued the token.
- **aud** (audience) names the API the token is meant for.
- **exp** (expiry) is the time after which the token must not be accepted, in seconds since January 1, 1970, UTC.
- **iat** (issued at) is when the token was issued, in the same format.
- **nbf** (not before) is the earliest time the token may be accepted.

Times in tokens are Unix seconds. A token that expired at a given moment is no longer valid, however well it was signed.

> **Aside: the signature covers the parts, not the meaning.**
> The signature proves the header and payload are unchanged. It doesn't prove that the claims are true. A signed token can still say something false, which is why a server checks the claims it depends on as well as the signature. Chapter 5 covers the signature in detail.

> **Common mistake.** Reading a claim such as `sub` and trusting it without checking the signature first. A claim is only as reliable as the check that came before it.

---
