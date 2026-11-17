# Homework: Masking a Secret

Sometimes a log line or a screen needs to say which secret was used, without giving the secret away. A common way is to show the last few characters and hide the rest. Your task is to write a function that does that, and then run it on three sample values.

The rule is:

- If the secret is longer than four characters, the masked form is `****` followed by its last four characters.
- If the secret is four characters or fewer, the masked form is just `****`. Showing the last four of a short secret would reveal all of it.

Name the function `mask`, and write it in your language. Then print the masked form of each sample, one per line. The three samples are already in the starter, and they're fake.

The expected output is three lines:

~~~text
****real
****hort
****
~~~

> **Aside: why the last four, and not the first.**
> The last four characters are the ones people usually compare when they're checking which key they used, so they're the useful part to show. The first characters of many tokens are a fixed prefix that identifies the kind of token, which tells an attacker nothing new. Either way, the rule that matters is that a short secret is never shown in full.

> **Common mistake.** Masking every value the same way, including short ones. A three-character secret masked as its last four is the whole secret. Check the length first.

> **.NET Framework 4.8.** The C# solution uses the index-from-end form `value[^4..]`, which is a C# 8 feature. On .NET Framework 4.8, write the last four characters as `value.Substring(value.Length - 4)`.

Use the starter for your language, write the function and the printing below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
