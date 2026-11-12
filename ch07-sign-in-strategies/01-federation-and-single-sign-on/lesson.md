# 1. Federation and Single Sign-On

Federation is a trust arrangement. One system, the identity provider, is responsible for knowing who people are. Other systems, the service providers, trust its word and don't keep their own copy of each password. The application sends the person to the identity provider, the person signs in there, and the identity provider tells the application who they are.

The diagram shows the trust relationship. The person goes to the identity provider, and the application relies on what comes back.

~~~text
Person ----> Application (service provider) ----> Identity provider
                         ^                                  |
                         |                                  |
                         +--------------------------------+
                          (the application never sees a password)
~~~

## The two roles

The identity provider holds the accounts, checks the passwords and second factors, and issues the statements that prove a sign-in. The service provider is the application, and it accepts those statements in place of a password of its own.

The trust is set up in advance. The two systems exchange configuration, such as the identifiers and the keys that will be used to check each statement. Once that's in place, the application never sees the person's password at all.

## Single sign-on

Single sign-on is what people experience. A person signs in to the identity provider once, and then reaches several applications without signing in again, because each application trusts the same identity provider and the identity provider still holds a session for the person.

For people, that means fewer passwords and fewer prompts. For administrators, it means one place to enable, disable, and audit access, instead of one per application. That second point is the reason many organizations adopt it, and it's also why the identity provider becomes an important thing to protect.

> **Aside: one sign-in, many doors.**
> Single sign-on concentrates risk as well as convenience. A compromised identity provider can reach every application that trusts it. Monitor it as the most sensitive system in the estate, and protect its administrators accordingly.

> **Common mistake.** Treating single sign-on as the end of the access question. It answers who the person is. Each application still decides what that person may do, as Chapter 1 described.

---
