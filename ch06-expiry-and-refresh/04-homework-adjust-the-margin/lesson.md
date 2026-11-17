# Homework: Counting Refreshes

A script makes requests at five fixed times. The token expires at `1893456000`, and the request times are in the starter. For each margin in the starter, count how many of the five requests need a refresh first, and how many found the token already expired.

Use the same decision as the sample: a request is expired when no time is left, refresh first when the time left is within the margin, and usable otherwise. Print one line per margin, in this form:

~~~text
Margin 60: refresh first 1, expired 1
~~~

The expected output is three lines, one for each margin in the starter.

> **Aside: the margin changes how often you refresh, not whether you need to.**
> A bigger margin catches more requests before they fail, at the cost of more refreshes. Watch the counts as the margin grows: the refresh count rises, and the expired count doesn't change. Expiry is a fixed point in time, and only refreshing can prevent it.

> **Common mistake.** Counting the expired requests as refresh-first ones. A request with no time left has already expired, and refreshing then is too late for that request. Test for expired first, as the sample does.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
