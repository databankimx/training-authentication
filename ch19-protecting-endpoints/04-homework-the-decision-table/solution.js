// The endpoint table: each path and the scope it requires. An empty requirement means the endpoint is public.
const endpoints = {
  "/health": "",
  "/reports": "reports.read",
  "/orders": "orders.write",
};

// Each request: a path, and the scopes its token carries. null means no token was sent.
const requests = [
  ["/health", null],
  ["/reports", ["reports.read"]],
  ["/orders", ["reports.read"]],
  ["/invoices", ["reports.read", "orders.write"]],
  ["/reports", null],
];

for (const [path, scopes] of requests) {
  const label = scopes === null ? "no token" : scopes.join(" ");
  let status;
  if (!(path in endpoints)) status = 404;
  else if (endpoints[path] === "") status = 200;
  else if (scopes === null) status = 401;
  else if (scopes.includes(endpoints[path])) status = 200;
  else status = 403;
  console.log(`${path}, ${label}: ${status}`);
}
