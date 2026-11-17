# The token is a fake service-account token, and its signature is a placeholder that this exercise doesn't check.
import base64
import json
from datetime import datetime, timezone

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmMtMSIsImV4cCI6MTg5MzQ1NjAwMH0.signature-not-checked"

header, payload, signature = token.split(".")
claims = json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)))
expires = claims["exp"]
expires_utc = datetime.fromtimestamp(expires, tz=timezone.utc).strftime("%Y-%m-%d")

print(f"Subject: {claims['sub']}")
print(f"Expires at (Unix seconds): {expires}")
print(f"Expires at (UTC): {expires_utc}")
