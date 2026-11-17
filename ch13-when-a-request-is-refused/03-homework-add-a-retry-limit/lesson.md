# Homework: Add a Retry Limit

The starter simulates four requests. Each one is a list of the status codes the server returns, one per attempt, in order. Your task is to run each request through a loop that follows the action table, and print the final result for each.

The rules are:

1. A 200 ends the request successfully.
2. A 403 stops the request at once, with no retry.
3. A 401 triggers one token refresh, and the next attempt goes ahead. A second 401 after that stops the request.
4. A 429 or 503 is retried, but no more than three times in total for one request.
5. When the retry limit is reached, the request gives up, and the count of attempts includes the last one.

Count the attempts the request made, including the one that succeeded or gave up. Print one line per request, in one of these forms:

~~~text
request 1: ok after 3 attempts
request 2: stopped: 403 (no retry)
request 3: gave up after 4 attempts
request 4: ok after 2 attempts
~~~

> **Aside: why a limit, and why three?**
> A retry limit keeps a failing request from holding a worker forever, and it keeps a script from adding load to a server that is already struggling. The number is a choice. Three is common, but the right number depends on how long the caller can afford to wait.

> **Common mistake.** Counting retries but forgetting that the first attempt is also an attempt. Three retries means four attempts in total, which is why request 3 gives up after four.

Use the starter for your language, write your loop below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
