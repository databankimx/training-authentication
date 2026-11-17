// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The stored challenge and the verifiers are fixed, so the output repeats.
var storedChallenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM";
var verifiers = new[] { "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", "", "not-the-right-verifier" };

// Write your code below this comment. Write a function named verify that returns "accepted" or "rejected". Refuse an
// empty verifier first, then compute the S256 challenge and compare it with the stored one. Print the result for each.
