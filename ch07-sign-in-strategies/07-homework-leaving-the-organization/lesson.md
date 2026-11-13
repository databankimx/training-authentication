# Homework: When Someone Leaves

A colleague is leaving the organization today. Their account is disabled at the identity provider, and they have signed out of their laptop. Write a list of everything else that must be removed or ended for their access to stop, and for each item, say why it still matters.

Aim for a complete list, not a long one. Think about each place the person's access may live: the identity provider, the applications, the sessions, the tokens, the scripts they set up, and the secrets they could reach.

~~~spoiler
Disabling the account at the identity provider stops new sign-ins, but several things can keep working without it.

Accounts in each application that keep their own copy of the person. Applications provisioned by just-in-time sign-in, or with local accounts, must be deactivated there, or the copy stays active. SCIM deprovisioning reaches the applications that support it, and any that don't need manual removal.

Sessions that are already open. A session in an application can continue until it expires or is ended, so end sessions where the platform allows, or wait for their expiry and check that it is short.

Tokens that are still valid. An access token or refresh token issued before the account was disabled may keep working until it expires, so revoke refresh tokens where possible, and check the lifetime of access tokens.

Scripts and service accounts the person set up. A script that runs under their name, or uses a key they created, keeps working after they leave. Each one needs an owner reassigned or its credential replaced.

Secrets they could read. API keys, passwords in shared vaults, and secrets they could reach through a manager may need rotating, because the person knew them.

Devices and personal access. Registered devices, multi-factor methods, and any access granted outside the identity provider should be removed too.

The list works only if someone owns it. Record who is responsible for each item, so none of them is assumed to have been done by someone else.
~~~

---
