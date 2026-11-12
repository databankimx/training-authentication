# 1. Discovery and the Key Set

An issuer that signs tokens with a key pair publishes its public keys, and it publishes them where an API can find them. The API doesn't need the keys written into its configuration. It finds the issuer's discovery document, reads the address of the key set from it, and fetches the keys from there.

The diagram shows the path from the issuer's address to a key.

~~~text
Issuer address (trusted in the API's configuration)
   |
   |  fetch the discovery document
   v
Discovery document
   |  it names the address of the key set (jwks_uri)
   v
Key set (JWKS): a list of public keys, each with a kid
   |
   |  the token's header names one kid
   v
The key that verifies this token
~~~

## The key set

A key set is a JSON document with a `keys` list. Each entry describes one public key: its type, its intended use, the algorithm it works with, its key identifier, and the values that make up the key. The key identifier, `kid`, is the label a token uses to say which key signed it.

## Why the key identifier matters

An issuer that rotates keys publishes more than one key for a time. Tokens signed before the rotation name the old key, and tokens signed after it name the new one. The API matches the token's `kid` against the key set, and uses only the key with that identifier. If no key has the identifier, the token is refused, because the issuer hasn't published a key that could have signed it.

> **Aside: the discovery document is a pointer, not a trust decision.**
> The address of the key set comes from the discovery document, but the API decided to trust the issuer in the first place. Fetch discovery from the issuer the API is configured to trust, and never from an address a token supplies.

> **Common mistake.** Using the first key in the set, or the only key, and ignoring the `kid`. During a rotation the first key may be the wrong one, and the token will be refused, or worse, verified against a key it was never signed with.

---
