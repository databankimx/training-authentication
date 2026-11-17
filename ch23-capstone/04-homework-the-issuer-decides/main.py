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

# Write your code below this comment. Refuse an unknown client or a wrong secret with "invalid_client". Otherwise grant
# the requested scopes the client is registered for, and deny the rest. Print one line per request.
