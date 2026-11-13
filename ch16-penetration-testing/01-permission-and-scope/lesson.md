# 1. Permission and Scope

Testing a system you don't own, or one you own but have no permission to test, is an offence in many places, however good the intent. The boundary is not the technique. It's the written authorization from the owner of the system, and the scope that authorization sets.

## Written permission

Before testing begins, the owner of the system gives written permission. The permission names the systems to be tested, the methods that are allowed, the dates and hours of the test, and the people to contact if something goes wrong. A verbal agreement is not enough, because nobody can later show what was agreed.

The permission should also say what is not allowed. Denial-of-service testing, social engineering of staff, and access to real customer data are common examples. A tester who finds something outside the agreed scope stops, records what they saw, and reports it to the owner rather than exploring further.

## Scope

The scope is the list of systems, addresses, accounts, and actions the permission covers. Anything outside it is out of bounds. A tester who finds a link to another system in the scope does not test that system without its own permission, even if the two are closely related.

## Stopping and reporting

Testers have rules for stopping. They stop when they reach a boundary in the scope, when a test causes a service problem, or when they find evidence of a real attack that is not theirs. They report to the contact named in the permission, quickly, and they follow the owner's process for disclosure. A finding is shared with people who need it, and nobody else.

> **Aside: the test that finds a real customer's data.**
> A tester who reaches real personal data should stop, avoid copying or keeping it, and report straight away. Finding the data is evidence of the problem. Taking it is a new harm, and it is outside any reasonable scope.

> **Common mistake.** Treating the permission as a formality, and testing a system that is shared with another organization. The owner can give permission only for what it owns. Confirm who owns each system in scope before you begin.

---
