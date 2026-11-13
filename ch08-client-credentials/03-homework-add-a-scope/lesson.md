# Homework: Add a Scope

The script needs to read two kinds of data, reports and orders, so its token request must ask for two scopes. Build the request in the starter. It has the endpoint, the client identifier, the secret, and the first scope.

Your task has three parts:

1. Add the scope `orders.read` to the request, so the scope field holds both scopes, separated by a space.
2. Encode the scope field, so the space is written as `%20`, as the sample does.
3. Print the endpoint as `POST ` followed by the address, then the body with the secret masked as `****`.

The expected output is two lines, and the secret must not appear in either one:

~~~text
POST https://login.example.invalid/oauth/token
grant_type=client_credentials&client_id=example-client&client_secret=****&scope=reports.read%20orders.read
~~~

> **Aside: why the scopes are a list, not a string.**
> Keeping the scopes in a list while you build the request makes it easy to add or remove one, and it makes the encoding step obvious. Join them with a space at the point where the request is built, not before.

> **Common mistake.** Putting the second scope in as a separate `scope` field. Each pair name must appear once, and the scopes belong together in one field, separated by spaces.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
