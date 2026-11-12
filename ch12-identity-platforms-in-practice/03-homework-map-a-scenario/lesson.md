# Homework: Map a Scenario

A nightly script runs on a server in your own data centre. It calls a reporting API that is run by a vendor, and it needs to read reports and nothing else. The vendor's API accepts tokens from an identity platform that your team already uses, and you can choose whichever of the five platforms in the comparison table issues the tokens.

Choose one platform, and describe the setup in its terms. Name the identity the script runs as, the kind of credential it uses or avoids, the service identity it calls with, the issuer of its tokens, and the scope it asks for. Then say what would be different if the team used a different platform.

Write in your own words, and keep it to a short paragraph or two for the platform you chose, plus one sentence for each other platform.

~~~spoiler
There are several reasonable answers. Here is one for Okta.

The script runs as an API Services app integration, which is a service app with no user. It authenticates to the team's custom authorization server with a client ID and a secret, or with a signed assertion if the team has chosen key-based authentication. The authorization server is the issuer of the access token, and the script requests the reporting scope, which an access policy must allow for that app. Okta's access policy and scope settings decide what the token carries, so the script asks only for what it needs.

For the other platforms, the same scenario looks like this. Microsoft Entra ID uses an app registration with a service principal, and a secret or certificate, since a script outside Azure cannot use a managed identity. AWS does not issue the reporting token, so the team would need a federation arrangement that exchanges an AWS role for the vendor's token. Google uses a service account, with a key or a federation setup. Keycloak uses a confidential client with the service account option, which lets it obtain tokens without a user.

The important differences are where the secret lives, which party issues the token, and whether the platform can vouch for the server without a stored credential. The mapping is the same, but the steps and the risks are not.
~~~

---
