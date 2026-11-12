using System.Collections.Generic;

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
var finalStates = new HashSet<string> { "approved", "denied", "expired" };

var current = "waiting";
for (var i = 0; i < responses.Length; i++)
{
    if (!finalStates.Contains(current))
    {
        current = states[responses[i]];
    }
    Console.WriteLine($"poll {i + 1}: {responses[i]} -> {current}");
}
