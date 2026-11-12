# Homework: Write a Finding

During an authorized test of a reporting API, the tester observed that the sign-in endpoint accepted an unlimited number of failed attempts for one account, with no delay, lockout, or change in response. The test was within its agreed scope, and the owner's contact has been told.

Write the finding as it would appear in the report. Use these headings, and keep each one to a short paragraph or a single line:

- **Title.** A short name for the issue.
- **Severity.** Your rating, with a sentence on how it was chosen.
- **Affected component.** The system and endpoint, named at the level of the report.
- **Description.** What the control is missing, in terms of design.
- **Impact.** What could happen if the gap were used.
- **Recommendation.** The defence the owner should build in, and how to confirm it works.

The one rule is that the finding must not include steps to reproduce the flaw. It describes the gap and the fix, not the method.

~~~spoiler
**Title.** No limit on failed sign-in attempts for the reporting API.

**Severity.** Medium, raised to high if the sign-in endpoint can be reached from outside the organization. The rating reflects how easily the gap could be used, and the account it protects.

**Affected component.** The sign-in endpoint of the reporting API, for user accounts.

**Description.** The endpoint does not limit or delay failed sign-in attempts for an account. A control that counts failures per account and per client, and delays or locks the account after a set number, is absent. The absence is a design gap, not a misconfiguration of one setting.

**Impact.** A password that is weak or reused could be found by repeated guessing without any signal to the owner. An account could be taken over, and the actions it performs would be recorded as its own.

**Recommendation.** Add rate limits per account and per client to the sign-in endpoint, with a delay or lockout after a set number of failures, and an alert when the limit is reached. Confirm the control by testing, in an environment the owner controls, that repeated failures are limited and that the alert fires. Record the result as evidence for the owner's records.
~~~

---
