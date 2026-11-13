# Homework: Shared Key or Key Pair

Imagine three services that must each check tokens from one identity provider. Write a short answer that compares two ways the provider could sign the tokens: with one shared HMAC secret that all three services hold, or with a private key that only the provider holds and a public key that all three services can fetch.

For each option, say what a verifier could do with the key it holds, and which service could forge a token if one of them were compromised. Write in your own words, and keep it to a short paragraph for each option.

~~~spoiler
With a shared secret, each service holds the same key that the provider uses to sign. Any of the three can verify tokens, and any of the three can also create new tokens that pass the same check, because the check uses the same key for both jobs. If one service is compromised, the attacker can mint tokens that every service accepts, and the provider has no way to tell them apart from genuine ones.

With a key pair, the provider keeps the private key and signs with it. The three services fetch the public key, which can confirm a signature but can't create one. A compromised service can still read the public key and check tokens, but it can't forge a new one, so the damage is limited to what it could already do. Rotating the key pair is also simpler, because only the provider holds the part that must stay secret.

The trade-off is cost. A key pair is more work to set up, and verification is usually slower. For most providers, the protection against forgery is worth that cost, which is why key pairs are the common choice for tokens verified by many services.
~~~

---
