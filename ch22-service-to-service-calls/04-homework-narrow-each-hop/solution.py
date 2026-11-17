# The scopes the inbound token grants, and the downstream calls this service must make.
inbound_scopes = ["reports.read", "orders.read"]
calls = [
    ("reports", "https://api.example.invalid/reports", "reports.read"),
    ("orders", "https://api.example.invalid/orders", "orders.read"),
    ("invoices", "https://api.example.invalid/invoices", "invoices.read"),
]

for name, audience, scope in calls:
    if scope in inbound_scopes:
        print(f"{name}: token for {audience} with {scope}")
    else:
        print(f"{name}: refused, {scope} not granted")
