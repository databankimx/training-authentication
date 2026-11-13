# Homework: The Backup Job

A backup job copies files from a document store to a secure location each night. Its token requests these scopes: `files.read`, `files.write`, `files.delete`, `users.read`, and `admin.all`.

Write a short answer that does three things. Say which of the five scopes the job plausibly needs, and which it doesn't. For each scope you would remove, say what a leaked token carrying it could do. Finally, say how you would check whether the job's scopes match its work.

Write in your own words, and keep it to a short paragraph or two for each part.

~~~spoiler
A backup job needs to read the files it copies, so `files.read` is the scope it depends on. It may need `files.write` only if it restores, and a backup that only copies out does not need it. Either way, it should not carry a scope that changes the document store.

The other three are the risk. `files.delete` lets a leaked token destroy the files the backup was meant to protect, and a deleted original with no good backup is a loss. `users.read` exposes who has access to what, which helps an attacker plan a further attack. `admin.all` is the broadest scope there is, so a leaked token carrying it could change the system itself, not just its data.

To check the scopes against the work, compare the request with what the job actually calls: list the operations it performs, map each to the scope it needs, and remove any scope with no matching operation. Repeat the review when the job changes, and when a scope is added, ask which operation it serves.
~~~

---
