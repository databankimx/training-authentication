# The user name and password are fake, and they exist only in this exercise.
import base64

user = "fake-user"
password = "fake-pass"
pair = f"{user}:{password}"
encoded = base64.b64encode(pair.encode("utf-8")).decode("ascii")
print(f"Basic {encoded}")
