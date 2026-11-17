# 14. Logging Without Leaking

Logs are how you find out what your script did, and when something went wrong, they're often the only record. They're also one of the most common places a secret ends up. A log is copied, shipped, searched, and kept for a long time, and the people who read it often have far less access than the systems that wrote it. This chapter covers what a log line should record, the usual ways secrets slip into logs, and how to remove a secret from a line before it is written.

The chapter has a reading step, a sample step, a code homework item, a written homework item, and a summary with three quizzes.

---
