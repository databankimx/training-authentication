// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The secret is a well-known example key, used only to show the check.
var secret = "your-256-bit-secret";
var genuine = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
var changed = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfR.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Write your code below this comment. Write a function named verify that takes a token and the secret, and returns
// whether the signature is valid. Print the result for the genuine token, then for the changed token.
