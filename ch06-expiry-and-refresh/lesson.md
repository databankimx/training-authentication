# 6. Expiry and Refresh

Access tokens expire on purpose. A short life limits the damage when a token leaks, and it lets an identity provider revoke access without tracking every token it has ever issued. The cost falls on the script, which has to notice that its token is about to expire, and get a new one before a request fails.

This chapter covers why tokens expire, how a script decides a token is still usable, and how refresh tokens let it renew access without asking a person again.

The chapter has two reading steps, a sample step, a homework step with code, a written homework item, and a summary with three quizzes.

---
