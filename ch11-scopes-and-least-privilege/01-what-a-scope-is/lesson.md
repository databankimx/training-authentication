# 1. What a Scope Is

A scope is a name the identity provider and the API both understand, and it stands for a permission. A token that carries `reports.read` may read reports. A token that doesn't carry it may not, however well the caller is known. Scopes are how one token can serve several purposes, and how a single token can be made narrower than the account behind it.

## Least privilege

The principle of least privilege says that a process should have only the access it needs to do its work, and no more. For a script, that means asking for the scopes the job uses, and nothing extra for convenience. A reporting script needs to read reports. It doesn't need to delete orders, and it shouldn't be able to, even if the account it runs under could.

The principle matters most when a token leaks. A token that can read reports is a problem. A token that can read reports, write orders, and administer the system is a disaster.

## Scopes grow over time

A script that started with one scope often gains others. Someone adds a feature and asks for a scope to try it. The scope stays after the feature is removed, and nobody remembers it is there. Over years, a script can end up with far more access than its job has ever needed.

Review the scopes periodically. Compare what each script requests with what it actually uses, and remove what it doesn't.

> **Aside: the wildcard is a scope too.**
> Some providers accept a wildcard scope that grants everything, or a broad administrative scope. Treat these as the most dangerous entries in any request. Ask for the named scopes the job needs, and never a wildcard to save effort.

> **Common mistake.** Requesting every scope a provider offers, in the hope that the job will need one of them later. A scope that is never used is still a scope a leaked token carries. Add scopes when the job needs them, and remove them when it doesn't.

---
