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

for (var i = 0; i < requests.Length; i++)
{
    var label = "request " + (i + 1) + ":";
    var clientId = requests[i].ClientId;
    var secret = requests[i].Secret;

    if (!registrations.TryGetValue(clientId, out var registration) || registration.Secret != secret)
    {
        Console.WriteLine(label + " refused, invalid_client");
        continue;
    }

    var asked = requests[i].Requested.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    var granted = string.Join(" ", asked.Where(scope => registration.Scopes.Contains(scope)));
    var denied = string.Join(" ", asked.Where(scope => !registration.Scopes.Contains(scope)));
    Console.WriteLine(label + " granted " + granted + ", denied " + denied);
}
