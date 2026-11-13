# The nonce stored in the session when the login started.
stored_nonce = "stored-nonce-1234"

# Three ID tokens, each with its claims. A token without a nonce claim has no entry for it.
tokens = [
    ("matching nonce", {"sub": "user-1", "nonce": "stored-nonce-1234"}),
    ("wrong nonce", {"sub": "user-1", "nonce": "another-nonce-9999"}),
    ("no nonce", {"sub": "user-1"}),
]

for label, claims in tokens:
    if "nonce" not in claims:
        result = "rejected, nonce missing"
    elif claims["nonce"] != stored_nonce:
        result = "rejected, nonce mismatch"
    else:
        result = "accepted"
    print(f"{label}: {result}")
