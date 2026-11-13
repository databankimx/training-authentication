# Summary: The Client Credentials Flow

This chapter covered how a script with its own identity gets an access token. You've seen the request fields, the response, and how the request is built with the secret masked for display. You've also seen why the secret must stay out of logs.

## What you learned

- The client credentials flow lets a script authenticate as itself, with a client identifier and a secret, and no person involved.
- The request is a form-encoded POST with `grant_type=client_credentials`, the client identifier, the secret, and the scopes.
- The response holds an access token, its type, and its lifetime in seconds.
- Most providers issue no refresh token in this flow, so the script requests a new token when the old one runs out.
- The secret is long-lived, so it belongs in a secrets manager or a platform identity, and it's rotated on a schedule.
- Scopes are joined by spaces, encoded as `%20`, and should be only the ones the job needs.
- The secret must never reach a log, and a failed request should be diagnosed from the endpoint, the client identifier, the scopes, and the provider's error code.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A script requests a token, and the provider returns no refresh token. What should the script do when the access token runs out?
○ Send the refresh request again, using the access token as the credential.
→ The access token isn't a credential for this flow. Repeat the client credentials request instead.
◉ Request a new token with its client identifier and secret.
→ Right. This flow has no refresh step, so the script simply asks again with its own credentials.
○ Stop, because the flow cannot renew access without a person signing in.
→ The flow needs no person. The script renews access itself by asking again.
```

```quiz
Which of these scope values is written correctly in the request?
○ scope=reports.read,orders.read
→ Scopes are separated by spaces, which are encoded as %20, not by commas.
○ scope=reports.read&scope=orders.read
→ Each field name appears once. Put the scopes together in one scope field.
◉ scope=reports.read%20orders.read
→ Right. The scopes share one field, separated by spaces, and the space is encoded.
```

```quiz
A log shows a failed token request with the full body. What is the problem?
◉ The body holds the client secret, so anyone who reads the log can request tokens as the client.
→ Right. A secret in a log spreads to everyone who can read it, so the body must be kept out.
○ The body is too long, so the log should keep only the first line.
→ Length is not the issue. The body contains the secret, which must not be logged.
○ The body shows the scope, which should never be logged.
→ Scopes are fine to log. The problem is the secret in the body.
```

---
