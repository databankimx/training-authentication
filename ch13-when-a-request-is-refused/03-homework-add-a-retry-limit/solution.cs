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

for (var r = 0; r < requests.Length; r++)
{
    var attempts = 0;
    var retries = 0;
    var refreshed = false;
    var result = (string)null;

    foreach (var status in requests[r])
    {
        attempts++;
        if (status == 200)
        {
            result = $"ok after {attempts} attempts";
            break;
        }
        if (status == 403)
        {
            result = "stopped: 403 (no retry)";
            break;
        }
        if (status == 401)
        {
            if (refreshed)
            {
                result = $"stopped: 401 after refresh, after {attempts} attempts";
                break;
            }
            refreshed = true;
            continue;
        }
        if ((status == 429 || status == 503) && retries < maxRetries)
        {
            retries++;
            continue;
        }
        result = $"gave up after {attempts} attempts";
        break;
    }

    Console.WriteLine($"request {r + 1}: {result}");
}
