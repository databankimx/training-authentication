# 1. The Pieces

A working system that calls an API with proper authentication is made of a few parts, and each part has one job to prove. Before you read the capstone sample, it helps to see those jobs side by side.

1. **The client** holds its identifier and its secret, and asks the identity provider for a token. Chapter 8 covered that request.
2. **The identity provider** checks the client's secret, and issues a token for the scopes the client may use. Chapters 5 and 11 covered what it signs and what it grants.
3. **The client** sends the token to the API in the `Authorization` header. Chapter 1 covered the header.
4. **The API** validates the token: the signature, the issuer, the audience, and the expiry. Chapters 17 and 18 covered those checks.
5. **The API** checks that the token carries the scope the endpoint needs, and refuses the request if it doesn't. Chapter 19 covered that rule.

Each step can refuse, and each refusal means something different. A wrong client secret is refused by the identity provider, and the client never receives a token. A missing token is refused by the API with 401. A token without the right scope is refused with 403. Chapter 13 covered what a client does with each of those answers.

~~~text
1. client -> identity provider: client id and secret, scope
2. identity provider -> client: token, or refusal (invalid_client)
3. client -> API: request with Authorization: Bearer <token>
4. API -> validates the token (signature, issuer, audience, expiry)
5. API -> checks the scope for the endpoint, then answers 200, 401, or 403
~~~

> **Aside: the capstone's identity provider is not a real one.**
> The sample simulates the provider in the same file, and it shares the signing secret with the API. A real API never shares its secret with the provider. It fetches the provider's public keys, as Chapter 18 described. The sample simplifies this, so that it can run offline.

> **Common mistake.** Testing only the success path. A client that works when everything is right says nothing about the refusals. Check each refusal the system is meant to make, as Chapter 16 described.

---
