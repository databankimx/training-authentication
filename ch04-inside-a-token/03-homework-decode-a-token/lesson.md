# Homework: Decode a Token

The token in the starter belongs to a service account, and its payload carries an expiry. Decode the payload, then print three lines:

1. `Subject: ` followed by the `sub` claim.
2. `Expires at (Unix seconds): ` followed by the `exp` claim, exactly as it appears in the payload.
3. `Expires at (UTC): ` followed by the expiry as a date in the form `2030-01-01`, in UTC.

The expected output is those three lines, with the values from this token.

The token's signature is a placeholder, `signature-not-checked`. The exercise doesn't check it, and it doesn't need to. You're decoding the header and payload only.

> **Aside: the date in UTC.**
> Unix seconds count from midnight, January 1, 1970, UTC, so the date you read from them is a UTC date too. A local time zone would show a different date for some moments, which is why the exercise asks for UTC.

> **Common mistake.** Decoding the payload but forgetting to restore the padding, so the decoder fails on the last few characters. Base64url leaves out the padding, and you must add it back before decoding.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
