# 1. Deny by Default

Every endpoint an API exposes is a door. The safest rule for doors is that they are locked unless someone has deliberately unlocked them. That's deny by default: a request is refused unless the endpoint has been named as open to it, and the caller has what that endpoint requires.

Deny by default protects against the most common endpoint mistake. A new route is added, the developer forgets to protect it, and it is open to every caller on the network. With deny by default, the same forgotten route is refused until someone decides how it should be protected.

## The decision for each endpoint

An endpoint's decision has up to three parts, and each part can refuse the request.

- **Is the caller authenticated?** Does the request carry a valid token? If not, the answer is 401.
- **Is the caller permitted?** Does the token carry the scope or role the endpoint requires? If not, the answer is 403.
- **Is the endpoint public?** An endpoint that needs no protection, such as a health check, says so explicitly. Its absence from the list of public endpoints is never a reason to open it.

The diagram shows the order.

~~~text
Request arrives
   |
   +-- endpoint not on the API's list ----------> refuse (404 or 401)
   |
   +-- endpoint listed as public ---------------> serve it
   |
   +-- token missing or invalid ----------------> refuse (401)
   |
   +-- token lacks the required scope ----------> refuse (403)
   |
   +-- token has the required scope ------------> serve it
~~~

## Where the rules live

A rule that exists only in each endpoint's code is easy to miss. A new endpoint can be written without the rule, and nothing notices. Put the rules where the routes are declared, so that each route shows its requirement next to it, and so that a reviewer can see every endpoint and its protection at a glance.

> **Aside: a public endpoint is a decision too.**
> A health check that anyone can call is fine, provided someone chose it on purpose. Keep the list of public endpoints short, and review it when the API changes.

> **Common mistake.** Protecting the routes you remember and leaving the rest open. A list of protected routes goes out of date as soon as a new route is added. Deny unlisted routes, and make the list of open routes the one that has to be justified.

---
