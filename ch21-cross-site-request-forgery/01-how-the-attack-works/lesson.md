# 1. How the Attack Works

The attack needs three things. The person is signed in to a site, so the browser holds its session cookie. The person visits a second page, which can be on any site. And the second page can make the browser send a request to the first site. Those are the conditions. The second page doesn't need to read anything from the first site, because the damage comes from the change the request makes.

The steps, as the first site sees them, are these:

1. The person signs in to the application, and the browser stores the session cookie.
2. The person visits another page, which the attacker controls.
3. That page causes the browser to send a state-changing request to the application.
4. The browser attaches the session cookie to the request, because the request goes to the application's own address.
5. The application sees a valid session, and performs the change.

The application never sees a bad password or a stolen token. It sees a valid session making a request, which is exactly what it expects a real user to do.

## The two defences

The application can stop the attack without changing how the person signs in. Two defences do most of the work.

- **An anti-forgery token.** The application gives the page a secret value, which is also stored in the session. The page sends that value back in a header on every state-changing request. The attacker's page can cause the browser to send the cookie, but it can't read the token, so it can't put the right value in the header. The application refuses a request whose header is missing or does not match the session.
- **An origin check.** Browsers add an `Origin` header to requests that change state. The application refuses a request whose origin is not its own. A request started from another site carries that site's origin, so it is refused.

Each defence works alone in most cases, and the strongest designs use both. The cookie's SameSite attribute, covered in the next reading step, is a third layer.

> **Aside: the attacker never needs the cookie.**
> The browser sends the cookie for them. The attacker's only job is to make the request, and the defences are there so that a request the user didn't intend is refused, even though it carries the right cookie.

> **Common mistake.** Relying on the request method alone. A change made with a GET request is the easiest to forge, because a link or an image can trigger it. Keep state-changing actions on POST, PUT, or DELETE, and still protect them.

---
