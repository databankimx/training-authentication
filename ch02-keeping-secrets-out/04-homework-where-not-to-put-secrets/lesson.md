# Homework: Where a Secret Must Never Appear

The first step listed several places a secret must never appear. Pick three of them, and write one or two sentences for each. Say where the secret would end up, and who could read it there.

Write in your own words. A short answer that names the right places and the right reasons is what this exercise is after.

~~~spoiler
Any three of the following work, as long as each one says what goes wrong.

Source code, including comments and test data. Code is copied to colleagues, backups, and build servers, so a secret in it spreads to everywhere the code goes.

A repository's history. Deleting a line later doesn't remove the value from earlier commits, and anyone with access to the repository can read them.

Logs and error messages. Logs are kept for a long time and read by many people and tools, and an error message often includes the request that failed, with its headers.

A URL. Query strings end up in logs, browser history, and proxies, none of which you control.

A chat message, a ticket, or a screenshot. These are stored by other systems, and they're often shared more widely than you expect.
~~~

---
