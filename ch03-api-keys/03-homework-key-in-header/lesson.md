# Homework: Carry a Key in a Header

You'll build a request to a reserved example address, carry the key in a header, and print the request. Then you'll check that the key is not in the URL, and print the result of that check.

The URL and the key are in the starter, and they're fake. Use them exactly as written.

- URL: `https://api.example.invalid/v1/orders`
- Key: `fake-key-1234`

Your output has three lines, in this order:

1. `GET ` followed by the URL.
2. `X-Api-Key: ` followed by the key.
3. `Key in URL: no` if the key does not appear in the URL, or `Key in URL: yes` if it does.

The check on the third line is the point of the exercise. Write it as a real test, so it would catch a mistake: if someone later builds the URL with the key in it, the line should change to `yes`.

> **Aside: why a check, when the answer is obvious?**
> The URL here never contains the key, so the check always prints `no`. The habit is what matters. A check that runs every time catches the mistake the day someone adds a query parameter in a hurry, which is exactly when you'd want to know.

> **Common mistake.** Putting the key in the header but also appending it to the URL "just in case" some part of the API needs it. Both places must not be used. Choose the header the API documents, and leave the URL alone.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
