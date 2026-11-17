# Summary: Logging Without Leaking

This chapter covered what a log line should record, the common ways secrets reach logs, and how redaction removes a secret while keeping the rest of the line. You've seen a redaction sample, added a rule for a new kind of secret, and written an error message that names a failure without revealing a credential.

## What you learned

- A log line records when, what, who, the outcome, and a request identifier, not the credential that made the request.
- Secrets leak through headers, bodies, URLs with query strings, exception messages, and debug output.
- A secret written to a log stays there after the bug is fixed, so treat it as leaked and rotate it.
- Redaction replaces the value of a secret and keeps the name of its field, so the line still explains what happened.
- Rules should match the format of the secrets they target, and they should be tested on unusual values.
- Counting the replacements is a check that each rule matched something.
- An error message should give the status, the error code, the endpoint, and the client, and never the secret, the request body, or the full response.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A bug that wrote a client secret to a log is fixed today. What should the team do about the secret?
◉ Treat the secret as leaked, and rotate it.
→ Right. Once a secret has reached a log, it has been exposed, and rotation is the remedy.
○ Nothing, because the bug is fixed and the log can be cleaned later.
→ The copies in backups and log stores still hold the secret, so the fix does not remove it.
○ Delete the most recent log file, and the secret is gone.
→ Older logs and backups hold copies too. Deleting one file is not enough.
```

```quiz
A redaction rule removes an entire log line whenever it contains a password. Why is this a poor rule?
○ Because log lines must always be kept in full, for compliance.
→ Compliance is not the issue here. The problem is what is lost from the line.
◉ Because the line can no longer explain what happened, such as the status and the endpoint.
→ Right. Redaction should replace the value and keep the context that explains the failure.
○ Because a password is never a secret worth removing.
→ A password is a secret, and it should be removed. The mistake is removing the whole line to do it.
```

```quiz
Which of these is the best field to log for a failed token request?
○ The client secret, so the engineer can check that it is correct.
→ The secret must never appear in a log, even to check it.
○ The full request body, so the engineer sees every field sent.
→ The body carries the secret. Log the fields that explain the failure instead.
◉ The provider's error code, with the status and the client name.
→ Right. The error code, status, and client name are enough to diagnose the failure, and none is a secret.
```

---
