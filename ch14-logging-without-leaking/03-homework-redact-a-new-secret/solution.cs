// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

using System.Text.RegularExpressions;

// A fixed log line with three secrets in it: an API key, a bearer token, and a password. The values are fake.
var line = "2026-11-12T10:02:55Z call POST /orders X-Api-Key: fake-key-1234 Authorization: Bearer abc123.def456.ghi789 status=200 client=reporting password=example-password-not-real";

var rules = new[]
{
    (Pattern: @"X-Api-Key:\s*\S+", Replacement: "X-Api-Key: [redacted]"),
    (Pattern: @"Bearer\s+\S+", Replacement: "Bearer [redacted]"),
    (Pattern: @"password=\S+", Replacement: "password=[redacted]"),
};

var redacted = line;
var removed = 0;
foreach (var rule in rules)
{
    removed += Regex.Matches(redacted, rule.Pattern).Count;
    redacted = Regex.Replace(redacted, rule.Pattern, rule.Replacement);
}

Console.WriteLine(redacted);
Console.WriteLine($"secrets removed: {removed}");
