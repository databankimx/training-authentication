# Homework: The Allowed Algorithm

The validator in the starter checks the issuer, the audience, the expiry, and the signature, and it accepts two algorithms: HS256 and HS512. This API uses HS256 only. A token signed with HS512 with the same key is a token the API did not issue in that form, and it must be refused.

Your task is to make the validator accept only HS256. Then run the three cases in the starter. The expected output is:

~~~text
valid HS256: 200
HS512 token: 401
wrong audience: 401
~~~

The starter's three tokens are signed with a 64-byte secret, which HS512 requires. The starter prints the status for each one, so before your change the second line would print 200.

> **Aside: the list is the policy.**
> The API's own list of allowed algorithms is a decision the API makes, not a property of the tokens it receives. Keep the list short, and name the one algorithm your issuer uses.

> **Common mistake.** Narrowing the list in one place, and leaving a second validation path that still accepts the wider list. Every path that verifies a token must use the same allowed list.

> **.NET Framework 4.8.** The C# starter uses `JwtSecurityTokenHandler`, `SymmetricSecurityKey`, and `ReadJwtToken`, which the System.IdentityModel.Tokens.Jwt package provides on 4.8. No callout is needed for the algorithm check.

Use the starter for your language, make the change, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
