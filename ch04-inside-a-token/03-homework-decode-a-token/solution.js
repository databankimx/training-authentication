// The token is a fake service-account token, and its signature is a placeholder that this exercise doesn't check.
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmMtMSIsImV4cCI6MTg5MzQ1NjAwMH0.signature-not-checked";

const [header, payload, signature] = token.split(".");
const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
const expiresUtc = new Date(claims.exp * 1000).toISOString().slice(0, 10);

console.log(`Subject: ${claims.sub}`);
console.log(`Expires at (Unix seconds): ${claims.exp}`);
console.log(`Expires at (UTC): ${expiresUtc}`);
