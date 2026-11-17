# Homework: Rotation Evidence

A nightly reporting script uses a client secret that the team must rotate every ninety days. An auditor asks you to show that the last year of rotations happened on schedule.

List the evidence you would produce to show that, and for each item name the owner responsible for keeping it. Think about the moment each record is created, the place it is kept, and who must sign it off. Write one line per item, and keep the list to the evidence that really proves the rotation.

~~~spoiler
Useful evidence includes these items. Each one has an owner in the team responsible for the script.

A rotation record for each cycle, with the date the new secret was issued, the identity of the person or process that issued it, and the date the old secret was revoked. Owner: the team that runs the script, which performs the rotation.

The inventory entry for the script's client, with its named owner, the rotation period, and the date of the next rotation due. Owner: the team lead, who keeps the inventory current.

The change record or approval for each rotation, if your process requires one. Owner: the team lead, who approves it.

Proof that the old secret stopped working, such as a failed sign-in with it after revocation, logged with its date. Owner: the platform or identity team, which keeps the sign-in logs.

Confirmation that the new secret is stored in the approved secret store, with the store's access record for it. Owner: the security team, which manages the store.

Evidence that the script itself used the new secret after the rotation, such as sign-ins from the script's host under the new credential. Owner: the team that runs the script.

The point of the list is that each record is made at the time, and each has someone whose job it is to keep it. A rotation nobody can show is, for an auditor, a rotation that did not happen.
~~~

---
