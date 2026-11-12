# Homework: Verify Two Tokens

The starter has the secret and two tokens. The first token is the published example, and its signature is genuine for that secret. The second token is the same as the first, except that one character in its payload has been changed.

Write a function named `verify` that takes a token and the secret, and returns whether the signature is valid. Use the same approach as the sample: recompute the HMAC-SHA256 digest over the header and payload, encode it as base64url without padding, and compare it with the signature in constant time. Then print the result for each token, one per line.

The expected output is:

~~~text
valid
invalid
~~~

> **.NET Framework 4.8.** This exercise uses the same two C# calls as the sample, `HMACSHA256.HashData` and `CryptographicOperations.FixedTimeEquals`. Neither is in .NET Framework 4.8. The 4.8 alternative is described in the sample's lesson, and it's the same check written with an `HMACSHA256` instance and a comparison loop.

> **Aside: one character is enough.**
> The changed token has a payload that differs only in its last character, so the decoded claims are almost the same. The signature doesn't care how small the change is. Any difference in the signed text produces a different digest, so the check fails.

> **Common mistake.** Checking only that the signature has the right length, or that it looks like base64url. Both are true of a forged token too. The check has to recompute the digest and compare it.

Use the starter for your language, write your function and the printing below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
