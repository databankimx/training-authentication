// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

using System.Linq;

// The endpoint, client, and secret are fake, and nothing is sent.
var tokenEndpoint = "https://login.example.invalid/oauth/token";
var clientId = "example-client";
var clientSecret = "example-secret-not-real";
var scopes = new[] { "reports.read" }.Append("orders.read").ToArray();

var parameters = new[]
{
    ("grant_type", "client_credentials"),
    ("client_id", clientId),
    ("client_secret", clientSecret),
    ("scope", string.Join(" ", scopes)),
};

Console.WriteLine($"POST {tokenEndpoint}");
Console.WriteLine(string.Join("&", parameters.Select(p =>
    p.Item1 == "client_secret" ? "client_secret=****" : $"{p.Item1}={Uri.EscapeDataString(p.Item2)}")));
