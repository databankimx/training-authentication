# Summary: Expiry and Refresh

This chapter covered why access tokens expire, how a script decides whether a token is usable, and how a refresh token renews access without another sign-in. You've seen the margin that a script uses to refresh early, and how its size changes the number of refreshes.

## What you learned

- Access tokens are short-lived so that a leaked one does limited harm, and the identity provider can keep lifetimes short without tracking every token.
- A script must check expiry before each use, not once at the start of a run.
- A decision has three outcomes: usable, refresh first, or expired.
- A safety margin moves the boundary between usable and refresh first. Expiry itself doesn't move.
- A refresh token is exchanged at the token endpoint for a new access token. It must never go to an API, and it must be protected as a credential.
- Rotating refresh tokens must be saved at once, and concurrent refreshes should share a single exchange.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A script checks a token's expiry once, when it starts, and then runs for two hours. What is the most likely result?
○ Nothing, because the expiry was checked at the start.
→ The check happened once. The token keeps its original expiry while the run goes on.
◉ The token expires mid-run, and the requests after that fail unless the script refreshes.
→ Right. Checking once is not enough, because the token's life continues to run down.
○ The token lasts for the whole run, because the API extends it on each request.
→ The API doesn't extend a token by being used. Expiry is fixed when the token is issued.
```

```quiz
Which of these should a refresh token be sent to?
○ Every API the script calls, so each one can check it.
→ Sending it to APIs spreads the most powerful credential to places it doesn't belong.
○ The logs, so the team can see which token was refreshed.
→ Logs must never hold a refresh token, and nothing good comes from writing it there.
◉ Only the token endpoint, where it is exchanged for a new access token.
→ Right. The refresh token stays with the identity provider, which is the one place that needs it.
```

```quiz
A margin of 60 seconds is used, and a token has 45 seconds left. What should the script do?
◉ Refresh the token first, because the time left is within the margin.
→ Right. Inside the margin, the token is still valid, but the script refreshes before the next request.
○ Use the token, because it has not yet expired.
→ It has not expired, but it is inside the margin, so it should be refreshed first.
○ Report that the token expired, and stop the run.
→ Expired means no time is left. Forty-five seconds is still left, so the token needs refreshing.
```

---
