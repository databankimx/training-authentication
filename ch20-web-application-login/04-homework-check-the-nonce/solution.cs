// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The nonce stored in the session when the login started.
var storedNonce = "stored-nonce-1234";

// Three ID tokens, each with its claims. A token without a nonce claim has no entry for it.
var tokens = new (string Label, Dictionary<string, string> Claims)[]
{
    ("matching nonce", new Dictionary<string, string> { ["sub"] = "user-1", ["nonce"] = "stored-nonce-1234" }),
    ("wrong nonce", new Dictionary<string, string> { ["sub"] = "user-1", ["nonce"] = "another-nonce-9999" }),
    ("no nonce", new Dictionary<string, string> { ["sub"] = "user-1" }),
};

foreach (var (label, claims) in tokens)
{
    string nonce;
    string result;
    if (!claims.TryGetValue("nonce", out nonce)) result = "rejected, nonce missing";
    else if (nonce != storedNonce) result = "rejected, nonce mismatch";
    else result = "accepted";
    Console.WriteLine($"{label}: {result}");
}
