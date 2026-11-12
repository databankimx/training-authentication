# 1. Identity and Credentials

Two words get swapped in conversations about security all the time, and the swap causes real trouble. Identity and permission sound alike, but they answer different questions. Keep them apart in your head, and most of the rest of this tutorial will feel obvious.

Two checks happen on every request, and they answer different questions. The diagram shows the order.

~~~text
Script  --(request + credential)-->  API
                                     |
                                     +--> 1. Who is calling?    (identity)
                                     +--> 2. May they do this?  (permission)
~~~

## Identity and permission

Identity answers "who are you?" Permission answers "what may you do?" A script can prove its identity perfectly and still be allowed to do nothing useful, or it can be allowed to delete everything it can reach. Both cases are about permission, even though identity is the part that was checked.

When a request is refused, ask which question failed. If the system didn't know who was calling, that's an identity problem. If it knew exactly who was calling and still said no, that's a permission problem, and the fix is usually on the permission side, not the credential side.

## What a credential is

A credential is anything that lets a system accept your claim that you are who you say you are. A password, an API key, a token, and a certificate are all credentials. Each is a secret in some sense, because anyone who holds it can usually act as you. That's why the rest of the tutorial spends so much time on where credentials live and how they're handled.

> **Aside: a name is not a credential.**
> The name of a script, or the account it runs as, identifies it, but it proves nothing. Anyone can type a name. A credential is the thing that makes the claim believable.

## When a credential leaks

Never paste a real password, key, or token into a lesson, a script, or a repository. If you do, treat it as leaked, even if you deleted it straight away. Deleting a file doesn't remove the value from the history, or from any copy someone already made.

Replacing a leaked credential is the fix. Hiding it is not. Chapter 2 covers how to keep secrets out of your code in the first place, so this rule only comes up when that habit slips.

> **Common mistake.** Deleting a leaked secret and carrying on. The secret was exposed when it was pushed, so it still needs replacing. Deleting the file only stops it from being shown again.

---
