# The application's own origin, and the token each request must carry.
app_origin = "https://app.example.invalid"
session_token = "example-csrf-token-not-real"

# Each request: a label, the origin (None for none), the token sent in the header (None for none), and the session's
# token in the cookie.
requests = [
    ("same origin, matching token", "https://app.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"),
    ("same origin, no token", "https://app.example.invalid", None, "example-csrf-token-not-real"),
    ("other origin, matching token", "https://evil.example.invalid", "example-csrf-token-not-real", "example-csrf-token-not-real"),
    ("no origin, mismatched token", None, "guessed-token", "example-csrf-token-not-real"),
]

for label, origin, header, cookie in requests:
    if origin is not None and origin != app_origin:
        status = 403
    elif header is None:
        status = 403
    elif header != cookie:
        status = 403
    else:
        status = 200
    print(f"{label}: {status}")
