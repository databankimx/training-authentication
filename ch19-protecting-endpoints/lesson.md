# 19. Protecting Endpoints

Chapter 17 showed how an API checks a token. This chapter applies that check to each endpoint the API offers. Every endpoint needs a decision: who may call it, and with what permission. The safe way to make that decision is to deny by default, and to allow only what has been named on purpose.

The chapter has a reading step, a sample step, a second reading step, a code homework item, a written homework item, and a summary with three quizzes. The samples protect three endpoints, send four fixed requests, print the statuses, and exit.

---
