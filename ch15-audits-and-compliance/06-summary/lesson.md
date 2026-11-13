# Summary: Audits and Compliance

This chapter covered what an audit checks, the frameworks you are most likely to meet, and the evidence auditors ask for about authentication. Auditors look for records made as controls ran, and each record needs someone responsible for keeping it.

## What you learned

- An audit compares criteria, met by controls, against evidence that the controls operated. Gaps become findings.
- A Type I report checks design at a moment, and a Type II report checks operation over a period.
- SOC 2 is organized around five Trust Services Criteria, and security is always included. ISO/IEC 27001 is a certifiable management standard with controls in its Annex A.
- Other frameworks, such as PCI DSS and HIPAA, add their own requirements for authentication and access.
- Auditors ask the same questions about who can sign in, removal on leaving, access reviews, privileged accounts, ownership, secret rotation, logging, and change control.
- Evidence is a record made at the time. A record created afterwards is weaker.
- An unowned account is a finding until someone accepts ownership, and ownership should be part of creating an account.
- The team's compliance function decides which frameworks apply, and this chapter is not compliance advice.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
An auditor asks for evidence that access was reviewed. Which record is strongest?
○ A summary written the week before the audit, describing the reviews.
→ A summary written for the audit is weaker than a record made when the review happened.
◉ A signed review record, dated when the review took place, with the changes it led to.
→ Right. A contemporaneous record, with its outcome, is the evidence auditors look for.
○ A policy stating that access is reviewed every quarter.
→ A policy is a statement of intent. It shows what was planned, not what happened.
```

```quiz
What is the difference between a SOC 2 Type I and a Type II report?
○ Type I covers security only, and Type II covers all five criteria.
→ Both can cover any of the criteria. The difference is the time the report covers.
○ Type I is for small companies, and Type II is for large companies.
→ The type is not a matter of company size. It describes the period the report covers.
◉ Type I describes whether controls were designed correctly at a point in time, and Type II tests that they operated over a period.
→ Right. A period-based report shows operation over time, which is usually the harder and more valuable test.
```

```quiz
An access review finds a service account whose owner left two years ago. What is the right first step?
◉ Find out whether the account is still needed, and disable it before removing it.
→ Right. Disabling first shows whether anything depends on it, and it stops the access.
○ Delete it immediately, because an account with no owner should not exist.
→ Deleting it may break something that depends on it. Confirm first, then disable, then remove.
○ Leave it, because it has been there for two years without an incident.
→ Age and missing ownership are findings in their own right. A quiet account can still be a risk.
```

---
