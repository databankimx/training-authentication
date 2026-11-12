# Homework: Remove the Unneeded Scopes

A nightly job reads reports and orders, and nothing else. Its token request was built years ago, and it asks for four scopes. Your task is to reduce the request to the scopes the job needs.

The starter has two lists: the scopes the job needs, and the scopes the request currently asks for. Keep the requested scopes that the job needs, in their original order. Collect the rest, in their original order, as the removed scopes.

Print two lines, with the scopes separated by a single space:

1. `requested: ` followed by the scopes kept.
2. `removed: ` followed by the scopes removed.

The expected output is two lines:

~~~text
requested: reports.read orders.read
removed: reports.write admin.all
~~~

> **Aside: why the order matters.**
> Keeping the original order makes the output easy to compare with the request in the job's history. A reviewer can see at a glance which scope was dropped, and where it sat.

> **Common mistake.** Removing scopes by name in a hard-coded list of your own, rather than by checking each requested scope against the scopes the job needs. The filter keeps the request honest if the request changes later.

> **.NET Framework 4.8.** This exercise uses `HashSet`, LINQ `Where`, and `string.Join`, which .NET Framework 4.8 provides. No callout is needed.

Use the starter for your language, write your code below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
