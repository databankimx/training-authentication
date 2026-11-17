import base64
import hashlib
import hmac

# The stored challenge and the verifiers are fixed, so the output repeats.
stored_challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
verifiers = ["dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", "", "not-the-right-verifier"]

def verify(verifier, stored):
    if not verifier:
        return "rejected"
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return "accepted" if hmac.compare_digest(challenge, stored) else "rejected"

for verifier in verifiers:
    print(verify(verifier, stored_challenge))
