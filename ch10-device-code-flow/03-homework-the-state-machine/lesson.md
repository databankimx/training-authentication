# Homework: The State Machine

The sample mapped each answer straight to a state. A real flow has memory: once the device reaches a final state, the flow is over, and a later answer can't reopen it. Your task is to model that.

The starter has five answers, in order. Track the current state, starting at `waiting`, and print one line per answer:

~~~text
poll 1: authorization_pending -> waiting
~~~

The rules are:

1. An answer moves the device to the state the table gives it, as in the sample.
2. The final states are `approved`, `denied`, and `expired`. Once the device is in a final state, every later answer leaves it there, and the line still shows the state.
3. `expired_token` is the answer that moves the device into `expired`. Include it in your table.

The expected output is five lines. Notice that the last answer, `success`, does not reopen the flow.

> **Aside: the terminal state is a rule, not a default.**
> A device that forgets its state and simply reads the next answer can approve a code that expired. The rule that a final state stays final protects the flow, so write it as an explicit check, not as an accident of the order of your table.

> **Common mistake.** Storing the state in the table, rather than in a variable that changes. A lookup table can tell you what an answer means, but it can't remember where the flow is.

> **.NET Framework 4.8.** This exercise uses only dictionaries and loops, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
