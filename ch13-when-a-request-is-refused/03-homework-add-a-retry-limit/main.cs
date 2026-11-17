// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// Four simulated requests. Each list is the status codes the server returns for each attempt, in order.
var requests = new[]
{
    new[] { 429, 503, 200 },
    new[] { 403 },
    new[] { 429, 429, 429, 429 },
    new[] { 401, 200 },
};
var maxRetries = 3;

// Write your code below this comment. For each request, go through its statuses in order and follow the rules. Print one
// line per request, for example "request 1: ok after 3 attempts".
