# When a Request Is Refused or a Secret Leaks

Two situations need a clear first step, and people often get them wrong under pressure. One is a request that starts failing. The other is a secret or token that may have been exposed. The steps below are a starting point. Your team's incident process takes over once it's involved.

## A request is refused

1. Read the status code, and match it to the table in the cheat sheet.
2. For a 401, check whether the token is expired, and whether it was issued by the expected issuer for the expected audience. Refresh once if it is expired.
3. For a 403, check the scopes the token carries against the scopes the endpoint requires. Do not retry it. The fix is a permission change, made by a person who owns the decision.
4. For a 429 or 5xx, wait for the time the server gives, and back off. Stop after the limit, and report.
5. Check the logs for the request identifier, the endpoint, and the client name. Do not copy the token or the secret into a ticket.
6. If the cause is a change, look at what changed recently: a rotated key, an edited scope, or a new redirect address.

## A secret or token may have leaked

Treat it as leaked as soon as there is a reasonable suspicion. Do not wait for proof.

1. Tell the owner of the secret or the client, and the security contact your organization names. Do this first.
2. Revoke or disable the affected client, token, or session, so that it stops working.
3. Rotate the secret or key, and replace it in the secrets store, not in the code or a chat.
4. Look at the sign-in and token logs for the period in question. Record what the leaked credential was used for, and by whom it could have been used.
5. Find where the value appeared, such as a log, a repository, a shared document, or a screenshot. Remove it there, knowing that copies may remain in backups and history, so the rotation is what makes it safe.
6. Review how it got out. Check the controls in Chapters 2, 14, and 15 against the failure, and fix the gap, not only the instance.
7. Record the timeline and the actions taken. The record is the evidence an auditor or an incident review will ask for.

> **Aside: rotating is not a formality.**
> A leaked secret that is removed from view but not rotated still works. The rotation is the step that makes the leak harmless.

> **Common mistake.** Deleting the secret from the repository and considering the matter closed. The history, the backups, and any copies someone made still hold it.

---
