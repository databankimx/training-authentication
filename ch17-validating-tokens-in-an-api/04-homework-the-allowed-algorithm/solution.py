import time

import jwt

# Fake secret, 64 bytes long so that HS512 can use it. For this exercise only.
SECRET = "example-secret-not-real-for-this-homework-only-padded-to-64-bytes-ok"
ISSUER = "https://issuer.example.invalid"
AUDIENCE = "https://api.example.invalid/reports"

def make_token(algorithm, audience):
    now = int(time.time())
    claims = {"iss": ISSUER, "aud": audience, "nbf": now - 900, "exp": now + 600}
    return jwt.encode(claims, SECRET, algorithm=algorithm)

# Returns 200 when the token passes the checks, and 401 when it does not.
def validate(token):
    try:
        jwt.decode(
            token,
            SECRET,
            # The API allows HS256 only. A token naming any other algorithm is refused.
            algorithms=["HS256"],
            audience=AUDIENCE,
            issuer=ISSUER,
            leeway=60,
        )
        return 200
    except jwt.PyJWTError:
        return 401

print(f"valid HS256: {validate(make_token('HS256', AUDIENCE))}")
print(f"HS512 token: {validate(make_token('HS512', AUDIENCE))}")
print(f"wrong audience: {validate(make_token('HS256', 'https://api.example.invalid/orders'))}")
