# Cheat Sheet

## The token

A token has three dot-separated parts: a header, a payload, and a signature. The header and payload are base64url-encoded JSON. The signature covers the other two parts. Decoding a token shows its claims, but decoding does not verify it.

Common claims: `iss` (issuer), `aud` (audience), `sub` (subject), `exp` (expiry, in seconds since 1970), `nbf` (not before), `iat` (issued at), `scope` (granted permissions), `nonce` (login check).

## The checks an API makes, in order

1. The `Authorization` header is present and well formed.
2. The algorithm is one the API allows. The API decides the list, never the token.
3. The signature checks out against a key the API trusts for the expected issuer.
4. The issuer is the expected issuer.
5. The audience is this API.
6. The expiry is in the future, allowing a small clock tolerance.
7. The token carries the scope the endpoint requires.

## Status codes

| Code | Meaning | What the client does |
|---|---|---|
| 200 | Allowed | Uses the result |
| 401 | Not identified: the token is missing, expired, or invalid | Refreshes once, then stops if refused again |
| 403 | Identified, but not permitted | Stops and reports, and does not retry |
| 404 | Not an endpoint the API serves | Stops and reports |
| 429 | Too many requests | Waits for `Retry-After`, then retries a limited number of times |
| 5xx | Server problem | Backs off, then retries a limited number of times |

## Token requests

- Client credentials: `grant_type=client_credentials`, the client identifier, the secret, and the scope. No user is involved, and most providers issue no refresh token.
- Authorization code with PKCE: the verifier stays in the client, and the challenge is its S256 digest.
- Device code: the device polls with its device code, and stops on `expired_token` or `access_denied`.

## Before every release

- No secret, token, or key appears in source, logs, or a repository.
- Every endpoint has a stated requirement, and a test for each refusal.
- Redirect addresses, audiences, and issuers are the registered values, and they're checked exactly.
- Scopes granted are the scopes the job needs.
- Test clients and test APIs are removed when the test ends.

---
