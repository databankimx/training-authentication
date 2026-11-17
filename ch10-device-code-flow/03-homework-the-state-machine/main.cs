// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// A fixed sequence of answers from the token endpoint, so the output repeats.
var responses = new[] { "authorization_pending", "slow_down", "authorization_pending", "expired_token", "success" };

// Each answer maps to the state it moves the device into.
var states = new Dictionary<string, string>
{
    ["authorization_pending"] = "waiting",
    ["slow_down"] = "waiting",
    ["success"] = "approved",
    ["access_denied"] = "denied",
    ["expired_token"] = "expired",
};

// Write your code below this comment. Start in the state waiting. For each answer, move to the state the table gives it,
// unless the device is already in a final state (approved, denied, or expired). Print one line per answer.
