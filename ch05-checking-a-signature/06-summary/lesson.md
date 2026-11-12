# Summary: Checking a Signature

This chapter showed how a verifier decides a token is unchanged. You've recomputed an HMAC-SHA256 signature, compared it in constant time, and seen the difference between a shared secret and a public and private key pair.

## What you learned

- A signature is an HMAC-SHA256 digest of the header and payload, encoded as base64url.
- A verifier recomputes the digest over the exact text it received, and compares it with the signature.
- Changing one character in the signed text changes the digest, so the check fails.
- The comparison must take the same time however the signatures differ, so use the constant-time routine each language provides.
- A verifier must accept only the algorithms it expects, and never one the token asks for.
- With a shared secret, every verifier can also forge tokens.
- With a key pair, the public key can verify a signature but can't create one, so verifiers can't forge.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A token's payload is changed, and its signature is left as it was. What does the verifier find?
○ The token is valid, because the signature still has the right length.
→ Length tells you nothing. The digest is recomputed, and it won't match.
◉ The recomputed digest differs from the signature, so the token is rejected.
→ Right. Any change to the signed text changes the digest, so the check fails.
○ The token is valid, because only the signature is checked.
→ The signature is checked against the header and payload together, so a change to either one is caught.
```

```quiz
Why does a verifier with a key pair not need to be trusted with the signing key?
◉ Because the public key can check a signature but can't create one.
→ Right. The verifier holds only the half that confirms, so it can't forge a token.
○ Because the verifier never sees the token at all.
→ The verifier receives the token and checks it. It just doesn't need the secret part.
○ Because the key pair is shared among many verifiers, so no one holds it alone.
→ Sharing a key among verifiers is the shared-secret design, where each verifier can forge tokens.
```

```quiz
A developer compares two signatures with an ordinary equality check. What is the risk?
○ Speed is not the concern. The comparison is slower than necessary, but nothing else is wrong.
→ Speed is not the concern. The timing of the comparison can leak information.
○ The comparison will always report valid, because equality is too weak to fail.
→ An ordinary equality check does fail on a mismatch. The risk is about timing, not the result.
◉ The comparison can stop at the first differing character, which can leak how much of a forged signature was right.
→ Right. A comparison that takes a varying amount of time can help an attacker, so use the constant-time routine.
```

---
