# 3. Exchange and the User

Sometimes the downstream service must know which user made the request, because its answer depends on the user. A report should show only the reports that user may read. Passing the user's token along was ruled out in the first reading. Token exchange is the standard way to carry the user's identity without that mistake.

## Token exchange

In a token exchange, the calling service presents the token it received to the identity provider, and asks for a new token for a different audience, with scopes narrowed to what the next hop needs. The identity provider checks the inbound token, and issues a new one. The new token keeps the user as its subject, so the downstream service can see who the request is for. It also records the calling service as the actor, so the chain stays visible in the logs.

The result has two identities in it, and each has a job. The subject answers "for whom is this done?", and the actor answers "which service is doing it?". Downstream services check both, and they refuse a token whose audience is not their own.

## Keeping secrets out of the chain

Every service in the chain holds a client secret to make its own token requests, and each secret is one more thing to store, rotate, and protect. Two alternatives reduce that. A workload identity, such as a managed identity or a federated credential that the platform vouches for, lets the service prove itself without a stored secret. Where a shared secret is unavoidable, a signed assertion or a certificate tied to the service is stronger than a password-like value, because it can be rotated without changing the service's code.

> **Aside: not every platform supports exchange.**
> Token exchange is a standard, but support varies between identity providers, and the names they use differ. Check the platform's documentation before designing a chain around it, as Chapter 12 described.

> **Common mistake.** Treating the subject as proof that the call came from the user. The subject says on whose behalf the call is made. The actor says which service made it. A downstream service that checks only the subject can be fooled by any service that can obtain a token for that user.

---
