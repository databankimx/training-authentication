# Homework: Why Not Retry a 403

A colleague suggests that a script should retry every failed request three times, including a 403, because a permission might have been fixed a moment ago. Write a short answer that explains why a 403 should stop the request instead, and says what the script should report.

Write in your own words, in a short paragraph or two. Mention what a retry can and cannot change, and what a useful report contains.

~~~spoiler
A 403 means the server accepted the credential and decided the caller may not do this. That decision depends on the permissions the caller holds, not on timing. A retry sends the same credential, with the same scopes, to the same decision, so it gets the same answer, and the retries only add load and delay.

It also causes harm of its own. Repeated refusals can look like an attack to the server's defences, and they can lock the account or trip an alert. A script that keeps retrying a permission problem makes the problem louder without making it go away.

The report should name the endpoint, the action attempted, the status code, the identity the request ran as, and any message the body gave. A person can then check whether the script's permissions are wrong, the permission was removed on purpose, or the script is calling something it should not. The decision belongs to them, not to a retry loop.
~~~

---
