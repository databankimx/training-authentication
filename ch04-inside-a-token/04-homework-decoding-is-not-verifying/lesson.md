# Homework: Decoding Is Not Verifying

In the last exercise, the token's signature was a placeholder, and the code still read its claims without any complaint. Write a short answer that explains why that's a problem if the code makes a decision from those claims.

Your answer should say what decoding does, what it doesn't do, and name at least two checks a verifier must make before it trusts a token. Write in your own words, and keep it to a few sentences.

~~~spoiler
Decoding only reverses the encoding. It turns the header and payload back into readable JSON, and it proves nothing about who made the token or whether anyone changed it. Anyone can write a payload that says whatever they like, encode it, and attach any signature they want.

Before a verifier trusts a token, it must check the signature against a key it already trusts, which proves the header and payload came from the issuer and weren't altered. It must also check the claims it relies on: the issuer must be expected, the audience must be this API, and the expiry must still be in the future. The algorithm named in the header must be one the verifier allows, so the token can't choose a weak one.

A decision made from unverified claims, such as granting access because the subject says so, trusts whoever wrote the token. That's why the placeholder signature in the exercise was never a safe basis for anything.
~~~

---
