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

for path, scopes in requests:
    label = "no token" if scopes is None else " ".join(scopes)
    if path not in endpoints:
        status = 404
    elif endpoints[path] == "":
        status = 200
    elif scopes is None:
        status = 401
    elif endpoints[path] in scopes:
        status = 200
    else:
        status = 403
    print(f"{path}, {label}: {status}")
