// The registered clients: each has a secret and the scopes it may be granted.
const registrations = {
  "reports-client": { secret: "example-client-secret-not-real", scopes: ["reports.read"] },
};

// Three token requests: a client identifier, the secret it presents, and the scopes it asks for.
const requests = [
  ["reports-client", "example-client-secret-not-real", "reports.read orders.write"],
  ["reports-client", "wrong-secret", "reports.read"],
  ["other-client", "example-client-secret-not-real", "reports.read"],
];

requests.forEach(([clientId, secret, requested], index) => {
  const label = `request ${index + 1}:`;
  const registration = Object.prototype.hasOwnProperty.call(registrations, clientId) ? registrations[clientId] : null;
  if (registration === null || registration.secret !== secret) {
    console.log(`${label} refused, invalid_client`);
    return;
  }
  const asked = requested.split(" ").filter(Boolean);
  const granted = asked.filter((scope) => registration.scopes.includes(scope)).join(" ");
  const denied = asked.filter((scope) => !registration.scopes.includes(scope)).join(" ");
  console.log(`${label} granted ${granted}, denied ${denied}`);
});
