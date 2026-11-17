# Summary: Capstone

This chapter brought the tutorial together. You've followed a client through a simulated identity provider to a protected API, checked each refusal the system makes, and reviewed what must change before a real provider is used.

## What you learned

- A complete flow has five parts: the client's request, the provider's decision, the client's use of the token, the API's validation, and the API's scope check.
- Each part can refuse, and each refusal means something different: a wrong secret, a missing token, and a missing scope are three separate results.
- A provider grants only the scopes registered for the client, whatever the client asks for.
- The API validates every token and checks its scope on every request, as Chapters 17 and 19 described.
- A real system replaces the shared secret with the provider's public keys, and it fetches those keys through discovery.
- Real secrets belong in a secrets store from the start, and a test environment must be removed when the exercise ends.
- A passing success path proves little. Test each refusal the system is meant to make.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A client with the correct secret asks for a scope it is not registered for. What should the provider do?
○ Refuse the whole request, because the client asked for something it cannot have.
→ The client is valid, so the provider can still grant the registered scopes. The refusal is per scope.
◉ Issue a token with only the registered scopes, and deny the rest.
→ Right. The provider grants what the registration allows, and the list of denied scopes shows what was refused.
○ Issue a token with every scope the client asked for, and let the API decide.
→ The provider is the first place to decide. Granting unregistered scopes gives the API a decision it should never face.
```

```quiz
The API refuses a request with 403. What does that tell you?
○ The token is missing, so the client should sign in again.
→ A missing token gives 401. A 403 means the caller is known and lacks a scope.
○ The provider refused the client's secret.
→ A wrong secret is refused by the provider before any token exists. The API never sees that case.
◉ The token is valid, but it does not carry the scope the endpoint needs.
→ Right. The validation passed, and the scope check refused the request.
```

```quiz
What must change in the sample before it is connected to a real provider?
◉ The API must fetch the provider's public keys, and the secret must move into a secrets store.
→ Right. The API verifies with the provider's public keys, and real secrets never live in the code.
○ Nothing, because the checks are the same for any provider.
→ The checks are the same, but the trust in the sample is simplified. The shared secret and the example addresses must change.
○ The API must hold the provider's private key, so it can check tokens itself.
→ The private key stays with the provider. The API needs only the public keys to verify.
```

---
