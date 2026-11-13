# Homework: Why the Server Chooses

A colleague proposes a simpler validator. It reads the algorithm, the key identifier, and the issuer from the token's own header and payload, and then uses whatever those fields name. Write a short answer that explains why this is unsafe, and what the validator should do instead.

Write in your own words, in a short paragraph or two. Name at least one concrete way an attacker could exploit the simpler validator, at the level of design, without describing steps to carry it out.

~~~spoiler
The token is the thing being checked, so it cannot also be the source of the rules for checking it. If the validator takes the algorithm from the header, a token can name an algorithm the API never intended to accept, including one that makes the signature check meaningless. If it takes the key from a location the token names, the token can point to a key the attacker controls, and the signature will check out against a key the API never trusted. If it takes the issuer from the token, any issuer the attacker chooses is accepted.

The validator should hold its own configuration: the issuer values it trusts, the audience it serves, the keys for each trusted issuer, and the one algorithm or small list it accepts. It should compare the token's claims and header against that configuration and refuse anything that does not match, whatever the token says about itself.

The principle is simple. Everything the validator relies on to make a decision should come from the API's own settings or from an issuer it trusts. The token supplies the values being checked, not the values to check them against.
~~~

---
