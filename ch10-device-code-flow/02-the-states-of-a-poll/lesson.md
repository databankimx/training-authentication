# 2. The States of a Poll

Each poll gets one answer, and each answer moves the device into a state. Some states mean keep waiting, and others end the flow. Writing the mapping down as a table, and then as code, is the clearest way to see that every answer has a meaning and that none is forgotten.

The sample uses a fixed sequence of answers, so the output repeats. A real device reads each answer from the token endpoint.

~~~examples source
```csharp
using System.Collections.Generic;

// A fixed sequence of answers from the token endpoint. A real device reads each one from the server.
var responses = new[] { "authorization_pending", "authorization_pending", "success" };

// Each answer maps to the state the device moves into.
var states = new Dictionary<string, string>
{
    ["authorization_pending"] = "waiting",
    ["slow_down"] = "waiting",
    ["success"] = "approved",
    ["access_denied"] = "denied",
    ["expired_token"] = "expired",
};

for (var i = 0; i < responses.Length; i++)
{
    Console.WriteLine($"poll {i + 1}: {responses[i]} -> {states[responses[i]]}");
}
```
```python
# A fixed sequence of answers from the token endpoint. A real device reads each one from the server.
responses = ["authorization_pending", "authorization_pending", "success"]

# Each answer maps to the state the device moves into.
states = {
    "authorization_pending": "waiting",
    "slow_down": "waiting",
    "success": "approved",
    "access_denied": "denied",
    "expired_token": "expired",
}

for number, response in enumerate(responses, start=1):
    print(f"poll {number}: {response} -> {states[response]}")
```
```javascript
// A fixed sequence of answers from the token endpoint. A real device reads each one from the server.
const responses = ["authorization_pending", "authorization_pending", "success"];

// Each answer maps to the state the device moves into.
const states = {
  authorization_pending: "waiting",
  slow_down: "waiting",
  success: "approved",
  access_denied: "denied",
  expired_token: "expired",
};

responses.forEach((response, index) => {
  console.log(`poll ${index + 1}: ${response} -> ${states[response]}`);
});
```
~~~

The output is the same in every language:

~~~text
poll 1: authorization_pending -> waiting
poll 2: authorization_pending -> waiting
poll 3: success -> approved
~~~

Change the last answer in one tab to `access_denied`, and press Run. The third line becomes `access_denied -> denied`. Every answer has a state, so a new answer from the server should be added to the table, not handled by a default that hides it.

> **Aside: waiting is a state too.**
> `authorization_pending` and `slow_down` both leave the device waiting. They differ in what the device does next: the first means keep polling at the same interval, and the second means lengthen the interval first.

> **Common mistake.** Treating any unknown answer as a failure, or as success. An unrecognized answer should stop the flow and be reported, because guessing hides a change on the server's side.

---
