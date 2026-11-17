# Homework: A Basic Credential Header

The Basic scheme sends a user name and a password together. The two are joined with a colon, and the result is encoded as Base64, then sent in the header as `Basic` followed by a space and the encoded text.

Your task is to build that header from the fake credentials below, and print it. Use the user name and password exactly as written, because the expected output depends on every character.

- User name: `fake-user`
- Password: `fake-pass`
- Join them as `fake-user:fake-pass`, encode that text as Base64, and print `Basic ` followed by the encoded text.

The expected output is one line, and Check compares it with the expected result.

> **Aside: Base64 is an encoding, not a secret.**
> Base64 turns bytes into printable characters so they can travel in a header. It isn't encryption, and anyone who sees the header can decode the credential in a few seconds. That's why Basic credentials must only travel over HTTPS, and why a Basic credential is no safer than the password inside it.

> **Common mistake.** Encoding only the password, or leaving out the colon. The server decodes the header, splits on the first colon, and checks the pair. Any difference changes the encoded text, and the check will fail.

Use the starter for your language. The starter gives you the two values and a comment. Write the rest below the comment, then press Run to see your output, and Check to compare it with the expected result. The answer key is behind the Show solution button, after you've tried.

---
