// The endpoint, client, and secret are fake, and nothing is sent.
const tokenEndpoint = "https://login.example.invalid/oauth/token";
const clientId = "example-client";
const clientSecret = "example-secret-not-real";
const scopes = ["reports.read", "orders.read"];

const parameters = [
  ["grant_type", "client_credentials"],
  ["client_id", clientId],
  ["client_secret", clientSecret],
  ["scope", scopes.join(" ")],
];

console.log(`POST ${tokenEndpoint}`);
console.log(
  parameters
    .map(([name, value]) => (name === "client_secret" ? "client_secret=****" : `${name}=${encodeURIComponent(value)}`))
    .join("&"),
);
