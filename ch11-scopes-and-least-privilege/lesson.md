# 11. Scopes and Least Privilege

A scope is a name for one permission that a token grants, such as reading reports or writing orders. When a script asks for a token, it asks for scopes, and the identity provider decides which ones to grant. Every scope a token carries is access the script could use, and access it doesn't need is only a risk waiting for a leak.

This chapter covers the principle of least privilege, how to choose the scopes a job actually needs, and how a client can check its requests before it sends them.

The chapter has a reading step, a sample step, a code homework item, a written homework item, and a summary with three quizzes.

---
