// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The scopes the inbound token grants, and the downstream calls this service must make.
var inboundScopes = new[] { "reports.read", "orders.read" };
var calls = new (string Name, string Audience, string Scope)[]
{
    ("reports", "https://api.example.invalid/reports", "reports.read"),
    ("orders", "https://api.example.invalid/orders", "orders.read"),
    ("invoices", "https://api.example.invalid/invoices", "invoices.read"),
};

// Write your code below this comment. For each call, request a token for its audience with its scope if the inbound
// token grants that scope. Otherwise refuse the call. Print one line per call.
