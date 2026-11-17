import base64
import hashlib
import hmac

# The secret is a well-known example key, used only to show the check.
secret = "your-256-bit-secret"
genuine = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
changed = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfR.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

def verify(token, secret):
    header, payload, signature = token.split(".")
    digest = hmac.new(secret.encode("utf-8"), f"{header}.{payload}".encode("ascii"), hashlib.sha256).digest()
    expected = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return hmac.compare_digest(expected, signature)

print("valid" if verify(genuine, secret) else "invalid")
print("valid" if verify(changed, secret) else "invalid")
