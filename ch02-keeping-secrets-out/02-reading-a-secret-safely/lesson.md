# 2. Reading a Secret Safely

Once a secret lives in the environment, your script needs to read it. The pattern is simple: look up the name, check the value exists, and use it. What matters most is what the script says about the value. It can report that the value is there, and how long it is, but it never prints the value itself.

## The sample

The sample looks up a variable called `EXAMPLE_API_TOKEN`. If the variable isn't set, it says so. If it is set, the sample reports its length, and nothing else about the value.

~~~examples
```csharp
// The variable name is the only thing this sample knows about the secret. Its value is never printed.
var name = "EXAMPLE_API_TOKEN";
var value = Environment.GetEnvironmentVariable(name);
if (string.IsNullOrEmpty(value))
{
    Console.WriteLine($"{name} is not set.");
}
else
{
    Console.WriteLine($"{name} is set, and it is {value.Length} characters long.");
}
```
```python
# The variable name is the only thing this sample knows about the secret. Its value is never printed.
import os

name = "EXAMPLE_API_TOKEN"
value = os.environ.get(name)
if not value:
    print(f"{name} is not set.")
else:
    print(f"{name} is set, and it is {len(value)} characters long.")
```
```javascript
// The variable name is the only thing this sample knows about the secret. Its value is never printed.
const name = "EXAMPLE_API_TOKEN";
const value = process.env[name];
if (!value) {
  console.log(`${name} is not set.`);
} else {
  console.log(`${name} is set, and it is ${value.length} characters long.`);
}
```
~~~

When the variable isn't set, the output is the same in every language:

~~~text
EXAMPLE_API_TOKEN is not set.
~~~

Press Run to see that. To see the other branch, set the variable in the PowerShell window you started the reader from, then start the reader again from that window, and press Run in each tab. The output then reports the length, and the value stays out of it.

## Why the length and not the value

The length is useful for a quick sanity check. A token that's 0 characters long is missing, and a token that's 12 characters long is probably a placeholder. The length gives you that without revealing anything a person could use.

> **Aside: the variable that's set in a different window.**
> An environment variable belongs to the window or process that set it, and it's inherited by the programs that window starts. Setting it in one window doesn't change another window that's already open. That's why the reader must be started from the window where you set the variable.

> **Common mistake.** Printing the value to check that it's right. You'd then have a secret in your output, your logs, and possibly your history. Check the length, or a masked form of the value, and never the whole value.

---
