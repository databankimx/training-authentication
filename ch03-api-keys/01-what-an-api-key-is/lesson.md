# 1. What an API Key Is

An API key is a long, random string that the API issues to an account, a project, or an application. When your script sends it, the API looks it up and learns which account is calling. That's the whole job of a key: it identifies the account, and it's used as a credential because anyone who holds it can make the same calls.

The diagram shows what a key can tell you, and what it can't.

~~~text
API key  --> identifies --> the client (application or project)
                              |
                              x  does NOT identify the person who started the script
~~~

## What a key identifies

A key identifies a client of the API, which is usually an application or a project, not a person. The key says "this is the reporting service", or "this is the team's integration account". It doesn't say which person started the script, when they started it, or whether they're still allowed to run it.

That difference matters. A key keeps working after the person who created it leaves the company, changes role, or stops using the tool. Someone has to take responsibility for each key, and someone has to remove it when the client it serves is retired.

## What a key is not

A key isn't user identity, and it isn't a proof that a particular person approved the call. If a request made with a key does something wrong, the logs show the key, not the person. That's why many teams give each script or service its own key, rather than sharing one among several.

A key also doesn't carry the permissions the API will check. Some keys can do everything their account can do, and others are limited to a few actions. The API documentation says which kind you have.

## Keys and rotation

Because a key is a credential, it's subject to the same rules as any other: keep it out of code, read it at run time, and replace it if it leaks. Many APIs let you issue a second key, move your script to it, and then retire the first, so you can rotate without downtime. Plan for that before you need it.

> **Aside: the key that outlives its owner.**
> A key created by someone who has since left is a common source of trouble, because nobody remembers what it's for. Record who owns each key, what it's for, and where it's used, so that someone can answer those questions when the key needs to change.

> **Common mistake.** Treating an API key as proof of who is running the script. The key proves which client is calling, and nothing more. If you need to know which person acted, the API needs a user credential, which Chapter 1 described.

---
