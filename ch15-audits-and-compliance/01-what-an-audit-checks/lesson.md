# 1. What an Audit Checks

An audit compares what an organization does with what it has promised to do. The promise is written as criteria or requirements. The organization's controls are the things it does to meet them. The evidence is the record that a control really operated. The auditor tests a sample of that evidence, and writes up anything that doesn't match as a finding.

## The parts

- **Criteria.** The standard's requirements, such as "access to systems is restricted to authorized users".
- **Controls.** The organization's own processes that meet those requirements, such as a monthly access review or a rule that secrets are rotated every ninety days.
- **Evidence.** The records that show a control ran, such as the review's sign-off, the rotation log, or the list of accounts removed on a given day.
- **Findings.** The gaps the auditor reports, when a control is missing or its evidence doesn't match what the organization said it does.

The diagram shows how the parts connect.

~~~text
Criteria (the standard)
    |  met by
    v
Controls (what we do)
    |  leave
    v
Evidence (proof it ran)
    |  tested by
    v
Auditor --> findings, where the evidence is missing
~~~

## Point in time, or over a period

Some audits check a control at a single moment. Others check that the control worked for a stretch of time, such as six or twelve months. A check at one moment shows the design of the control. A check over time shows that the control actually operated, and that is usually the harder and more valuable test.

> **Aside: a control that exists is not a control that works.**
> A policy that says secrets are rotated is a statement of intent. The evidence shows whether rotations happened. Auditors look for the record, not the policy.

> **Common mistake.** Preparing the evidence after the audit starts, by writing up what the team believes happened. Evidence is a record made as the control ran. A record created afterwards is weaker, and auditors can tell.

---
