# Homework: Check the Verifier

The server stored a code challenge when the sign-in began. At the token endpoint, the tool sends a verifier, and the server must decide whether to issue tokens.

Write a function named `verify` that takes the verifier and the stored challenge, and returns `accepted` or `rejected`. It must:

1. Refuse an empty verifier, without computing anything.
2. Compute the S256 challenge from the verifier, as the sample does.
3. Compare the result with the stored challenge.

The starter has the stored challenge and three verifiers to try, in this order: the correct verifier, an empty one, and a wrong one. Print the result for each, one per line. The expected output is:

~~~text
accepted
rejected
rejected
~~~

> **.NET Framework 4.8.** This exercise uses `SHA256.HashData` and `CryptographicOperations.FixedTimeEquals`. Neither is in .NET Framework 4.8. The 4.8 alternatives are the ones the sample describes: create a `SHA256` instance and call `ComputeHash`, then compare the two byte arrays in a loop that examines every byte and never stops at the first difference.

> **Aside: an empty verifier is a missing verifier.**
> A token request with no verifier must never reach the comparison. Some implementations accept an empty value by accident, because the digest of an empty string is a real value. Check for the missing value first.

> **Common mistake.** Comparing the challenges with an ordinary equality check. Use a comparison that takes the same time however the values differ, as Chapter 5 described.

Use the starter for your language, write your function and the printing below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
