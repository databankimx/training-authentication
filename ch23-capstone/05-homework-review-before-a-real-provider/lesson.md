# Homework: Review Before a Real Provider

The capstone works, and its four results are correct. Before it is connected to a real identity provider, a reviewer would still have concerns. Write a short review that names at least five things in the capstone that must change, and for each one, say why and what the change is.

Look at the code and the reading together. Think about where the secret lives, what the API trusts, what each log line would show, how the scopes are granted, and what happens to the test environment afterwards.

Write in your own words. A short line for each change is enough, with the reason beside it.

~~~spoiler
A good review might include these points.

The shared signing secret. The API and the provider hold the same key in the sample. In a real system the API fetches the provider's public keys from its discovery document and verifies with those, so the provider's private key never leaves the provider. The change is to replace the shared key with discovery and cached keys, as Chapter 18 described.

The client secret in code. The sample writes the secret into the file. Move it to a secrets store, and read it at run time, so that it never appears in source, logs, or a repository, as Chapter 2 described.

Logging. The sample prints results, but a real client would log requests. Redact the token and the secret from each log line, as Chapter 14 described, and log the endpoint, the client, and the status instead of the full request.

Scope grants. The provider in the sample grants whatever the client asks for. A real provider grants only the scopes registered for the client, as the homework showed, so the client should request only what it needs.

Audience and issuer values. The example addresses are reserved names. Replace them with the real values registered for the API, and check them on every request, as Chapter 17 described.

Failure handling. The sample doesn't handle a slow or unavailable provider. Add a bounded retry with backoff and a cache for the token, as Chapters 13 and 22 described.

The test environment. A test client and a test API should be removed when the exercise ends. Leaving them running keeps a credential alive that nobody is watching.

A good review names the change, the reason, and the chapter that covers it, and it treats each refusal in the flow as a check to keep rather than an obstacle to remove.
~~~

---
