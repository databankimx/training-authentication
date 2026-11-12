# 1. Classifying a Refusal

Four kinds of refusal cover most of what a script meets. Each one has a different cause, and each one has a different right answer. The diagram shows how to tell them apart.

~~~text
Refused?
  |
  +-- 401 Unauthorized   --> the credential is missing, expired, or wrong
  |                          refresh the token once, then retry
  |
  +-- 403 Forbidden      --> the credential is valid, but not allowed
  |                          stop and report; do not retry
  |
  +-- 429 Too Many       --> the caller is sending too fast
  |   Requests              wait for the time the server gives, then retry
  |
  +-- 500-599 Server     --> the server failed, probably for a while
      error                  back off, then retry, a limited number of times
~~~

## 401: the credential is the problem

A 401 means the server could not accept the credential. The token may have expired, the signature may not match, or the header may be missing. The useful response is to get a new token, once, and try again. If the second attempt is also refused with a 401, the credential is wrong in a way a new token won't fix, and the script should stop.

## 403: the permission is the problem

A 403 means the credential was accepted, and the caller has no permission for this request. Asking again changes nothing, because the answer depends on permissions, not on timing. A new token with the same scopes gets the same refusal. Stop, report the endpoint and the action, and let a person look at what the script is allowed to do.

## 429: slow down

A 429 means the caller has exceeded a rate limit. Many servers say how long to wait, in a `Retry-After` header. Wait that long, then retry. Waiting is the whole fix, so retrying immediately only adds to the problem.

## 5xx: the server is having trouble

A 500, 502, 503, or 504 means the server failed or cannot serve the request right now. These are often temporary, so a retry after a pause is reasonable. Back off, which means waiting longer after each attempt, and stop after a fixed number of tries.

> **Aside: the response that looks like a permission problem.**
> Some APIs return a 403 when a token is expired, or a 401 when a permission is missing. The status code is the server's guess, and the message body often says more. Read the body, and check the API's documentation before you act on a status code you don't expect.

> **Common mistake.** Retrying every refusal the same way. Retrying a 403 wastes time and can trigger rate limits. Refreshing on every 401 can loop forever. Each class has its own response, and each response has a limit.

---
