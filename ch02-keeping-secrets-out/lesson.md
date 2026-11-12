# 2. Keeping Secrets Out of the Code

A script that calls an API needs a secret to do it, and the easiest place to put that secret is right in the code. That's also the place it does the most damage. Code gets copied, shared, committed, and printed in logs, and a secret in any of those places is out of your control. This chapter shows where secrets should live instead, how a script reads one safely, and how to show a secret in output without showing the secret itself.

The chapter has two reading steps, a sample step, two homework items, and a summary with three quizzes.

---
