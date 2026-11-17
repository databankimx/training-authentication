// The key set the issuer publishes now, after a rotation. Each fetch returns this set, and every fetch is counted.
const published = new Set(["rsa-2026-01", "rsa-2026-02"]);
let fetches = 0;
function fetchKeys() {
  fetches++;
  return new Set(published);
}

// The cache starts with one key, which is all the API had before the rotation.
let cache = new Set(["rsa-2026-01"]);
const requests = ["rsa-2026-01", "rsa-2026-02", "rsa-2026-03", "rsa-2026-02"];

// Write your code below this comment. For each request, use the cache if it has the kid. Otherwise refetch once, and
// refuse the request if the refetched set still lacks the kid. Print one line per request, then the total fetches.
