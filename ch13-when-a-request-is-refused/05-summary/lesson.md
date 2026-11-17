# Summary: When a Request Is Refused

This chapter covered what each kind of refusal means and the action it calls for. You've seen a table that maps status codes to actions, and a retry loop that stops at the limits the rules set.

## What you learned

- A 401 means the credential could not be accepted. Refresh the token once, then retry. A second 401 after a refresh stops the request.
- A 403 means the caller is known but not permitted. Stop and report. Retrying repeats the same decision.
- A 429 means the caller is sending too fast. Wait for the time the server gives, then retry.
- A 5xx response means the server is struggling. Back off between attempts, and stop after a fixed number of tries.
- An unknown status is a reason to stop and report, not to guess.
- A retry limit counts the first attempt too. Three retries make four attempts.
- Keep one action table, and use it for every request the script makes.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A request returns 401 with a token that was valid an hour ago. What should the script do?
○ Stop and report, because a 401 always means the caller is not permitted.
→ A 401 is about the credential, not the permission. A new token may fix it.
◉ Refresh the token once, then retry the request.
→ Right. The token has probably expired, and one refresh is the right response.
○ Retry the same request until it succeeds, because the token may come back.
→ A token does not come back once it expires. Refresh it, and limit the attempts.
```

```quiz
A request returns 403. Why should the script not simply retry it?
○ Because retries are not allowed by the API's terms.
→ The reason is the decision itself. The retry gets the same answer for the same permissions.
○ Because a 403 is always a permanent failure that no change can fix.
→ A permission can be granted later, but not by retrying. A person has to change it.
◉ Because the server has already decided, and a retry sends the same credential into the same decision.
→ Right. A retry changes nothing about the permissions, so it only repeats the refusal.
```

```quiz
A script allows three retries, and each attempt returns 503. How many attempts are made in total?
◉ Four, the first attempt and the three retries.
→ Right. A retry limit of three means one attempt plus three retries.
○ Three, because the retries are the attempts.
→ The first attempt is also an attempt, so the total is one more than the retries.
○ Six, because each retry counts twice.
→ A retry is one more attempt, not two. The total is four.
```

---
