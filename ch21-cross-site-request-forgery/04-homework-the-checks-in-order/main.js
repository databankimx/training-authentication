// The application's own origin, and the token each request must carry.
const appOrigin = "https://app.example.invalid";
const sessionToken = "example-csrf-token-not-real";

// Each request: a label, the origin (null for none), the token sent in the header (null for none), and the session's
// token in the cookie.
const requests = [
  ["same origin, matching token", "https://app.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"],
  ["same origin, no token", "https://app.example.invalid", null, "example-csrf-token-not-real"],
  ["other origin, matching token", "https://evil.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"],
  ["no origin, mismatched token", null, "guessed-token", "example-csrf-token-not-real"],
];

// Write your code below this comment. Apply the checks in order, refusing at the first one a request fails, then print
// one line per request in the form "label: status".
