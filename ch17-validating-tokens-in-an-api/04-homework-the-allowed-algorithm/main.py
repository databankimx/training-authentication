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

# Returns 200 when the token passes the checks, and 401 when it does not. The validator accepts HS256 and HS512,
# but this API uses HS256 only.
def validate(token):
    try:
        jwt.decode(
            token,
            SECRET,
            algorithms=["HS256", "HS512"],
            audience=AUDIENCE,
            issuer=ISSUER,
            leeway=60,
        )
        return 200
    except jwt.PyJWTError:
        return 401

# Write your code below this comment. Make the validator accept only HS256, then keep the three lines below.
print(f"valid HS256: {validate(make_token('HS256', AUDIENCE))}")
print(f"HS512 token: {validate(make_token('HS512', AUDIENCE))}")
print(f"wrong audience: {validate(make_token('HS256', 'https://api.example.invalid/orders'))}")
