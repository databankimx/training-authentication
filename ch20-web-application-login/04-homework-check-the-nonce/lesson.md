# Homework: Check the Nonce

The application stored a nonce when the login started, and it's in the session. Three ID tokens come back from the identity provider, each with different claims. Your task is to check each token's nonce against the stored one.

The rules are:

1. If the token has no `nonce` claim, refuse it, with the reason `nonce missing`.
2. If the token's nonce is different from the stored one, refuse it, with the reason `nonce mismatch`.
3. Otherwise accept it.

Print one line per token, in the form `label: result`. The expected output is:

~~~text
matching nonce: accepted
wrong nonce: rejected, nonce mismatch
no nonce: rejected, nonce missing
~~~

> **Aside: a missing nonce is not a matching one.**
> A token with no nonce must not pass just because there is nothing to compare. Check for the claim first, and refuse the token when it is absent.

> **Common mistake.** Comparing the nonce only when the token has one. A token that drops the claim then skips the check entirely. The comparison and the presence check are both required.

> **.NET Framework 4.8.** This exercise uses `Dictionary`, `TryGetValue`, and string formatting, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
