// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The registered clients: each has a secret and the scopes it may be granted.
var registrations = new Dictionary<string, (string Secret, string[] Scopes)>
{
    ["reports-client"] = ("example-client-secret-not-real", new[] { "reports.read" }),
};

// Three token requests: a client identifier, the secret it presents, and the scopes it asks for.
var requests = new (string ClientId, string Secret, string Requested)[]
{
    ("reports-client", "example-client-secret-not-real", "reports.read orders.write"),
    ("reports-client", "wrong-secret", "reports.read"),
    ("other-client", "example-client-secret-not-real", "reports.read"),
};

// Write your code below this comment. Refuse an unknown client or a wrong secret with "invalid_client". Otherwise grant
// the requested scopes the client is registered for, and deny the rest. Print one line per request.
