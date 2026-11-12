# Homework: Redact a New Secret

The starter has a log line from a call to an orders endpoint. It carries three secrets: an API key in an `X-Api-Key` header, a bearer token, and a password. The sample already handles the bearer token and the password. Your task is to add a rule for the API key, apply all three rules, and report how many values you removed.

Apply the rules in this order:

1. Replace the value after `X-Api-Key:` with `[redacted]`. Keep the header name and the colon.
2. Replace the value after `Bearer ` with `[redacted]`.
3. Replace the value after `password=` with `[redacted]`.

Count each replacement. Print the redacted line first, then one more line, in this form:

~~~text
secrets removed: 3
~~~

The expected output is two lines. The redacted line should keep every other field exactly as it was: the time, the method, the endpoint, the status, and the client.

> **Aside: a count is a check.**
> Counting the replacements tells you whether the rules matched what you expected. If the count is lower than the number of secrets in the line, a rule is missing its target, and the line may still leak something.

> **Common mistake.** Changing the rule for the bearer token so that it also removes the `Authorization:` label. The label is not secret, and the line is harder to read without it. Replace only the value.

> **.NET Framework 4.8.** This exercise uses `System.Text.RegularExpressions`, which .NET Framework 4.8 provides, and `Regex.Matches` to count the matches. No callout is needed.

Use the starter for your language, write your rules below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
