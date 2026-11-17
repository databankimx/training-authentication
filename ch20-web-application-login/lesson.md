# 20. Web Application Login

A web application signs people in through a browser. The person is redirected to the identity provider, signs in there, and is sent back to the application with a code. The application exchanges that code for tokens, and then starts its own session for the person. Three things make this safe: the application keeps its client secret on the server, it checks that the response belongs to the login it started, and it protects the session cookie that results.

The chapter has a reading step, a sample step, a second reading step, a code homework item, a written homework item, and a summary with three quizzes. The sample checks the callback rules against fixed requests, so no browser is needed.

---
