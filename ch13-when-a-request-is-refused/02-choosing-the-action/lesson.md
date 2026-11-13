# 2. Choosing the Action

A script that handles refusals needs one decision per status code. The sample writes that decision as a table, one line per status, and prints the table for a fixed list of codes. Keeping the decision in one place means every request in the script responds the same way.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
// Example status codes, as an API might return them. The action for each one is the next step the script takes.
var statusCodes = new[] { 200, 401, 403, 429, 503 };

static string ActionFor(int status)
{
    switch (status)
    {
        case 200: return "done";
        case 401: return "refresh the token once, then retry";
        case 403: return "stop and report, do not retry";
        case 429: return "wait, then retry";
        case 503: return "back off, then retry";
        default: return "stop and report, unknown status";
    }
}

foreach (var status in statusCodes)
{
    Console.WriteLine($"{status}: {ActionFor(status)}");
}
```
```python
# Example status codes, as an API might return them. The action for each one is the next step the script takes.
status_codes = [200, 401, 403, 429, 503]

actions = {
    200: "done",
    401: "refresh the token once, then retry",
    403: "stop and report, do not retry",
    429: "wait, then retry",
    503: "back off, then retry",
}

for status in status_codes:
    print(f"{status}: {actions.get(status, 'stop and report, unknown status')}")
```
```javascript
// Example status codes, as an API might return them. The action for each one is the next step the script takes.
const statusCodes = [200, 401, 403, 429, 503];

const actions = {
  200: "done",
  401: "refresh the token once, then retry",
  403: "stop and report, do not retry",
  429: "wait, then retry",
  503: "back off, then retry",
};

for (const status of statusCodes) {
  console.log(`${status}: ${actions[status] ?? "stop and report, unknown status"}`);
}
```
~~~

The output is the same in every language:

~~~text
200: done
401: refresh the token once, then retry
403: stop and report, do not retry
429: wait, then retry
503: back off, then retry
~~~

Add `404` to the list in one tab and press Run. It isn't in the table, so it gets the default: stop and report. An unknown status is the one case where a script should not guess. Stopping and reporting it is safer than retrying something you don't understand.

> **Aside: the default is a decision too.**
> The last case in the table is as important as the others. A script that treats every unexpected code as retryable can loop on a problem it doesn't understand, so the default should stop.

> **Common mistake.** Writing the table as a chain of checks in different places of the code. A status handled in one request and forgotten in another gives the script two rules for the same answer. Keep one table, and use it everywhere.

---
