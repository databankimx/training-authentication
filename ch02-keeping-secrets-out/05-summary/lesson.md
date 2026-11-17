# Summary: Keeping Secrets Out of the Code

This chapter covered where a secret should live, how a script reads one without printing it, and how to show a secret in output in masked form. You've also seen the places a secret must never appear.

## What you learned

- A secret belongs in the environment of the machine or service that runs the script, not in the code or the repository.
- A settings file in the repository may hold a name, but not the value.
- A secret must never appear in source code, repository history, logs, URLs, or chat messages.
- A script can check that a secret is set, and report its length, without printing its value.
- A masked form shows the last four characters of a secret, and a secret of four characters or fewer is masked entirely.
- Deleting a committed secret doesn't remove it from history, so a leaked secret is replaced.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A developer commits a password by mistake, then deletes it in the next commit. What is the situation now?
◉ The password is still in the history, so it must be replaced.
→ Right. Deleting it in a later commit doesn't remove it from the earlier ones.
○ The password is gone, because it's no longer in the latest files.
→ The latest files are only part of the story. The history still holds the password.
○ The password is safe, because the repository is private.
→ Private repositories are still copied, cloned, and read by people who have access. Treat it as exposed.
```

```quiz
Which of these is the safest way to check that a secret is set in your script?
○ Print its full value, so you can see that it's correct.
→ A full value in output is the exposure you're trying to avoid.
○ Print its first ten characters, so you can see the start of it.
→ Even part of a secret can be enough for an attacker, so this is still a leak.
◉ Print its length, which confirms it's set without revealing it.
→ Right. The length tells you the value exists, and nothing a person could use.
```

```quiz
A log line needs to say which secret was used, without giving the secret away. What should it show?
○ The whole secret, because the log is private to the team.
→ Logs are copied and kept for a long time, so the whole secret does not belong there.
◉ A masked form, such as the last four characters, with a rule that hides short secrets entirely.
→ Right. The masked form identifies the secret without revealing it, and short secrets are never shown in full.
○ Nothing at all, because logs should never mention secrets.
→ Logs can name which secret was used, as long as the value stays out of them.
```

---
