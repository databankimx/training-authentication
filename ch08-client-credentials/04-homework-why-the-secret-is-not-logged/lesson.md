# Homework: Why the Secret Is Not Logged

A token request fails at three in the morning, and the on-call engineer opens the log. Write a short answer that explains why the client secret must not be in that log, and says what the log entry should contain so the failure can still be diagnosed.

Cover two things: who could read the log and for how long, and which details are enough to find the cause without the secret. Write in your own words, and keep it to a short paragraph or two.

~~~spoiler
A log is read by many people and tools, kept for a long time, and copied to other systems, so a secret written to it spreads to all of them. Anyone who reads the entry, now or after a backup restore, can use the secret to request tokens as the client, and the client's access lasts until the secret is rotated. Rotating a secret that has appeared in logs is the only real fix, which is why the secret should never be there in the first place.

A useful entry records the token endpoint, the client identifier, the scopes asked for, the status code and any error code the identity provider returned, and the time and request identifier. Those details let the engineer see whether the client name is wrong, the scope isn't granted, the secret has expired, or the endpoint has moved, without the secret itself. The error code and description the provider returns are usually the most useful part of all.
~~~

---
