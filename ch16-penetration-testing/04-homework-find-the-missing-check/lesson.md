# Homework: Find the Missing Check

The validator in the starter has a check for expiry, but it is missing the check for audience. Without it, a token issued for another API is accepted by this one. That is the flaw in the defences table, and it is exactly the kind of gap a tester looks for in a review.

Your task has two parts. First, find the missing check: it compares the audience in the token with this API's own audience. Second, add it to the validator, after the expiry check, so that a token for another API is refused.

Then run the three cases in the starter. The expected output is three lines:

~~~text
valid: accepted
other API: rejected: wrong audience
expired: rejected: expired
~~~

> **Aside: a validator is only as good as its checks.**
> The first two lines of the starter's output, before your change, would show `other API: accepted`. A case that the validator accepts when it shouldn't is the clearest sign of a missing check, so keep a case like this in your tests.

> **Common mistake.** Adding the audience check before the expiry check and then assuming the expiry check is no longer needed. Both checks are required. Each one refuses a different case.

> **.NET Framework 4.8.** The C# starter uses named tuples in an array and a local function, which .NET Framework 4.8 provides. No callout is needed for this exercise.

Use the starter for your language, add the check below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
