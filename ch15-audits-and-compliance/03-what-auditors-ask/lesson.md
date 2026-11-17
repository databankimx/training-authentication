# 3. What Auditors Ask About Authentication

Auditors tend to ask the same handful of questions, whichever framework applies. Each question is a request for evidence. The table pairs each one with the kind of record that answers it. The records named are examples. Your organization's own records will have their own names.

| Question the auditor asks | Evidence that answers it |
|---|---|
| Who can sign in, and how is that decided? | A list of accounts with their roles, and the approval record for each grant |
| Are people's accounts removed when they leave? | Removal records with dates, matched against the leavers list from HR |
| Is access reviewed, and are the reviews acted on? | Signed review records, and the changes made because of them |
| Are privileged accounts protected more strongly? | Records of the strong authentication used for those accounts, and their list |
| Who owns each service account and script? | An inventory with a named owner and purpose for each one |
| How are secrets stored and rotated? | Rotation records with dates, and where each secret is kept |
| Can you see who signed in, and when it failed? | Sign-in and failure logs, kept for the period the framework requires |
| Are changes to access controlled? | Change tickets or approvals for each change to a grant or a rule |

## Reading the table

Each row is one question and the evidence that proves the answer. Notice that most of the evidence is a record made at the time, not a document written later. A review signed on the day it happened is worth more than a summary written before the audit.

> **Aside: the leavers list is the strongest check.**
> Comparing the people who left with the accounts that still exist is one of the simplest and most revealing tests. It shows, in one step, whether removals really happen.

> **Common mistake.** Answering "who owns this script?" with the name of the person who wrote it. Authors move on. The owner should be the person or team that is responsible now, and the inventory should be updated when that changes.

---
