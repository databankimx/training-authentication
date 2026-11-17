# The key set the issuer publishes now, after a rotation. Each fetch returns this set, and every fetch is counted.
published = {"rsa-2026-01", "rsa-2026-02"}
fetches = 0

def fetch():
    global fetches
    fetches += 1
    return set(published)

# The cache starts with one key, which is all the API had before the rotation.
cache = {"rsa-2026-01"}
requests = ["rsa-2026-01", "rsa-2026-02", "rsa-2026-03", "rsa-2026-02"]

# Write your code below this comment. For each request, use the cache if it has the kid. Otherwise refetch once, and
# refuse the request if the refetched set still lacks the kid. Print one line per request, then the total fetches.
