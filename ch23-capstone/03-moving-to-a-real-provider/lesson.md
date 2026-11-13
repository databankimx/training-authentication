# 3. Moving to a Real Provider

The capstone used a simulated provider and a shared secret so that it could run offline. A real system replaces both. Most of the code changes, and the checks stay the same. This reading lists what changes, and what must be in place before a real credential is used.

## What changes

- **The token comes from the provider's token endpoint**, requested over the network, rather than from a function in the same file.
- **The API fetches the provider's public keys** from its discovery document, as Chapter 18 described, and it verifies with those keys. It never holds the provider's signing key.
- **The audience and issuer are the provider's real values**, registered for the API, not the example addresses in the sample.
- **Each credential belongs to a registered client** with a known owner, and it is granted only the scopes it needs, as Chapter 15 described.

## What must be in place first

Before a real client secret is created, check these. Each one is a control, and an audit will ask for it.

- **A test environment you own.** Use a test account or test tenant. A production identity should never be the first test.
- **Redirect and audience values you control.** A client registered with someone else's address can send your tokens to them.
- **Secret storage ready.** The secret goes in a secrets store from the start, not in a file, a log, or a chat message, as Chapter 2 described.
- **A plan to rotate and remove it.** Know how the secret will be replaced, and how the registered client will be deleted when the test ends.

> **Aside: a test credential is still a credential.**
> A secret from a test account can be used to reach a test API, and a leaked one can still be misused. Treat it with the same care as a production secret, and delete it when the exercise is over.

## Optional: your own test account

Readers who have a test account on a provider of their own can try the same flow against it. This part is optional, and it has no check. Nothing you do here is graded or reviewed, and you can skip it without missing anything the tutorial relies on.

If you choose to do it, keep these rules.

1. Use a test account or tenant that you own, and never a production account.
2. Register one client for the exercise. Give it only the `reports.read` scope, or the scope your test API defines.
3. Put the client secret in an environment variable or a secrets store on your own machine. Do not paste it into the lesson, a sample, a log, or a chat.
4. Request a token with the client credentials flow from Chapter 8, using the provider's token endpoint and the audience your test API expects.
5. Call your test API with the token, and check the statuses against the four results from the capstone sample.
6. When you finish, delete the client and rotate or remove any secret it used.

> **Common mistake.** Pasting a real secret into a sample to make it run. The sample is for learning, and it's shared, logged, and copied. Keep real secrets in the store you chose for them, and out of every file in this tutorial.

---
