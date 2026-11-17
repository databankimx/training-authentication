# 2. SAML and OpenID Connect

Two protocols carry most federated sign-in. They solve the same problem with different building blocks, and you'll meet both, often in the same organization.

## SAML 2.0

SAML is an XML-based standard, and it's been used for enterprise single sign-on for many years. The identity provider issues an assertion, a signed XML document that states who signed in and what the application may use. The assertion travels through the person's browser, usually by an auto-submitted form, to the application, which checks its signature and accepts the statement.

SAML is common for enterprise applications that were built before newer protocols, and for many commercial products that sell single sign-on to their customers.

## OpenID Connect

OpenID Connect sits on top of OAuth 2.0, the authorization framework that Chapter 8 covers in detail. It adds an identity token, a JSON Web Token that carries claims about the person, and a standard set of scopes and endpoints. A web application, a mobile app, or a single-page app can all use it.

OpenID Connect is common in newer applications, and it's the usual choice when the same sign-in must work for a web app, a mobile app, and an API.

## Which one, and how to tell

The application's documentation will say which protocol it uses, and the identity provider's configuration will offer one or both. You don't usually choose between them yourself. You choose the identity provider, and the application's own setup decides the rest.

> **Aside: the same person, two different statements.**
> A SAML assertion and an OpenID Connect identity token both say who signed in, but they're shaped differently. SAML uses signed XML, and OpenID Connect uses a signed JWT, so the checks a verifier makes are the ones from Chapters 4 and 5, applied to a different format.

> **Common mistake.** Assuming a protocol makes sign-in secure on its own. Both protocols depend on the application checking the signature, the audience, and the expiry. Skipping those checks breaks either one.

---
