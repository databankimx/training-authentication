# Homework: What to Check First

Before you rely on an identity platform for a script, the vendor documentation must answer some questions that the comparison table can't. Name three of them that matter most for the security of the script, and for each one, say how you would confirm the answer for your own tenant or account.

Write one or two sentences per question. Choose questions you could really check, not general hopes.

~~~spoiler
Any three of these work, as long as each one says how it would be confirmed.

Which token lifetime applies to a service identity, and whether it can be shortened. Confirm it in the platform's settings for the application, and in a test token's expiry claim.

Which claims the token carries, and what identifies the caller. Confirm by decoding a test token from the same configuration, and checking the subject and audience against what the API expects.

Whether the platform supports a credential-free option for the script, and what it requires. Confirm in the documentation for the platform's workload identity or federation feature, and by checking which of the script's hosts qualify.

How secrets are rotated, and whether old and new secrets can overlap. Confirm in the rotation documentation, and by testing a rotation in a non-production tenant before relying on it.

Which events are logged for sign-ins and token requests, and how long they are kept. Confirm in the audit log documentation, and by checking that a test sign-in appears in the log.

What the platform's default permissions are for a new application or service identity. Confirm the defaults, and by reviewing what the new identity can reach before granting anything.

The common thread is that a claim about a platform is a claim about a version, an edition, and a configuration. Confirm it in the environment you will use.
~~~

---
