// The API's own identifier, the time now, and three fixed cases. A real API reads the time from the clock.
const apiAudience = "https://api.example.invalid/reports";
const now = 1893455900;
const cases = [
  ["valid", 1893456000, "https://api.example.invalid/reports"],
  ["other API", 1893456000, "https://api.example.invalid/orders"],
  ["expired", 1893455000, "https://api.example.invalid/reports"],
];

function decide(exp, aud, expectedAud, now) {
  if (exp <= now) return "rejected: expired";
  if (aud !== expectedAud) return "rejected: wrong audience";
  return "accepted";
}

for (const [name, exp, aud] of cases) {
  console.log(`${name}: ${decide(exp, aud, apiAudience, now)}`);
}
