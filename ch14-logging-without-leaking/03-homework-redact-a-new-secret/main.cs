// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// A fixed log line with three secrets in it: an API key, a bearer token, and a password. The values are fake.
var line = "2026-11-12T10:02:55Z call POST /orders X-Api-Key: fake-key-1234 Authorization: Bearer abc123.def456.ghi789 status=200 client=reporting password=example-password-not-real";

// Write your code below this comment. Apply the three rules in order, count each replacement, then print the redacted line
// and, on a second line, "secrets removed: " and the total count.
