# 9. Authorization Code with PKCE

Many tools run on a person's machine: a command-line utility, a desktop app, or a mobile app. They can't keep a client secret safely, because anyone with the software can read it. The authorization code flow with PKCE lets such a tool sign a person in without a secret that could be stolen. PKCE adds a one-time proof that the party exchanging the code is the same party that asked for it.

The chapter has a reading step, a sample step, a code homework item, a written homework item, and a summary with three quizzes.

---
