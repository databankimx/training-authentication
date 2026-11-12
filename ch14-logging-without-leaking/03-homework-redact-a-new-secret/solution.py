import re

# A fixed log line with three secrets in it: an API key, a bearer token, and a password. The values are fake.
line = "2026-11-12T10:02:55Z call POST /orders X-Api-Key: fake-key-1234 Authorization: Bearer abc123.def456.ghi789 status=200 client=reporting password=example-password-not-real"

rules = [
    (r"X-Api-Key:\s*\S+", "X-Api-Key: [redacted]"),
    (r"Bearer\s+\S+", "Bearer [redacted]"),
    (r"password=\S+", "password=[redacted]"),
]

redacted = line
removed = 0
for pattern, replacement in rules:
    redacted, count = re.subn(pattern, replacement, redacted)
    removed += count

print(redacted)
print(f"secrets removed: {removed}")
