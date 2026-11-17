# Homework: Why a Bearer Token Is Not a Password

A password and a bearer token can both get a caller through the door, so people often treat them as the same thing. Write a short answer, in your own words, to this question.

Why is a bearer token not a password? Name one way the two differ in how they're issued, and one way you'd protect each of them differently.

Write two or three sentences, and keep them plain. If you can't answer one part, say which part, and write what you'd check first. A partly right answer that says where it's unsure is worth more here than a confident guess.

~~~spoiler
A password is a secret that a person knows and types, and it's checked against the identity system, which keeps only a protected form of it. A bearer token is issued by an identity provider after a successful sign-in, and whoever holds it is treated as the caller, with no further check on the holder.

Tokens differ from passwords in three ways that matter here. They expire, so a stolen token stops working on its own. They can be scoped to a few permissions, so a stolen token can do less. And they can be revoked, so the provider can cut one off without changing the person's password.

To protect a password, you keep it out of code and logs, and the person changes it when it may be exposed. To protect a token, you keep it out of code and logs, store it only where the script needs it, let it expire, and request only the scopes the job needs.
~~~

---
