# Summary: Inside a Token

This chapter took a JSON Web Token apart. You've seen its three parts, how each is encoded, what the common claims mean, and why decoding a token tells you nothing about whether it's genuine.

## What you learned

- A JWT has a header, a payload, and a signature, separated by dots.
- The header describes how the token is signed, and the payload carries the claims.
- Each part is base64url-encoded, which drops the padding and uses URL-safe characters.
- The common claims are `sub`, `iss`, `aud`, `exp`, `iat`, and `nbf`. Times are Unix seconds.
- Decoding reverses the encoding, and proves nothing about who made the token or whether it was changed.
- A verifier checks the signature against a trusted key, and then checks the claims it depends on, such as the issuer, the audience, and the expiry.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A payload's sub claim says "admin". What does that tell you on its own?
○ That the token was issued by an administrator, and can be trusted.
→ The claim only says what the token asserts. Nothing has checked it yet.
◉ Nothing reliable, until the signature has been verified against a key you trust.
→ Right. Until the signature is checked, any claim could have been written by anyone.
○ That the token has administrator permissions in every system.
→ A subject names who the token is about. It doesn't grant permissions in any system.
```

```quiz
What does base64url change compared with ordinary Base64?
◉ It uses URL-safe characters and drops the trailing padding.
→ Right. The encoding is made safe for URLs and headers, and the padding is restored before decoding.
○ It encrypts the contents, so they can't be read.
→ It encodes, and anyone can reverse it. It doesn't encrypt anything.
○ It compresses the contents, so the token is shorter.
→ Compression is a different step. Base64url only changes how the bytes are written.
```

```quiz
A token's exp claim is in the past. What should a verifier do?
○ Accept it, because the signature is still valid.
→ A valid signature doesn't rescue an expired token. Check the expiry too.
○ Accept it for a short grace period, because expiry is only a guideline.
→ Some systems allow a small clock tolerance, but expiry is a rule, not a guideline.
◉ Refuse it, because the token is no longer valid after its expiry time.
→ Right. The expiry is part of the decision, and a token past its expiry is refused.
```

---
