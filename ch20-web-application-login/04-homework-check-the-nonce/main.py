# The nonce stored in the session when the login started.
stored_nonce = "stored-nonce-1234"

# Three ID tokens, each with its claims. A token without a nonce claim has no entry for it.
tokens = [
    ("matching nonce", {"sub": "user-1", "nonce": "stored-nonce-1234"}),
    ("wrong nonce", {"sub": "user-1", "nonce": "another-nonce-9999"}),
    ("no nonce", {"sub": "user-1"}),
]

# Write your code below this comment. For each token, refuse a missing nonce, then refuse a different one, then accept.
# Print one line per token in the form "label: result".
