# Summary: Sign-In Strategies

This chapter covered how an application hands sign-in to an identity provider, how SAML and OpenID Connect carry that sign-in, how a session starts and ends, and what removing an account involves. You've built an OpenID Connect authorization request, and listed what has to be cleared when someone leaves.

## What you learned

- Federation makes an identity provider responsible for knowing who people are, and applications trust its statements instead of keeping their own passwords.
- Single sign-on gives people one sign-in for many applications, and gives administrators one place to manage access.
- SAML 2.0 uses signed XML assertions, and OpenID Connect uses signed JWT identity tokens on top of OAuth 2.0.
- Service-provider-initiated sign-in is safer than identity-provider-initiated sign-in, because the application knows what it asked for.
- An authorization request carries encoded parameters, including a `state` value the application checks on return.
- Single logout is best effort, because each application must support it and act on it.
- Deprovisioning must reach every application, session, and token, not just the identity provider account.
- Multi-factor sign-in is strongest when the second factor comes from a different category, and when it resists phishing.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A person signs out of one application. Which statement is most accurate?
○ They are signed out of every application that uses the same identity provider.
→ Single logout is best effort. Other applications keep their sessions unless they're told to end them.
◉ Only that application's session ends, unless single logout reaches the others.
→ Right. Each application keeps its own session, and single logout has to reach each one to end it.
○ They are signed out of the identity provider, which ends every session at once.
→ Signing out of one application doesn't necessarily end the identity provider's session, and it doesn't end the others.
```

```quiz
Which of these is the main reason an application should check the state value on return?
○ To count how many times the person has signed in.
→ The state isn't a counter. It ties the response to the request the application made.
○ To choose which scopes the person receives.
→ Scopes are set in the request and the identity provider's policy. The state value does not choose them.
◉ To confirm the response matches a request the application actually sent.
→ Right. A response with a different state is one the application didn't ask for, so it should be refused.
```

```quiz
An employee's account is disabled at the identity provider, but one application keeps its own local account. What is the risk?
◉ The employee may still reach that application, unless its local account is also removed or disabled.
→ Right. A local copy of the account is a separate access path, and it has to be closed too.
○ There is no risk, because the identity provider is the only source of accounts.
→ An application with its own account keeps that account, whatever the identity provider does.
○ The employee's password will be automatically reset in that application.
→ Disabling an account does not reset passwords in other systems, so nothing changes there.
```

---
