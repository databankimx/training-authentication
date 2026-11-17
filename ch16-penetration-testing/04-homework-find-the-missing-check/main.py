# The API's own identifier, the time now, and three fixed cases. A real API reads the time from the clock.
api_audience = "https://api.example.invalid/reports"
now = 1893455900
cases = [
    ("valid", 1893456000, "https://api.example.invalid/reports"),
    ("other API", 1893456000, "https://api.example.invalid/orders"),
    ("expired", 1893455000, "https://api.example.invalid/reports"),
]

# Write your code below this comment. The validator checks expiry, but the check for audience is missing. Add it after
# the expiry check, so a token issued for another API is refused. Then the loop prints each case.
def decide(exp, aud, expected_aud, now):
    if exp <= now:
        return "rejected: expired"
    return "accepted"

for name, exp, aud in cases:
    print(f"{name}: {decide(exp, aud, api_audience, now)}")
