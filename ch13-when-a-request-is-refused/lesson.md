# 13. When a Request Is Refused

A refused request is information. The status code says why the server turned the request away, and the right response depends on the reason. Some refusals call for a new token, some call for a pause, and some mean the script should stop and report. Treating them all the same is how scripts end up retrying a refusal that will never succeed, or giving up on one that would have worked a second later.

The chapter has a reading step, a sample step, a code homework item, a written homework item, and a summary with three quizzes.

---
