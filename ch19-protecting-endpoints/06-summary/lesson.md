# Summary: Protecting Endpoints

This chapter covered deny by default, the decision each endpoint needs, and how to keep those decisions consistent as an API grows. You've protected endpoints with a required scope, written the decision table an API uses, and found the gap that a route added without a decision creates.

## What you learned

- An API refuses every request unless an endpoint has been named as open to it, and the caller meets its requirement.
- Each endpoint's decision checks, in order, whether it is listed, whether it is public, whether the token is valid, and whether the token carries the required scope.
- A 401 means the caller could not be identified, and a 403 means the caller is identified and lacks permission.
- The rules belong where the routes are declared, so a reviewer can see every endpoint and its requirement.
- A named policy keeps a requirement in one place, and every endpoint that uses it follows any change.
- Scopes suit clients, and roles suit people. Choose one primary mechanism per kind of caller, and keep the mapping in one place.
- Every endpoint needs a test that the allowed cases pass and the refused cases are refused, and a new endpoint without a test is unprotected in practice.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A developer adds a new endpoint and does not attach a protection rule. What should the API do with a request to it?
○ Serve it, because the endpoint exists and the developer intended it to be used.
→ An endpoint without a decision is not open by intention. Deny by default is what protects against exactly this mistake.
◉ Refuse it, because the endpoint has not been named as open to the caller.
→ Right. Deny by default refuses every endpoint until its requirement is decided.
○ Refuse it with 403, because the caller has no permission for an endpoint it has never seen.
→ The refusal is a decision about the endpoint, not the caller. An unlisted endpoint is refused for that reason, and 404 is the honest answer.
```

```quiz
A caller presents a valid token that lacks the scope an endpoint requires. What status should the API return?
○ 401, because the token is not sufficient for the request.
→ The token is valid, so the caller is identified. A 401 would suggest signing in again, which will not help.
○ 200, because the token is valid and the endpoint is reachable.
→ Validity of the token is not enough. The endpoint also needs the scope it requires.
◉ 403, because the caller is identified and lacks the permission the endpoint requires.
→ Right. A 403 tells the caller the permission is missing, which is the accurate answer.
```

```quiz
Why does a named policy help an API stay consistent?
◉ Because a requirement is changed in one place, and every endpoint that uses the policy follows the change.
→ Right. A policy keeps a requirement in one place, so the protection of similar endpoints cannot drift apart.
○ Because a named policy removes the need to test each endpoint.
→ Policies still need tests. A policy that is never tested drifts quietly.
○ Because a policy lets an endpoint skip token validation when the caller is trusted.
→ A policy states a requirement. It never skips validation, which comes before any requirement is checked.
```

---
