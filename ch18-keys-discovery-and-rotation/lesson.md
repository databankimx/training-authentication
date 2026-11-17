# 18. Keys, Discovery, and Rotation

Chapter 17 pinned the issuer and the key in code. A real API can't do that for long. An identity provider changes its signing keys on a schedule, and the API has to follow those changes without being reconfigured every time. This chapter covers how an API finds the keys an issuer publishes, how it picks the right one for each token, and how it keeps those keys up to date without asking for them on every request.

The samples read a fixed key set in place of the live discovery document, so they run offline, as the rest of the tutorial does.

The chapter has a reading step, a sample step, a second reading step, a code homework item, a written homework item, and a summary with three quizzes.

---
