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

// Write your code below this comment. For each request, apply the five rules in order, then print one line per request
// in the form "path, label: status".
