# The registered clients: each has a secret and the scopes it may be granted.
registrations = {
    "reports-client": ("example-client-secret-not-real", ["reports.read"]),
}

# Three token requests: a client identifier, the secret it presents, and the scopes it asks for.
requests = [
    ("reports-client", "example-client-secret-not-real", "reports.read orders.write"),
    ("reports-client", "wrong-secret", "reports.read"),
    ("other-client", "example-client-secret-not-real", "reports.read"),
]

for number, (client_id, secret, requested) in enumerate(requests, start=1):
    label = f"request {number}:"
    registration = registrations.get(client_id)
    if registration is None or registration[0] != secret:
        print(f"{label} refused, invalid_client")
        continue
    allowed = registration[1]
    asked = requested.split()
    granted = " ".join(scope for scope in asked if scope in allowed)
    denied = " ".join(scope for scope in asked if scope not in allowed)
    print(f"{label} granted {granted}, denied {denied}")
