# 17. Validating Tokens in an API

Everything so far has been about the client side: a script proving who it is. This chapter turns the problem around. Your API receives a token from someone else, and it must decide, on every request, whether to act on it. Getting that decision right is the most important security job in an API that other people call.

The chapter has a reading step, a sample step, a second reading step, a code homework item, a written homework item, and a summary with three quizzes. The samples run a small API inside a test host, send it three fixed requests, print the results, and exit.

---
