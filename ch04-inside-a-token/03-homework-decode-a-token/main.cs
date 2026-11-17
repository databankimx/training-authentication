// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The token is a fake service-account token, and its signature is a placeholder that this exercise doesn't check.
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmMtMSIsImV4cCI6MTg5MzQ1NjAwMH0.signature-not-checked";

// Write your code below this comment. Decode the payload, which is the second part, then print three lines: the subject,
// the expiry in Unix seconds, and the expiry as a UTC date in the form 2030-01-01.
