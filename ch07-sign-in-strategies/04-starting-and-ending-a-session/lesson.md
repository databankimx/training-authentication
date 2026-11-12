# 4. Starting and Ending a Session

Sign-in can begin in two places, and the difference matters for security. Sign-out is harder than sign-in, and most of the trouble people report with single sign-on comes from that gap.

The sequence shows an application-started sign-in with the state check, which is the usual pattern.

~~~text
Person             Application                Identity provider
  |                     |                           |
  |-- open the app ---->|                           |
  |                     |                           |
  |                     |- authorization request -->|
  |                     |                           |
  |<----- redirect to the identity provider --------|
  |                     |                           |
  |-- sign in (password + second factor) ---------->|
  |                     |                           |
  |<------ redirect back with code + state ---------|
  |                     |-- check state             |
  |                     |-- exchange code           |
  |                     |-- start session           |
  |<----- signed in ----|                           |
~~~

## Starting from the application

In service-provider-initiated sign-in, the person opens the application. The application notices there's no session, creates a request, and sends the person to the identity provider with that request. When the person returns, the application can check that the response matches the request it made, using the `state` value from the previous step.

This is the usual pattern, and it's the safer one, because the application knows what it asked for.

## Starting from the identity provider

In identity-provider-initiated sign-in, the person starts at the identity provider's portal and picks an application from a list. The identity provider sends a response to the application without a request from it. The application has nothing to compare the response against, so it must be more careful about accepting it, and many applications don't support this pattern at all.

## Ending a session

Sign-in creates a session in the identity provider and in each application. Signing out of one application ends only that application's session, unless the identity provider can tell the others. Single logout is the attempt to end them all, and it works through redirects or server-to-server messages. Each application must support it, and each one must act on the message, so a single application that doesn't support it leaves its session open.

That's why single logout is best effort, and why access should be removed at the identity provider rather than relying on each application to sign out.

> **Aside: the session that outlives the sign-in.**
> A token issued before a person was disabled can keep working until it expires, as Chapter 6 described. Disabling an account stops new sign-ins. It doesn't always end sessions that are already open, so check both.

> **Common mistake.** Assuming that signing out of the main application signs the person out everywhere. Each application keeps its own session until it's told to end it, and some never are.

---
