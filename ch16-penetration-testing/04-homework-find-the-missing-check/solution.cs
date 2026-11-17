// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The API's own identifier, the time now, and three fixed cases. A real API reads the time from the clock.
var apiAudience = "https://api.example.invalid/reports";
var now = 1893455900L;
var cases = new[]
{
    (Name: "valid", Exp: 1893456000L, Aud: "https://api.example.invalid/reports"),
    (Name: "other API", Exp: 1893456000L, Aud: "https://api.example.invalid/orders"),
    (Name: "expired", Exp: 1893455000L, Aud: "https://api.example.invalid/reports"),
};

static string Decide(long exp, string aud, string expectedAud, long now)
{
    if (exp <= now) return "rejected: expired";
    if (aud != expectedAud) return "rejected: wrong audience";
    return "accepted";
}

foreach (var c in cases)
{
    Console.WriteLine($"{c.Name}: {Decide(c.Exp, c.Aud, apiAudience, now)}");
}
