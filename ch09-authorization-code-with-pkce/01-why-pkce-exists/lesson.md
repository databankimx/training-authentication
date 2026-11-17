# 1. Why PKCE Exists

The client credentials flow in the last chapter works because the script keeps its secret on a server. A tool on a person's computer can't do that. Anyone with a copy of the software can read a secret embedded in it, so a secret there is public. Yet the tool still needs to exchange an authorization code for tokens, and that exchange is where a secret would normally prove who is asking.

PKCE, pronounced "pixie", is the answer. It replaces the stored secret with a value the tool makes up fresh for every sign-in.

## The two values

The tool creates a random string called the code verifier. It keeps the verifier to itself. It then computes the code challenge, which is the SHA-256 digest of the verifier, encoded with base64url. The challenge is safe to send to the server, because it can't be turned back into the verifier.

The diagram shows where each value goes.

~~~text
verifier (random, kept in the app)
    |
    |  SHA-256, then base64url
    v
challenge ---> sent with the sign-in request
                    |
                    |  the server stores it with the code it issues
                    v
... later, the app exchanges the code ...
code + verifier ---> server: does SHA-256(verifier) match the stored challenge?
                                 yes: tokens       no: refused
~~~

## Why an intercepted code is not enough

The code travels through the browser, where another program on the same machine might see it. An attacker who gets the code still lacks the verifier. Without it, the token endpoint refuses the exchange, because the challenge it stored can't be matched.

The check happens at the token endpoint, not in the tool, so the tool never has to prove anything with a secret of its own.

> **Aside: why the method is named S256.**
> The sign-in request can name the method used to make the challenge. The plain method sends the verifier itself as the challenge, which protects nothing. The method used everywhere in practice is S256, the SHA-256 digest. Always use S256.

> **Common mistake.** Reusing a verifier across sign-ins. The verifier is meant to be used once. Generate a new one for every sign-in, and discard it after the exchange.

---
