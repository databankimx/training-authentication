// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The application's own origin, and the token each request must carry.
var appOrigin = "https://app.example.invalid";
var sessionToken = "example-csrf-token-not-real";

// Each request: a label, the origin (null for none), the token sent in the header (null for none), and the session's
// token in the cookie.
var requests = new (string Label, string Origin, string Header, string Cookie)[]
{
    ("same origin, matching token", "https://app.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"),
    ("same origin, no token", "https://app.example.invalid", null, "example-csrf-token-not-real"),
    ("other origin, matching token", "https://evil.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"),
    ("no origin, mismatched token", null, "guessed-token", "example-csrf-token-not-real"),
};

// Write your code below this comment. Apply the checks in order, refusing at the first one a request fails, then print
// one line per request in the form "label: status".
