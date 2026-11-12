// A fixed log line with three secrets in it: an API key, a bearer token, and a password. The values are fake.
const line = "2026-11-12T10:02:55Z call POST /orders X-Api-Key: fake-key-1234 Authorization: Bearer abc123.def456.ghi789 status=200 client=reporting password=example-password-not-real";

const rules = [
  [/X-Api-Key:\s*\S+/g, "X-Api-Key: [redacted]"],
  [/Bearer\s+\S+/g, "Bearer [redacted]"],
  [/password=\S+/g, "password=[redacted]"],
];

let redacted = line;
let removed = 0;
for (const [pattern, replacement] of rules) {
  removed += (redacted.match(pattern) || []).length;
  redacted = redacted.replace(pattern, replacement);
}

console.log(redacted);
console.log(`secrets removed: ${removed}`);
