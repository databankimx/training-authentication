# 3. Policies and Consistency

The sample put each requirement next to its route. That works for three endpoints. An API with fifty endpoints needs a way to keep the requirements consistent, so that the same kind of endpoint is protected the same way everywhere, and so that a reviewer can read the whole policy in one place.

## Name the policy

A policy is a named requirement, such as "reports reader", that says what a caller must present. Each endpoint refers to a policy by name rather than repeating the scope check. When the requirement changes, it changes in one place, and every endpoint that uses the policy follows.

## Scopes or roles

A scope names a permission that a token was granted, and it's the natural unit for a client that calls the API. A role names a set of permissions that a person or a group holds, and it's often used for people using an application. Both can decide access, and many APIs use both. The rule is to choose one primary mechanism per kind of caller, and to keep the mapping between roles and scopes in one place, so the two don't drift apart.

## Test every endpoint

A policy is only as good as the tests that check it. For each endpoint, write one request that should be allowed and one that should be refused, the refused one with the wrong scope, and one with no token. The table below shows the cases for the sample API.

| Endpoint | Token | Expected |
|---|---|---|
| `/health` | none | allowed |
| `/reports` | `reports.read` | allowed |
| `/reports` | `orders.write` only | refused, 403 |
| `/reports` | none | refused, 401 |
| `/orders` | `orders.write` | allowed |
| `/orders` | `reports.read` only | refused, 403 |

Run these cases on every change, and add a row whenever an endpoint is added. A new endpoint without a row is an endpoint no one has checked.

> **Aside: an endpoint with no test is an endpoint with no protection.**
> The tests are how you know the policy holds. A policy that nobody tests drifts quietly, and the first person to notice is usually an attacker.

> **Common mistake.** Testing only the allowed cases. A test that every valid token passes shows nothing about the refusals, and the refusals are where the protection is.

---
