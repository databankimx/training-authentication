# 1. What a Log Line Holds

A useful log line answers a few questions: what happened, when, to which request, and with what outcome. It doesn't need the credential that made the request, or the body the request carried. Most of the time, a failure can be explained with the status code, the endpoint, the client name, and a request identifier.

## What to record

- **When** the event happened, in a fixed time format.
- **What** was attempted, such as the method and endpoint.
- **Who** made the attempt, by the client or service name, not by a credential.
- **The outcome**, such as the status code and any error code the server returned.
- **A request identifier**, so the line can be matched with the server's own records.

## Where secrets leak into logs

The leaks come from a few places, and each one is easy to add without noticing.

- **Request headers**, which carry the `Authorization` header and API keys, if the whole request is logged.
- **Request bodies**, which carry client secrets and passwords in token requests.
- **URLs with query strings**, which carry keys added by someone in a hurry.
- **Exception messages**, which often include the request that failed.
- **Debug output**, added to find a bug and left in.

> **Aside: the log outlives the fix.**
> A secret written to a log stays there after the bug that wrote it is fixed. Copies are kept in backups and in log stores, so the fix does not remove the secret from them. Treat any secret that reached a log as leaked, and rotate it.

> **Common mistake.** Logging a whole object because it is convenient, such as the request or the response. The object carries every header and body field, including the ones you would never log on purpose. Log the fields you chose.

---
