# 3. Caching and Rotation

Fetching the key set on every request would be slow, and it would put a steady load on the issuer for no benefit. The API keeps the key set in memory, uses it for many requests, and refreshes it from time to time. Two things decide how often: a schedule, and what the API does when it meets a key it doesn't have.

## Refresh on a schedule

The API refetches the key set after a set interval, such as a few hours. The issuer tells the API how long it may cache the response, through the cache headers on the key set, and a sensible API respects that. Between refreshes, the cached keys are used as they are.

## Refresh when a kid is unknown

A token can name a kid the cache doesn't have. That happens when the issuer has rotated keys since the last refresh, and the token is new. The API should refetch, once, and look again. If the new set has the kid, the request goes ahead. If it doesn't, the token is refused.

The refetch must be limited. A token with an invented kid would otherwise make the API ask the issuer for keys on every request, and an attacker could use that to flood the issuer. One refetch per request, and no more, keeps the cost bounded.

## Rotation in order

An issuer rotates a key in three stages. It publishes the new key first, so both keys are in the set. It then starts signing with the new key. Finally, once every token signed with the old key has expired, it removes the old key. An API that caches the set follows this sequence without any change, because the overlap means no valid token ever names a kid the API lacks, as long as the API refreshes within the overlap.

> **Aside: the overlap is the rotation's safety margin.**
> The time between publishing the new key and removing the old one has to be longer than the API's refresh interval, plus the lifetime of the longest token. Rotations that remove the old key too soon cause refusals that look random.

> **Common mistake.** Refetching on every unknown kid with no limit, so a stream of made-up kids turns into a stream of requests to the issuer. Allow one refetch per request, and refuse the kid if the refetch doesn't contain it.

---
