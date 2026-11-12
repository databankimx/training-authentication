from urllib.parse import quote

# The endpoint, client, and secret are fake, and nothing is sent.
token_endpoint = "https://login.example.invalid/oauth/token"
client_id = "example-client"
client_secret = "example-secret-not-real"
scopes = ["reports.read", "orders.read"]

parameters = [
    ("grant_type", "client_credentials"),
    ("client_id", client_id),
    ("client_secret", client_secret),
    ("scope", " ".join(scopes)),
]

print(f"POST {token_endpoint}")
print("&".join(
    "client_secret=****" if name == "client_secret" else f"{name}={quote(value, safe='')}"
    for name, value in parameters
))
