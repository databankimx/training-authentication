# The scopes the inbound token grants, and the downstream calls this service must make.
inbound_scopes = ["reports.read", "orders.read"]
calls = [
    ("reports", "https://api.example.invalid/reports", "reports.read"),
    ("orders", "https://api.example.invalid/orders", "orders.read"),
    ("invoices", "https://api.example.invalid/invoices", "invoices.read"),
]

# Write your code below this comment. For each call, request a token for its audience with its scope if the inbound
# token grants that scope. Otherwise refuse the call. Print one line per call.
