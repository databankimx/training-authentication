# 1. Why Tokens Expire

A signed token is valid until its expiry claim says otherwise. That's useful, because a verifier can decide from the token alone, but it creates a problem. Once issued, a token can't be taken back by the verifier, so the only control over a token that's already in circulation is its lifetime.

The timeline shows a token's life, and where the script should refresh.

~~~text
issued                                        expiry
|-------------- usable -------------|--- margin ---|
                                    ^              ^
                            refresh here       expired
                      (inside the margin)    (no time left)
~~~

## Short lives limit damage

If a token leaks, an attacker can use it until it expires. A token that lives for an hour does less harm than one that lives for a year, and an identity provider can keep lifetimes short without asking anyone to do anything. Short lifetimes are the main way access tokens limit exposure.

## What a script must do

A script that holds a token must do two things. It has to check the expiry before each use, so it doesn't send a token the API will refuse. And it has to obtain a new token before the old one runs out, so its work isn't interrupted. The rest of this chapter covers both.

Clocks matter too. The expiry is a time, and the script's clock and the verifier's clock may disagree by a few seconds. A script that waits until the last second risks sending a token that expires while the request is still in flight.

> **Aside: the token you can't take back.**
> Revoking a signed token takes effort, because a verifier that checks only the signature will still accept it until it expires. That's one reason many systems check a revocation list as well, and one reason short lifetimes matter so much.

> **Common mistake.** Checking expiry once, when the script starts, and then using the token for hours. The token expires in the middle of the run, and the requests after that fail. Check before each use, or before each batch.

---
