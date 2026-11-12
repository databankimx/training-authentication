# 5. Accounts, Provisioning, and Multi-Factor Sign-In

Federation says who can sign in, but something must create the accounts those people use, and something must remove them. Multi-factor sign-in adds a second check to the password. Both affect how much an attacker can do, and removing access is the part organizations most often get wrong.

## Provisioning

There are two common ways an application gets its accounts. Just-in-time provisioning creates the account the first time a person signs in, using the details in the sign-in response. Pre-provisioning creates the accounts ahead of time, often from a directory, so the application knows who may use it before anyone signs in.

Just-in-time is simpler to set up, but it can't remove an account that nobody has used. Pre-provisioning gives a clear list of who has access, which is what an auditor usually wants to see.

## Deprovisioning with SCIM

SCIM is a standard protocol for managing accounts across systems. An identity provider uses it to create, update, and deactivate users in the applications that support it. When someone leaves, the deactivation reaches each application, and their access stops.

Deprovisioning is the step that matters most. Disabling the account at the identity provider is not enough if an application keeps its own copy of the account, or holds a session or token that is still valid. Each application needs its access removed, and each token or session needs ending, so the person can't keep working after they have left.

## Multi-factor sign-in

Multi-factor sign-in asks for more than one kind of proof. The common kinds are something you know, such as a password, something you have, such as a device that holds a key, and something you are, such as a fingerprint. Using two different kinds makes a stolen password alone insufficient.

Not every second factor is equally resistant. A one-time code can be entered into a fake page, while a phishing-resistant method ties the sign-in to the real site. Prefer the strongest method your identity provider offers, and check which methods your organization permits.

> **Aside: two factors of the same kind.**
> A password and a security question are both things you know, so they don't add the protection a second kind of factor does. The useful question is whether the second proof comes from a different category.

> **Common mistake.** Treating deactivation at the identity provider as complete offboarding. Applications with their own copies of accounts, and tokens that are still valid, keep the person's access until those are cleared too.

---
