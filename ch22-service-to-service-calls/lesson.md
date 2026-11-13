# 22. Service-to-Service Calls

Most real systems are chains. A user calls a front end, the front end calls an orders service, and the orders service calls a reports service. Each hop needs its own answer to the question "who is calling, and what may they do?" This chapter covers how each service in the chain holds its own identity, how it asks for a token for the next hop, and why it must not pass along the token it received.

The chapter has a reading step, a sample step, a second reading step, a code homework item, a written homework item, and a summary with three quizzes.

---
