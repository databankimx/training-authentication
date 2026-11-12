# Homework: Refetch Once

The starter has a key cache that holds one key, and a fetch that returns the key set as the issuer publishes it after a rotation. It counts how many times it has been called. Four tokens arrive, one after another, and each names a kid.

Your task has three rules:

1. If the kid is in the cache, use it, and say so.
2. If the kid is not in the cache, refetch once and replace the cache with the fetched set. If the kid is now in the cache, use it, and say so. Otherwise refuse the request.
3. Count every refetch, and print the total at the end.

Print one line per request, then the count. The expected output is:

~~~text
request 1: rsa-2026-01 from cache
request 2: rsa-2026-02 after refetch
request 3: refused, rsa-2026-03 not published
request 4: rsa-2026-02 from cache
fetches: 2
~~~

> **Aside: the refetch is the cost, so count it.**
> A cache is only useful if most requests never reach the issuer. Counting the refetches shows whether the cache is doing its job, and a sudden rise in refetches is a sign that something is naming kids the issuer doesn't publish.

> **Common mistake.** Refetching for a refused kid and then refusing it anyway without counting the refetch, so the total undercounts the load on the issuer. Count every fetch, including the ones that didn't help.

> **.NET Framework 4.8.** This exercise uses `Dictionary`, `HashSet`, and string formatting, all of which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
