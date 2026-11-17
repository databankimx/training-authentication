# Summary: API Keys

This chapter covered what an API key identifies, what it doesn't, and where it belongs in a request. You've built a request with the key in a header, checked that the URL stays clean, and named the places a key in a URL leaks to.

## What you learned

- An API key identifies a client of the API, usually an application or a project, not a person.
- A key keeps working after its owner leaves, so each key needs a recorded owner and purpose.
- Many APIs allow a second key, so you can rotate without downtime.
- A key goes in a header that the API documents, such as `X-Api-Key`, and never in the URL.
- A key in a URL is written to logs, browser history, referrer headers, shared links, and monitoring tools.
- The header name is public. Only the key's value is secret.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
An audit log shows that a report was downloaded using an API key. What does the key tell you?
○ Exactly which person ran the script and when.
→ A key identifies the client, not the person who ran it.
◉ Which client made the call, which is the application or project the key belongs to.
→ Right. The key identifies the client, and a person's identity needs a user credential.
○ That the call was approved by the team that owns the key.
→ A key doesn't record approval. It only identifies the client.
```

```quiz
Where should an API key go in a request?
○ In the query string, so it's visible in the address.
→ A key in the query string is written to logs and history, so avoid it.
○ In the body of a GET request, under a field called key.
→ That's unusual, and GET requests generally don't carry bodies. Use the header the API documents.
◉ In the header the API documents, such as X-Api-Key.
→ Right. A header keeps the key out of addresses, logs, and history.
```

```quiz
A key has been in use for three years, and nobody knows what it's for. What is the best next step?
◉ Find out what it serves and who owns it, then rotate it on a planned schedule.
→ Right. Record the owner and purpose, then replace the key without a surprise outage.
○ Delete it immediately, because an unknown key is a risk.
→ Deleting it may break a service that depends on it. Find out first, then rotate.
○ Leave it, because it has worked for three years.
→ Age and unknown ownership are reasons to review a key, not to ignore it.
```

---
