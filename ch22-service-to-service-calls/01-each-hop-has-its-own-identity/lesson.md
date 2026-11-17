# 1. Each Hop Has Its Own Identity

In a chain of services, every service is a client to the next one and an API to the one before it. Each of those roles needs an identity, and each token needs to be useful at exactly one place. The simplest design gives every service its own client credentials, as Chapter 8 showed, and has each service request a new token for each downstream call.

## Why not pass the token along

It's tempting for the front end to take the token the user sent, and pass it to the orders service, which passes it to the reports service. The chain works, and nobody has to write any new code. It's also a serious mistake, for three reasons.

- **The token was issued for the first API.** Its audience names the front end. The orders service should refuse a token whose audience isn't its own, so a forwarded token is either refused or, if the check is missing, accepted where it was never meant to be.
- **The token carries more than the hop needs.** A token built for the front end may carry scopes that only the front end uses. Every service it passes through then holds those scopes, and a leak anywhere exposes all of them.
- **The chain loses its record.** The reports service can't tell whether the request came from the user, the front end, or the orders service, because every hop used the same token. A log with one identity for the whole chain can't show who did what.

## What each hop does instead

Each service asks for a token for the next service, with that service as the audience and only the scopes the call needs. The identity of the calling service is recorded in the token, so the downstream service can tell the calls apart. When the chain must carry the user's identity, the exchange step is designed for that case, as covered in the reading after next.

~~~text
User -> front end          token for the front end (audience: front end)
front end -> orders        new token for orders (audience: orders, scope: orders.read)
orders -> reports          new token for reports (audience: reports, scope: reports.read)
~~~

> **Aside: the chain is only as safe as its weakest hop.**
> A service that accepts any token, or that forwards a token without a check, lets an attacker who reaches it move through the rest of the chain. Every hop must validate its own inbound token, as Chapter 17 described.

> **Common mistake.** Reusing one service identity for every service in the chain, so that a leak in one exposes all of them. Give each service its own client, with its own secret or certificate and its own scopes.

---
