# 2. Deciding If a Token Is Usable

The decision has three outcomes. A token with enough life left is usable. A token that's inside the safety margin should be refreshed first. A token whose expiry has passed is expired and can't be used at all.

The sample takes the expiry of a token, the time now, and a margin in seconds. It works out the seconds left, then picks the outcome. The times are fixed, so the output is the same on every run. In a real script, the time now comes from the clock.

~~~examples source
```csharp
// The expiry and the margin are fixed so the output repeats. A real script reads the clock instead.
var expiry = 1893456000L;
var marginSeconds = 60L;
var checkTimes = new long[] { 1893455900L, 1893455950L, 1893456000L };

static string Decide(long expiry, long now, long margin)
{
    var remaining = expiry - now;
    if (remaining <= 0) return "expired";
    if (remaining <= margin) return "refresh first";
    return "usable";
}

foreach (var now in checkTimes)
{
    var remaining = expiry - now;
    Console.WriteLine($"At {now} ({remaining} s left): {Decide(expiry, now, marginSeconds)}");
}
```
```python
# The expiry and the margin are fixed so the output repeats. A real script reads the clock instead.
expiry = 1893456000
margin_seconds = 60
check_times = [1893455900, 1893455950, 1893456000]

def decide(expiry, now, margin):
    remaining = expiry - now
    if remaining <= 0:
        return "expired"
    if remaining <= margin:
        return "refresh first"
    return "usable"

for now in check_times:
    remaining = expiry - now
    print(f"At {now} ({remaining} s left): {decide(expiry, now, margin_seconds)}")
```
```javascript
// The expiry and the margin are fixed so the output repeats. A real script reads the clock instead.
const expiry = 1893456000;
const marginSeconds = 60;
const checkTimes = [1893455900, 1893455950, 1893456000];

function decide(expiry, now, margin) {
  const remaining = expiry - now;
  if (remaining <= 0) return "expired";
  if (remaining <= margin) return "refresh first";
  return "usable";
}

for (const now of checkTimes) {
  const remaining = expiry - now;
  console.log(`At ${now} (${remaining} s left): ${decide(expiry, now, marginSeconds)}`);
}
```
~~~

The output is the same in every language:

~~~text
At 1893455900 (100 s left): usable
At 1893455950 (50 s left): refresh first
At 1893456000 (0 s left): expired
~~~

Edit the margin in one tab, to 120 for example, and press Run. The first line changes to `refresh first`, because 100 seconds left is now inside the margin. Changing the margin moves the boundary, and nothing else.

> **Aside: the margin is a guess about the future.**
> The margin has to cover the time a request takes, plus any difference between the clocks of the script and the verifier. A margin of a few seconds fails on a slow network. A margin of an hour refreshes constantly. Pick one from the request times you actually see.

> **Common mistake.** Using `remaining < margin` in one place and `<=` in another. The boundary then differs by a second depending on where you look, which is exactly the kind of mismatch that causes a request to fail at the wrong moment. Use one comparison, everywhere.

---
