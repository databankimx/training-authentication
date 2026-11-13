# Homework: What the Error Should Say

A token request failed. The script caught the failure, and the simplest error handler would print the whole request, the response, and the exception. Write the error message the script should log instead.

Your message should name the failure well enough for an engineer to act on it, and contain nothing that could be used to act as the caller. List the fields you would include, and say briefly why each one is safe and useful. Then say what you would leave out, and why.

Write in your own words, and keep it to a short paragraph and a list of fields.

~~~spoiler
A useful message includes the time, the token endpoint, the client name, the scopes requested, the status code, the provider's error code and description, and a request identifier if the provider returns one. Each one tells the engineer something real. The error code often says the problem directly, such as an invalid scope, a client that is not allowed the grant, or a secret that has expired.

It leaves out the client secret, the request body, the authorization header, and the full response body. Any of those could hold a credential, and none of them is needed to diagnose a failed token request. The exception's full text is also dropped when it could echo the request, and the error code and description replace it.

Sketch of the line: the time, "token request failed", the endpoint, the client name, the scopes, "status 400", "error invalid_scope", and the request identifier. An engineer can match it with the provider's logs and act on it, and no reader of the log can act as the client.
~~~

---
