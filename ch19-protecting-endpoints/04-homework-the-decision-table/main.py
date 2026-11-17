# The endpoint table: each path and the scope it requires. An empty requirement means the endpoint is public.
endpoints = {
    "/health": "",
    "/reports": "reports.read",
    "/orders": "orders.write",
}

# Each request: a path, and the scopes its token carries. None means no token was sent.
requests = [
    ("/health", None),
    ("/reports", ["reports.read"]),
    ("/orders", ["reports.read"]),
    ("/invoices", ["reports.read", "orders.write"]),
    ("/reports", None),
]

# Write your code below this comment. For each request, apply the five rules in order, then print one line per request
# in the form "path, label: status".
