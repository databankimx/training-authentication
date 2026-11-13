# 1. The Same Ideas Under Different Names

Every platform has to answer the same questions: who is this application, what may it ask for, who issues its tokens, and how long does a sign-in last. Each one answers them with its own vocabulary, and the vocabulary is what makes documentation hard to read the first time.

## The questions behind the names

- **What is the application's identity?** The thing a script or service signs in as.
- **What is its non-human identity?** Where the script runs, which the platform can often vouch for without a stored secret.
- **Who issues its tokens?** The authorization server, or the identity service that signs them.
- **What may it ask for?** The scopes, or the roles and permissions that map onto them.
- **How long does the access last?** Token lifetimes, sessions, and the rules for renewing them.

When you open a vendor's page, find which question it answers, and the name stops being the obstacle.

## Why the names differ

Each platform grew from a different starting point. Some began as directories of people, and added applications later. Others began as tools for running services and added people later. The names reflect that history, and none of them is wrong. The concepts are the same, so a term that feels unfamiliar usually has an equivalent you already know.

> **Aside: the same name can mean two things.**
> Some terms are reused across platforms with different meanings. A "role" in one product may grant permissions directly, and in another it may be a label that a policy reads. Check what a term does in the product you're using, not what it sounds like.

> **Common mistake.** Assuming a term carries the same security meaning everywhere it appears. A permission, a role, and a scope can each grant access in a different way, and the difference matters when a token leaks.

---
