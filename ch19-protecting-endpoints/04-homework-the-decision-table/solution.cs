#:property Nullable=disable
#:property PublishAot=false

// The endpoint table: each path and the scope it requires. An empty requirement means the endpoint is public.
var endpoints = new Dictionary<string, string>
{
    ["/health"] = "",
    ["/reports"] = "reports.read",
    ["/orders"] = "orders.write",
};

// Each request: a path, and the scopes its token carries. A null list means no token was sent.
var requests = new (string Path, string[] Scopes)[]
{
    ("/health", null),
    ("/reports", new[] { "reports.read" }),
    ("/orders", new[] { "reports.read" }),
    ("/invoices", new[] { "reports.read", "orders.write" }),
    ("/reports", null),
};

foreach (var (path, scopes) in requests)
{
    string label = scopes == null ? "no token" : string.Join(" ", scopes);
    int status;
    if (!endpoints.ContainsKey(path)) status = 404;
    else if (endpoints[path] == "") status = 200;
    else if (scopes == null) status = 401;
    else if (scopes.Contains(endpoints[path])) status = 200;
    else status = 403;
    Console.WriteLine($"{path}, {label}: {status}");
}
