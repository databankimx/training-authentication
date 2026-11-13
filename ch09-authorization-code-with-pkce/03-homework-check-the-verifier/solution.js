const crypto = require("node:crypto");

// The stored challenge and the verifiers are fixed, so the output repeats.
const storedChallenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM";
const verifiers = ["dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", "", "not-the-right-verifier"];

function verify(verifier, stored) {
  if (!verifier) return "rejected";
  const challenge = crypto.createHash("sha256").update(verifier, "ascii").digest("base64url");
  const same =
    challenge.length === stored.length &&
    crypto.timingSafeEqual(Buffer.from(challenge), Buffer.from(stored));
  return same ? "accepted" : "rejected";
}

for (const verifier of verifiers) {
  console.log(verify(verifier, storedChallenge));
}
