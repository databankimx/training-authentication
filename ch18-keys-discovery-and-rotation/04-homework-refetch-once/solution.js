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

requests.forEach((kid, index) => {
  let result;
  if (cache.has(kid)) {
    result = `${kid} from cache`;
  } else {
    cache = fetchKeys();
    result = cache.has(kid) ? `${kid} after refetch` : `refused, ${kid} not published`;
  }
  console.log(`request ${index + 1}: ${result}`);
});
console.log(`fetches: ${fetches}`);
