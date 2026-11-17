// The scopes the nightly job needs, and the scopes its token request asks for today. Both are fixed for the exercise.
const needed = new Set(["reports.read", "orders.read"]);
const requested = ["reports.read", "reports.write", "orders.read", "admin.all"];

const kept = requested.filter((scope) => needed.has(scope));
const removed = requested.filter((scope) => !needed.has(scope));
console.log(`requested: ${kept.join(" ")}`);
console.log(`removed: ${removed.join(" ")}`);
