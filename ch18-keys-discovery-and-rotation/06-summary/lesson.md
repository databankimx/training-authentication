# Summary: Keys, Discovery, and Rotation

This chapter covered how an API finds an issuer's published keys through the discovery document, how it selects the key a token names, and how it caches the key set through rotation without refetching on every request. You've selected keys from a fixed key set, and counted the refetches a cache needs.

## What you learned

- The discovery document names the address of the key set, and the API fetches the issuer's keys from there.
- The key set is a list of public keys, each with a `kid` that a token uses to name the key that signed it.
- An unknown kid means the issuer hasn't published a key for the token, and the request is refused.
- The API caches the key set and refreshes it on a schedule the issuer's cache headers allow.
- When a kid is unknown, the API refetches once, and refuses the request if the new set still lacks the kid.
- Rotation publishes the new key first, then switches signing, then removes the old key. The overlap is the margin that keeps tokens valid.
- Refetches must be limited, so that made-up kids can't turn into a flood of requests to the issuer.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A token's header names a kid that is not in the key set the API has cached. What should the API do first?
○ Use the only key in the set, because there is nothing else it could use.
→ Using a key the token didn't name risks verifying with the wrong key. Never guess.
◉ Refetch the key set once, and refuse the request if the new set still lacks the kid.
→ Right. A refetch covers the case where the issuer has rotated keys, and the limit keeps the cost bounded.
○ Refetch the key set on every retry until the kid appears, so the request eventually succeeds.
→ Unlimited refetches let made-up kids flood the issuer. Refetch at most once per request.
```

```quiz
Why does an issuer keep an old key in its published set after it starts signing with a new one?
◉ Because tokens signed with the old key remain valid until they expire, and the API must still find that key.
→ Right. The overlap lets those tokens verify until they expire, then the old key can be removed.
○ Because keeping keys costs nothing, so the issuer never removes them.
→ The reason is about tokens in circulation, not cost. Old keys are kept for a reason.
○ Because the API cannot read a key set that contains only one key.
→ The API reads a set of any size. The overlap exists for tokens that are still valid.
```

```quiz
An API refreshes its key set every four hours. Which statement about the cache is correct?
○ The cache must be refreshed on every request, because a four-hour-old key may be revoked.
→ Refreshing on every request is the cost the cache exists to avoid. The refresh interval and unknown-kid refetches cover the risk.
○ The cache is never used, because the API always fetches the newest keys.
→ That would be the design the homework rejects. The cache is used between refreshes.
◉ Requests between refreshes use the cached keys, and a kid the cache lacks triggers one refetch.
→ Right. The schedule and the unknown-kid rule together keep the cache current without a fetch per request.
```

---
