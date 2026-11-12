# Homework: An Intercepted Code

Imagine a program on the same computer as a tool that is signing a person in. It reads the authorization code as it passes through the browser. Write a short answer that says what that program gains, what it does not gain, and why the verifier makes the difference.

Keep it to a short paragraph or two, in your own words.

~~~spoiler
The program gains a code. On its own, a code is worth nothing, because the token endpoint won't exchange it without the verifier that matches the challenge stored with the code.

The program does not gain the verifier, which the tool kept in memory and never sent with the sign-in request. The challenge that was sent is one-way: the program can see it but can't turn it back into the verifier. Without the verifier, the exchange fails, so the attacker can't obtain tokens.

That is the purpose of PKCE. It binds the code to the app that started the sign-in, and it does so without a stored client secret that the attacker could read from the app's installed copy.
~~~

---
