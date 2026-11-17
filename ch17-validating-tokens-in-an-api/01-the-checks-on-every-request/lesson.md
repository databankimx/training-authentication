# 1. The Checks on Every Request

A token that reaches your API is data from outside, and it may be anything. Before the API acts on it, the token must pass a fixed set of checks. The checks should run in the same order on every request, and any failure should refuse the request.

The diagram shows the checks in the order this chapter uses.

~~~text
Authorization header present and well formed
   |  no: refuse (401)
   v
Algorithm is on the API's own allowed list
   |  no: refuse (401)
   v
Signature checks out against a key the API trusts
   |  no: refuse (401)
   v
Issuer is the expected issuer
   |  no: refuse (401)
   v
Audience includes this API
   |  no: refuse (401)
   v
Expiry (with a small clock tolerance) is still in the future
   |  no: refuse (401)
   v
Required claims are present, then the request proceeds
~~~

## Why this order

The algorithm check comes before the signature check, because the algorithm decides how the signature is checked. The signature comes before the claims, because claims read from an unverified token mean nothing. The issuer and audience say whose token this is and who it is for. Expiry is last among the time checks, because a token that fails an earlier check should not be reported as merely expired.

Each check refuses the request on its own. An API that checks the signature but not the audience accepts every token issued by the same provider, including the ones meant for other APIs. That is the flaw Chapter 16 described.

> **Aside: the clock tolerance is small on purpose.**
> A few seconds of tolerance covers clocks that disagree slightly. Minutes of tolerance turn an expiry into a suggestion, and a leaked token stays usable for longer than its lifetime says.

> **Common mistake.** Reading claims from the decoded payload before the signature is checked, and making a decision from them. Decoding is not verifying, as Chapter 4 showed. Verify first, and then read the claims.

---
