# Homework: An Unowned Account

During an access review, you find a service account that still has access to a reporting system. Its inventory entry names an owner who left the organization two years ago. Nobody on the current team recognizes the account.

Write a short answer that describes how the review found this account, what you would do with it, and how you would prevent the same gap next time. Write in your own words, and keep it to a short paragraph for each part.

~~~spoiler
The review finds the account by comparing the inventory with the accounts that actually exist and have access. An inventory entry that names a leaver, or a last-used date far in the past, is a flag. Matching the account against the leavers list shows the owner has gone, and the review records it as a finding.

The response is to decide, with the team that owns the reporting system, whether the account is still needed. If it isn't, disable it first, so the access stops, and watch for anything that fails. Remove it once nothing depends on it. If it is needed, give it a current owner, record its purpose, and review its access, because an account without a current owner is a risk even when it is in use.

To prevent the gap, make ownership part of creating a service account, so no account can exist without a named owner. Attach the inventory to the offboarding process, so a leaver's owned accounts are reassigned or disabled on their last day. Review the inventory on a schedule, and treat any entry whose owner is unknown as an open finding until someone accepts it.
~~~

---
