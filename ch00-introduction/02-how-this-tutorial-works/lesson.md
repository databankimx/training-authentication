# 2. How This Tutorial Works

Every concept in this tutorial appears in C#, Python, and JavaScript. You don't need all three, but each lesson shows the same idea in each one, so you can read the others. The examples are complete, so you can edit them and press Run.

## Three languages, one idea

Here's the smallest possible example in each language. Press Run in each tab, and check that all three print the same line.

~~~examples
```csharp
Console.WriteLine("Hello, Authentication for Automation.");
```
```python
print("Hello, Authentication for Automation.")
```
```javascript
console.log("Hello, Authentication for Automation.");
```
~~~

The output is the same in every language:

~~~text
Hello, Authentication for Automation.
~~~

Try an edit as well. Change the text in one tab, press Run, and see what changes. Press Reset to put the original back. Your edits last only while you're on this lesson.

> **Aside: why the same line in three languages?**
> Authentication is not a language feature. A token is a string, a signature is a calculation, and a request is a set of headers. Seeing the same idea in three syntaxes makes it easier to spot the idea itself, and easier to move between the teams that use each language.

## Libraries

Some samples use libraries, and each lesson says so where a library first appears. The lesson explains what the library does, and why a hand-written version would be the wrong choice. Writing your own token verification or your own signature check is almost always the wrong choice, and the lessons say why when it matters.

## Homework

Most chapters end with homework, usually two or more items. Homework is where you write code yourself. Answer keys sit behind a spoiler, and they're the only code in the tutorial that is hidden. Everything else is there for you to run, change, and break.

> **Common mistake.** Reading the answer key before you've tried the homework. Try it first, even if your answer is wrong. A wrong answer you've worked through teaches you more than a right answer you've copied.

## Real systems

The lessons use fake tokens, fake keys, and a simulated identity provider on your own computer. You won't need an account with any provider to finish the tutorial. Chapter 12 looks at the common identity platforms, and the optional section in the capstone shows how to use a real one, with an account you control.

---
