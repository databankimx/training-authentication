# 2. Comparison Table

The table gives the main term each platform uses for the concepts in this tutorial. Use it as a starting point. Each product has more terms than these, and the vendor's own documentation is the authority for any one of them.

| Concept | Microsoft Entra ID | Okta | AWS | Google Cloud | Keycloak |
|---|---|---|---|---|---|
| Application's registered identity | App registration (application object) | App integration | IAM user, or a role | OAuth client, or a project | Client |
| Identity a workload runs as, without a stored secret | Managed identity, or workload identity federation | Not a separate type; use a service app with a signed assertion | IAM role, attached to the workload | Service account, with workload identity federation | Client with service account enabled |
| Service identity for machine-to-machine calls | Service principal | API Services app integration | IAM role assumed through STS | Service account | Confidential client with service account |
| Token issuer | Microsoft identity platform (tenant) | Authorization server | Security Token Service (STS) | Google's OAuth 2.0 service | Realm |
| Permission a token can carry | Scope, or app role | Scope, on an access policy | Policy on the role | OAuth scope | Client scope, or role |
| Where sign-in lasts | Session and refresh token lifetimes | Session and token lifetimes | Session duration on the role or identity center | Session and token lifetimes | Realm session settings |

The concept rows read left to right: the identity the application is known by, the identity a workload runs as, the identity a service uses to call another service, the system that issues tokens, the permissions those tokens carry, and the rules for how long the access lasts.

## Where to read the details

The vendor pages below describe these concepts in full. Start with the one for the platform you use, and check the version and edition you're on, since the names and defaults change.

- Microsoft Entra ID: the page on application and service principal objects, in the Microsoft Learn documentation for the identity platform.
- Okta: the guides for service apps and the client credentials flow, in Okta's developer documentation.
- AWS: the IAM documentation on roles, and the STS documentation on assuming a role.
- Google Cloud: the documentation on service accounts and their keys.
- Keycloak: the server documentation on realms, clients, and client scopes.

> **Aside: the table changes faster than this tutorial.**
> Platforms rename features, add new ways of avoiding stored secrets, and retire old ones. Treat the table as a map of where to look, and verify any row against the current vendor documentation before you build on it.

> **Common mistake.** Copying a term from one platform into the documentation of another. The names look interchangeable, but a service principal, a service account, and an IAM role do not carry the same rules, so write each term with its platform's meaning.

---
