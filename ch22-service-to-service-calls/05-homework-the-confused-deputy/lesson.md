# Homework: The Confused Deputy

A service is trusted to act for a user. Another service sends that first service a request, and the first service passes the request on along with the token it received for the user, and uses that token to call a third service the user never asked to reach. The first service has been used as a deputy, and it has acted with authority the requester did not hold.

Write a short answer that explains how this happens when tokens are forwarded, and names the check on the receiving services that stops a forwarded token from being accepted where it was not meant to be. Describe the failure at the level of design, not as steps to carry it out.

Write in your own words, in a short paragraph or two.

~~~spoiler
The third service accepts the token because it is valid, from the right issuer, and not expired. The first service had a legitimate reason to hold it, and it used it, so every check that looks only at the token passes. The authority belongs to the user and was granted to the first service, and the first service was tricked into using it for someone else's request.

Forwarding is what makes this possible. A token that is passed along carries the audience of the first service, and the third service should refuse it, because its audience is not the third service's own. An audience check on every receiving service stops the forwarded token where it was not meant to go. A token exchange, which asks for a new token for the third service with narrowed scopes, is the designed alternative, because the identity provider decides what the new token may do, rather than the service that happens to hold the old one.

The receiving services should check the audience, the issuer, and the expiry on every request, and they should not accept a token just because it is valid. Validity says the token is genuine. The audience says who it is for.
~~~

---
