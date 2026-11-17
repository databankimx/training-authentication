# Glossary

**Access token.** A short-lived token that an API accepts to allow a request. Chapters 4, 6.

**Anti-forgery token.** A value the page sends in a header on state-changing requests, which must match the session. Chapter 21.

**Application identity.** The identity an application is known by at the identity provider. Chapter 12.

**Audience (`aud`).** The API a token is meant for. An API refuses a token whose audience is not its own. Chapters 4, 17.

**Authentication.** Establishing who is calling. Chapter 1.

**Authorization.** Deciding what an authenticated caller may do. Chapters 1, 19.

**Authorization code.** A short-lived code the identity provider gives the client after sign-in, to be exchanged for tokens. Chapter 9.

**Base64url.** Base64 with `-` and `_` in place of `+` and `/`, and no padding. The encoding JWT parts use. Chapter 4.

**Claim.** A statement in a token, such as the subject, the expiry, or the scope. Chapter 4.

**Client.** An application that asks an identity provider for tokens. Chapter 8.

**Client credentials.** A flow in which a client authenticates as itself, with no user. Chapter 8.

**Client secret.** The secret a confidential client presents to prove its identity. It must stay on a server. Chapters 2, 20.

**Clock skew (tolerance).** A small allowance for clocks that disagree, used when checking expiry. Chapter 17.

**Confidential client.** A client that can keep a secret, because it runs on a server. Chapter 20.

**Constant-time comparison.** A comparison that takes the same time however the values differ. Chapter 5.

**Cross-site request forgery (CSRF).** An attack in which a page on another site makes the browser send a request to a signed-in site. Chapter 21.

**Deny by default.** A rule that refuses every request unless the endpoint has been named as open. Chapter 19.

**Device code.** A code a device shows, which a person enters on another device to approve the device. Chapter 10.

**Discovery document.** A JSON document an identity provider publishes, which names its endpoints and its key set. Chapter 18.

**Expiry (`exp`).** The time after which a token is no longer valid. Chapter 6.

**Federation.** A trust arrangement in which applications rely on an identity provider for sign-in. Chapter 7.

**HMAC.** A keyed hash, used to sign tokens with a shared secret. Chapter 5.

**ID token.** A token that says who signed in, issued in OpenID Connect. Chapter 20.

**Identity provider.** The system that checks who people and services are, and issues tokens. Chapter 7.

**Issuer (`iss`).** The identity provider that issued a token. Chapter 17.

**JWKS (JSON Web Key Set).** The published list of public keys an issuer uses to sign tokens, each identified by a `kid`. Chapter 18.

**JWT (JSON Web Token).** A token with a header, a payload, and a signature, each base64url-encoded. Chapter 4.

**kid (key identifier).** The label a token uses to name the key that signed it. Chapter 18.

**Least privilege.** Giving a caller only the access it needs. Chapter 11.

**Nonce.** A random value sent with a login and checked in the ID token, so the token belongs to that login. Chapter 20.

**OAuth 2.0.** The framework for delegated authorization that tokens and scopes come from. Chapters 8, 9.

**OpenID Connect.** A sign-in protocol built on OAuth 2.0, which adds the ID token. Chapter 7.

**PKCE.** A method that binds an authorization code to the client that asked for it, using a verifier and a challenge. Chapter 9.

**Public key.** The half of a key pair that verifies a signature and cannot create one. Chapter 5.

**Refresh token.** A longer-lived credential, exchanged at the token endpoint for new access tokens. Chapter 6.

**Rotation.** Replacing a key or secret on a schedule, with an overlap so that valid tokens still verify. Chapters 6, 18.

**SAML.** An XML-based sign-in protocol, common in enterprise applications. Chapter 7.

**Scope.** A named permission that a token grants. Chapter 11.

**SameSite.** A cookie attribute that limits when the browser sends the cookie on cross-site requests. Chapter 21.

**SCIM.** A standard protocol for creating and removing accounts across systems. Chapter 7.

**Service principal.** A service's identity in an identity platform, used for machine-to-machine calls. Chapter 12.

**Session.** The server-side state that represents a signed-in person, identified by a cookie. Chapter 20.

**State.** A random value that ties a login callback to the login that started it. Chapter 20.

**Subject (`sub`).** The identity a token is about, such as a user or a service. Chapter 22.

**Token endpoint.** The address where a client exchanges credentials or a code for tokens. Chapter 8.

**Token exchange.** Trading a token for a new one for another audience, with narrower scopes. Chapter 22.

**Verifier.** The random value a PKCE client keeps and sends at the token exchange. Chapter 9.

---
