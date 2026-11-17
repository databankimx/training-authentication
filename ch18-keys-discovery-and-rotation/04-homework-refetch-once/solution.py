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

for number, kid in enumerate(requests, start=1):
    if kid in cache:
        result = f"{kid} from cache"
    else:
        cache = fetch()
        result = f"{kid} after refetch" if kid in cache else f"refused, {kid} not published"
    print(f"request {number}: {result}")
print(f"fetches: {fetches}")
