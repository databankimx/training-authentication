# Homework: Draw the Sign-In Flow

Choose one application that a person signs in to, such as a reporting tool or an internal portal. Draw the sign-in as a numbered sequence, from the moment the person opens the application to the moment they have a session in it.

For each step, write who acts (the person, the application, or the identity provider), what is sent or done, and what the receiving party checks. A plain sequence is enough. You don't need a diagram, but a diagram is fine if you find it easier.

Choose a flow you can explain from start to finish. If you don't know one application's details, describe a flow you would expect, and say which details you'd need to confirm.

~~~spoiler
One plausible sequence for a service-provider-initiated OpenID Connect sign-in is this.

1. The person opens the application. The application finds no session.
2. The application builds an authorization request with its client identifier, a redirect address, the scopes it needs, and a state value it keeps. It sends the person to the identity provider.
3. The person signs in at the identity provider, using a password and a second factor.
4. The identity provider sends the person back to the redirect address with a code and the state value.
5. The application checks that the state matches the one it kept, then exchanges the code, server to server, for tokens.
6. The application checks the identity token's signature, issuer, audience, and expiry, and then creates its own session for the person.

The checks at steps 5 and 6 are the important ones. Without them, a response the application didn't ask for could be accepted.
~~~

---
