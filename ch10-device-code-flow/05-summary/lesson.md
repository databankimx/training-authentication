# Summary: The Device Code Flow

This chapter covered how a script on a machine without a browser gets tokens with a person's help. You've seen the four steps, the states a device moves through while it polls, and the rules that keep a finished flow finished.

## What you learned

- The device asks for a code, shows the short user code and address, and then polls the token endpoint.
- The person signs in on another device, so the device never handles the person's password.
- `authorization_pending` means keep waiting. `slow_down` means wait longer before the next poll.
- `success`, `access_denied`, and `expired_token` end the wait, each with its own meaning.
- A device should map every answer to a state explicitly, and report one it doesn't recognize.
- A final state stays final. An answer that arrives after the flow has expired or been approved must not change it.
- Ignoring `slow_down` harms the device, and it can affect the client's other devices too.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
Why does the device flow let the person sign in on a phone rather than on the device?
○ Because the device has no network connection to the identity provider.
→ The device does have a connection. It polls the token endpoint over it.
◉ Because the device has no browser, and the person can sign in on a device that does.
→ Right. The sign-in happens on a device with a browser, and the rack-mounted device only waits for the result.
○ Because the device is not allowed to hold a password, even briefly.
→ Holding a password is not the reason. The device has no browser to sign in with.
```

```quiz
A device receives `slow_down` in response to a poll. What should it do?
◉ Wait longer before the next poll, as the server instructs.
→ Right. The device must adapt its polling, because it is the one making too many requests.
○ Poll again immediately, because the answer means the server is busy.
→ Polling faster is what caused the answer. Immediate retries make it worse.
○ Stop the flow and report failure, because the code must have expired.
→ Slow down is not a failure. It asks the device to wait, and the flow can continue.
```

```quiz
A device is in the state expired, and then receives an answer of success. What should it do?
○ Move to approved, because a success answer should always win.
→ A final state stays final. An expired code cannot be reopened by a later answer.
○ Ask the person to sign in again, and wait for the new answer.
→ That might be right in a new flow, but this answer must not change the current one.
◉ Stay expired, because a final state is not changed by a later answer.
→ Right. The rule that a final state stays final protects the flow from a late or replayed answer.
```

---
