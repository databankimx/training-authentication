// The scopes the inbound token grants, and the downstream calls this service must make.
const inboundScopes = ["reports.read", "orders.read"];
const calls = [
  ["reports", "https://api.example.invalid/reports", "reports.read"],
  ["orders", "https://api.example.invalid/orders", "orders.read"],
  ["invoices", "https://api.example.invalid/invoices", "invoices.read"],
];

for (const [name, audience, scope] of calls) {
  if (inboundScopes.includes(scope)) {
    console.log(`${name}: token for ${audience} with ${scope}`);
  } else {
    console.log(`${name}: refused, ${scope} not granted`);
  }
}
