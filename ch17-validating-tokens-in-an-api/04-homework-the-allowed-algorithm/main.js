import { SignJWT, jwtVerify } from "jose";

// Fake secret, 64 bytes long so that HS512 can use it. For this exercise only.
const SECRET = "example-secret-not-real-for-this-homework-only-padded-to-64-bytes-ok";
const ISSUER = "https://issuer.example.invalid";
const AUDIENCE = "https://api.example.invalid/reports";
const key = new TextEncoder().encode(SECRET);

async function makeToken(algorithm, audience) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: algorithm })
    .setIssuer(ISSUER)
    .setAudience(audience)
    .setNotBefore(now - 900)
    .setExpirationTime(now + 600)
    .sign(key);
}

// Returns 200 when the token passes the checks, and 401 when it does not. The validator accepts HS256 and HS512,
// but this API uses HS256 only.
async function validate(token) {
  try {
    await jwtVerify(token, key, {
      algorithms: ["HS256", "HS512"],
      issuer: ISSUER,
      audience: AUDIENCE,
      clockTolerance: "60s",
    });
    return 200;
  } catch {
    return 401;
  }
}

// Write your code below this comment. Make the validator accept only HS256, then keep the three lines below.
console.log(`valid HS256: ${await validate(await makeToken("HS256", AUDIENCE))}`);
console.log(`HS512 token: ${await validate(await makeToken("HS512", AUDIENCE))}`);
console.log(`wrong audience: ${await validate(await makeToken("HS256", "https://api.example.invalid/orders"))}`);
