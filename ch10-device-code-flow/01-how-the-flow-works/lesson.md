# 1. How the Device Code Flow Works

The flow has four steps, and the device takes most of them alone. The one step that needs a person is the sign-in, and it happens on a different device, where a browser is.

The diagram shows the order.

~~~text
+-----------------------------+
| 1. Device asks for a code   |
+-----------------------------+
               |
               v
+-----------------------------+
| 2. Device shows the code    |
|    Person signs in on       |
|    another device           |
+-----------------------------+
               |
               v
+-----------------------------+
| 3. Device polls the token   |
|    every interval           |
+-----------------------------+
               |
               v
+-----------------------------+
| 4. Tokens, or an error      |
+-----------------------------+
~~~

## The first response

The device asks the identity provider's device endpoint for a code. The response includes a short user code, such as `ABCD-1234`, a web address where the person enters it, a longer device code that the device keeps, an `interval` in seconds, and an `expires_in` value.

The device shows the user code and the address on its screen, and then starts polling.

## Polling

The device asks the token endpoint for tokens, using the device code, and it does so at the interval the server gave. While the person hasn't acted, the answer is `authorization_pending`, and the device asks again later. If the device asks too often, the server answers `slow_down`, and the device must wait longer before the next request.

Three answers end the wait:

- `success` returns the tokens.
- `access_denied` means the person refused the request.
- `expired_token` means the code ran out before anyone entered it.

> **Aside: the person's screen is the only screen.**
> The device never sees the person's password, and it doesn't need to. It sees only whether the person has finished, which is why the sign-in can happen on a phone while the device stays in a rack.

> **Common mistake.** Polling as fast as the loop allows. The server answers `slow_down`, and a device that ignores it can be blocked for a time. Wait for the interval, and wait longer when told to.

---
