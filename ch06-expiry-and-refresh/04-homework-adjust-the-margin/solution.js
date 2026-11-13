// The expiry, the request times, and the margins are fixed, so the output repeats.
const expiry = 1893456000;
const requestTimes = [1893455700, 1893455800, 1893455900, 1893455950, 1893456000];
const margins = [60, 120, 240];

function decide(expiry, now, margin) {
  const remaining = expiry - now;
  if (remaining <= 0) return "expired";
  if (remaining <= margin) return "refresh first";
  return "usable";
}

for (const margin of margins) {
  const decisions = requestTimes.map((now) => decide(expiry, now, margin));
  const refresh = decisions.filter((decision) => decision === "refresh first").length;
  const expired = decisions.filter((decision) => decision === "expired").length;
  console.log(`Margin ${margin}: refresh first ${refresh}, expired ${expired}`);
}
