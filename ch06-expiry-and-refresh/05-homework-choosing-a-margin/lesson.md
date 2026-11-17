# Homework: Choosing a Margin

In the last exercise, a bigger margin meant more requests needed a refresh first. Write a short answer that explains that trade-off, and says what should decide how large the margin is.

Cover three things: what a small margin risks, what a large margin costs, and which quantities the right margin must cover. Write in your own words, and keep it to a short paragraph or two.

~~~spoiler
A small margin refreshes rarely, which is cheap, but it risks sending a token that expires while the request is in flight, or that a verifier with a slightly different clock already considers expired. The request then fails, and the script may have to retry.

A large margin refreshes early and often. Each refresh is a call to the identity provider, so a big margin adds load there, adds latency to the work that waits for a refresh, and can hit rate limits if many scripts share a client.

The margin has to cover the longest time a request can take to reach the API, plus the difference between the script's clock and the verifier's clock, with some room for slow networks. The request times you measure in practice are the right input, not a guess, and the margin should be large enough for the slowest common case and no larger.
~~~

---
