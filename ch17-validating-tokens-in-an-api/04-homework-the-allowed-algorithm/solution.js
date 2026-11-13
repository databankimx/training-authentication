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

// Returns 200 when the token passes the checks, and 401 when it does not.
async function validate(token) {
  try {
    await jwtVerify(token, key, {
      // The API allows HS256 only. A token naming any other algorithm is refused.
      algorithms: ["HS256"],
      issuer: ISSUER,
      audience: AUDIENCE,
      clockTolerance: "60s",
    });
    return 200;
  } catch {
    return 401;
  }
}

console.log(`valid HS256: ${await validate(await makeToken("HS256", AUDIENCE))}`);
console.log(`HS512 token: ${await validate(await makeToken("HS512", AUDIENCE))}`);
console.log(`wrong audience: ${await validate(await makeToken("HS256", "https://api.example.invalid/orders"))}`);
