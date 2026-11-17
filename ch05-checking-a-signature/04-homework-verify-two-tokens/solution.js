const crypto = require("node:crypto");

// The secret is a well-known example key, used only to show the check.
const secret = "your-256-bit-secret";
const genuine = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const changed = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfR.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function verify(token, secret) {
  const [header, payload, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return expected.length === signature.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

console.log(verify(genuine, secret) ? "valid" : "invalid");
console.log(verify(changed, secret) ? "valid" : "invalid");
