// The nonce stored in the session when the login started.
const storedNonce = "stored-nonce-1234";

// Three ID tokens, each with its claims. A token without a nonce claim has no entry for it.
const tokens = [
  ["matching nonce", { sub: "user-1", nonce: "stored-nonce-1234" }],
  ["wrong nonce", { sub: "user-1", nonce: "another-nonce-9999" }],
  ["no nonce", { sub: "user-1" }],
];

for (const [label, claims] of tokens) {
  let result;
  if (!("nonce" in claims)) result = "rejected, nonce missing";
  else if (claims.nonce !== storedNonce) result = "rejected, nonce mismatch";
  else result = "accepted";
  console.log(`${label}: ${result}`);
}
