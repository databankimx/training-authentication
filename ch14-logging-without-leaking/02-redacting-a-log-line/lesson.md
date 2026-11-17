# 2. Redacting a Log Line

Sometimes a secret reaches a line before anyone has decided it shouldn't. Redaction is the last defence: a rule that finds a secret-shaped value and replaces it with a marker, before the line is written. The rule must change only the secret. Everything else in the line should stay as it was, because the line still has to explain what happened.

The sample uses a fixed log line that carries a bearer token and a password. It applies one rule for each, and prints the redacted line.

~~~examples source
```csharp
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
using System.Text.RegularExpressions;

// A fixed log line with a bearer token and a password in it. The values are fake.
var line = "2026-11-12T09:14:03Z request GET /reports Authorization: Bearer abc123.def456.ghi789 status=401 user=svc-report password=example-password-not-real";

// Each rule replaces the secret's value, and leaves the name of the field in place.
var redacted = Regex.Replace(line, @"Bearer\s+\S+", "Bearer [redacted]");
redacted = Regex.Replace(redacted, @"password=\S+", "password=[redacted]");

Console.WriteLine(redacted);
```
```python
import re

# A fixed log line with a bearer token and a password in it. The values are fake.
line = "2026-11-12T09:14:03Z request GET /reports Authorization: Bearer abc123.def456.ghi789 status=401 user=svc-report password=example-password-not-real"

# Each rule replaces the secret's value, and leaves the name of the field in place.
redacted = re.sub(r"Bearer\s+\S+", "Bearer [redacted]", line)
redacted = re.sub(r"password=\S+", "password=[redacted]", redacted)

print(redacted)
```
```javascript
// A fixed log line with a bearer token and a password in it. The values are fake.
const line = "2026-11-12T09:14:03Z request GET /reports Authorization: Bearer abc123.def456.ghi789 status=401 user=svc-report password=example-password-not-real";

// Each rule replaces the secret's value, and leaves the name of the field in place.
const redacted = line
  .replace(/Bearer\s+\S+/g, "Bearer [redacted]")
  .replace(/password=\S+/g, "password=[redacted]");

console.log(redacted);
```
~~~

The output is the same in every language:

~~~text
2026-11-12T09:14:03Z request GET /reports Authorization: Bearer [redacted] status=401 user=svc-report password=[redacted]
~~~

The time, the method, the endpoint, the status, and the user are all still there. A reader can still see what happened, and no one can use the line to act as the caller.

> **.NET Framework 4.8.** The C# sample uses `System.Text.RegularExpressions`, which .NET Framework 4.8 provides. No callout is needed.

Add a third field to the line, such as `client=reporting`, and press Run. It appears in the output unchanged, because no rule touches it. A rule that matches only what it means to remove is the goal.

> **Aside: a rule that is too wide.**
> The pattern `\S+` stops at the next space. If a secret contained a space, the rule would remove only its first part and leave the rest exposed. Write rules for the format your secrets actually take, and test them on a line that contains a secret with unusual characters.

> **Common mistake.** Redacting by deleting the whole line, or the whole field, because it is simpler. A line with no status and no user cannot explain the failure. Replace the value, and keep the name.

---
