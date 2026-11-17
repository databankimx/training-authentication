# Summary: Introduction

This chapter covered who is calling, what a credential is, and how the tutorial works. You've seen the difference between identity and permission, what to do when a credential leaks, and how the same example runs in three languages.

## What you learned

- Identity answers "who are you?", and permission answers "what may you do?" A refused request is an identity problem or a permission problem, and the fix differs.
- A credential is anything that lets a system accept your claim of identity, and anyone who holds it can usually act as you.
- A leaked credential is replaced, not just deleted, because deleting doesn't remove it from history.
- Every concept appears in C#, Python, and JavaScript, and the examples are complete and runnable.
- Homework is where you write code yourself, and the answer keys are the only hidden code.

## Quizzes

Three questions, one for each big idea in the chapter. Pick an answer, and read the explanation whichever way it goes.

```quiz
A script proves its identity to an API, and the API still refuses its request. What is the most likely explanation?
○ The identity proof is missing, so the API can't tell who is calling.
→ The proof was accepted. The problem is somewhere else.
◉ The script's identity is known, but it isn't allowed to do what it asked.
→ Right. Identity answers who you are, and permission decides what you may do.
○ The script is written in the wrong language for the API.
→ Language has nothing to do with it. The API knows who is calling, and that caller lacks permission.
```

```quiz
Which of these is a credential?
○ The name of the script that calls the API.
→ A name identifies nothing on its own. It isn't a credential.
○ The output of a successful run, printed to the screen.
→ Output is not a secret in itself, but it can be a leak if it includes one.
◉ An API key that lets a script act as its owner.
→ Right. Anyone who holds it can usually act as the owner, so it's a credential.
```

```quiz
What should you do if you find a real password pasted into a lesson or a script?
◉ Treat it as leaked, and replace it.
→ Right. Once a secret has been exposed, it has to be replaced, not just hidden.
○ Delete the file, and nothing else is needed.
→ Deleting the file doesn't remove it from history, so the password still needs replacing.
○ Leave it, because it's only a test.
→ A real password is never only a test. Treat it as leaked.
```

---
