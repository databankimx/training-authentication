# Homework: Why Not Every Request

A colleague suggests that the API should fetch the key set on every request, so it always has the newest keys and never needs a cache or a refetch rule. Write a short answer that explains why this is a poor design, and what the caching and refetch limits protect against.

Write in your own words, in a short paragraph or two. Cover the load on the issuer, the effect on the API's own requests, and what an attacker could do to a design with no limit.

~~~spoiler
A fetch on every request multiplies the API's traffic by its request rate. The issuer has to serve each fetch, and it may rate-limit the API if the load is high, which would stop the API from verifying tokens at all. A busy API could then take its own sign-in down by asking for keys too often.

Every request also waits on a network round trip before it can be decided, so each one becomes slower and less reliable. An outage at the issuer's key endpoint would fail every request, even for tokens the API had verified moments before, instead of only the ones that need a new key.

Without a limit on refetches, a stream of tokens naming made-up kids would cause a stream of fetches. Anyone able to send tokens to the API could then use it to flood the issuer. A cache with a schedule, and at most one refetch per request, keeps the load bounded and the API working through an issuer outage for the keys it already has.
~~~

---
