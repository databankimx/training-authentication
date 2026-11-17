# 3. Public and Private Keys

The shared-key check has a weakness that matters at scale. Every system that verifies a token must hold the same secret, and any of them could use it to make tokens of its own. Most identity providers avoid that by signing with a key pair instead. The issuer keeps the private key secret, and it publishes the public key, which anyone may hold.

## The idea

The issuer signs the header and payload with its private key. A verifier checks the signature with the matching public key. The public key can confirm a signature, but it can't make one. So a verifier can check tokens without any ability to forge them.

That changes who has to be trusted. In the shared-key version, every verifier is a potential issuer. With a key pair, only the issuer holds the private key, and a compromised verifier can't mint tokens.

The diagram shows who holds which key, and what each holder can do with it.

~~~text
Issuer (identity provider)                     Verifier (your API)
--------------------------                     -------------------
private key --signs--> token ------------>     public key --checks-->
(kept secret)                                  (published, can't forge)
~~~

## The algorithms

Common asymmetric algorithms for tokens include RS256, which uses RSA, and ES256, which uses elliptic-curve signatures. The names follow the same pattern as HS256: a family, then the hash. The header of a token names which one was used, and the verifier must accept only the algorithms it expects, as the last step explained.

## Where the public keys come from

An identity provider publishes its public keys at a well-known address, as a JSON Web Key Set. A verifier fetches that set, picks the key whose identifier matches the token's header, and checks the signature. Chapter 18 covers fetching, caching, and rotating those keys on the server side.

> **Aside: why the public key can be public.**
> The security of the pair doesn't depend on hiding the public key. It depends on keeping the private key secret. Publishing the public half is the whole point, because it lets anyone verify without being able to sign.

> **Common mistake.** Using the public key as the secret in a shared-key check, or the reverse. The two keys are not interchangeable, and mixing them up either breaks every token or makes forgery easy. Check which key the algorithm expects.

---
