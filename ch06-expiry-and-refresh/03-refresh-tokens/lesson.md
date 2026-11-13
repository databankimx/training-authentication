# 3. Refresh Tokens

Short access tokens are good for limiting damage, but they'd be a nuisance if a person had to sign in every few minutes. A refresh token solves that. It's a longer-lived credential that the script trades, at a token endpoint, for a new access token. The person signs in once, and the script renews access on its own from then on.

The sequence shows the script, the token endpoint, and the API, and which credential goes where.

~~~text
Script              Token endpoint                 API
  |                        |                        |
  |-- refresh token ------>|                        |
  |<-- new access token ---|                        |
  |                        |                        |
  |-- access token (Authorization header) ---------->|
  |<------------------ response --------------------|
~~~

## The exchange

When the access token is close to expiry, the script sends the refresh token to the token endpoint and receives a new access token, and often a new refresh token as well. The access token goes to the API. The refresh token goes only to the token endpoint, and nowhere else.

That separation is the point. The access token travels to every API the script calls, so it's exposed more often. The refresh token travels only to the identity provider, so it's exposed far less.

## Protecting the refresh token

A refresh token can mint access for as long as it lives, so it deserves more care than an access token. Keep it out of logs, out of code, and out of any place another service can read. Store it where the script alone can reach it.

Many providers rotate refresh tokens: each exchange returns a new one, and the old one stops working. A script must save the new value straight away. If it doesn't, the next exchange fails, and the script may need a person to sign in again.

## Refreshing without a storm

Several parts of a script can notice an expired token at the same moment. If each one sends its own refresh request, the identity provider sees a burst of requests, and rotation can invalidate the token that another request is still using. Let one refresh run at a time, and make the other callers wait for its result.

> **Aside: the refresh token is still a credential.**
> Everything in the previous chapter applies to it. It's a secret, it must not appear in logs or history, and it must be replaced if it leaks.

> **Common mistake.** Sending the refresh token to the API along with the access token, or logging the whole token response. Either one puts the more powerful credential in the places it can be read.

---
