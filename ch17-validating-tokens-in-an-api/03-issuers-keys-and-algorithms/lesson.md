# 3. Issuers, Keys, and Algorithms

The sample pinned its issuer, audience, key, and algorithm in code. That is the right habit. A token can name its own issuer, its own key identifier, and its own algorithm, and each of those is a claim the token makes about itself. The API's job is to decide which of them it trusts, and to hold that decision outside the token.

## The issuer

The issuer is the identity provider the API trusts. The API has one or more expected issuer values, and it accepts only tokens whose issuer matches one of them exactly. A token from a different issuer is refused, even if its signature checks out with some key the API has seen before.

## The keys

For signed tokens, the API must know which keys belong to the expected issuer. For a shared secret, that is the secret itself. For a key pair, it is the public key the issuer publishes. Chapter 18 covers how an API fetches, caches, and rotates those published keys. The essential rule is that the API chooses the keys from its own configuration or from the issuer it trusts, and never accepts a key supplied inside the token.

## The algorithm

The token's header names an algorithm, and the API must not take the name at face value. The API keeps its own allowed list, such as one signing algorithm for its tokens, and refuses any token whose header asks for something else. Some libraries once accepted a header that named no algorithm at all, and that is the reason the allowed list exists.

> **Aside: the token is a claim, not a configuration.**
> Everything in a token's header is the issuer's statement, and a token can be crafted to say anything. Configuration belongs to the API. Keep the issuer, the audience, the keys, and the algorithms in the API's settings, and treat the token as the thing being checked against them.

> **Common mistake.** Looking up the signing key using the key identifier from the token, and fetching whatever key that identifier points to from a location the token chooses. The key must come from a source the API trusts for that issuer.

---
