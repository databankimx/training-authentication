# 1. Authentication and Authorization

Chapter 0 separated identity from permission. This step gives those two ideas the names that API documentation uses, and shows where each one happens in a request.

The two steps happen in order, and the diagram shows where each refusal comes from.

~~~text
Caller  --(request + credential)-->  API
                                     |
                                     +-- 1. Authenticate: who is this?
                                     |      no proof, or proof rejected --> 401
                                     +-- 2. Authorize: may they do this?
                                            permission refused -------> 403
~~~

## Authentication

Authentication is the proof. The caller presents a credential, and the API checks it. If the check succeeds, the API knows who is calling, and that is all it knows at that point. It hasn't decided anything about what the caller may do.

## Authorization

Authorization is the decision. Once the API knows who is calling, it checks whether that caller may do the thing it asked for. Reading a report, deleting a record, and changing a setting can each have a different answer for the same caller.

The two steps happen in order, and the order matters. An API that authorizes without authenticating has no idea who it's deciding for. An API that authenticates and then skips authorization has verified the caller and then let anyone do anything.

## The status codes that tell you which step failed

When a request is refused, the response code usually tells you which step failed.

- **401 Unauthorized** means authentication failed. The API doesn't know who you are, or the proof was missing, expired, or wrong.
- **403 Forbidden** means authorization failed. The API knows who you are, and it has decided you may not do this.

The names are misleading. A 401 is about identity, even though the word "unauthorized" sounds like a permission problem. Read the code as "not authenticated" for 401, and "not allowed" for 403.

> **Aside: the code that says less than you'd like.**
> Some APIs return 403 for a missing credential, or 401 for a permission failure, to avoid revealing which resources exist. The rule of thumb still holds, but the API's documentation decides the final answer for that API.

> **Common mistake.** Retrying a 403 the way you'd retry a 401. A refused permission doesn't change on its own, so retrying it just repeats the refusal. Chapter 13 covers the handling in detail.

---
