# The URL and key are fake, and they exist only in this exercise.
url = "https://api.example.invalid/v1/orders"
key = "fake-key-1234"
headers = {"X-Api-Key": key}

print(f"GET {url}")
for name, value in headers.items():
    print(f"{name}: {value}")
print("Key in URL: yes" if key in url else "Key in URL: no")
