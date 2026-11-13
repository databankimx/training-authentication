# The expiry, the request times, and the margins are fixed, so the output repeats.
expiry = 1893456000
request_times = [1893455700, 1893455800, 1893455900, 1893455950, 1893456000]
margins = [60, 120, 240]

def decide(expiry, now, margin):
    remaining = expiry - now
    if remaining <= 0:
        return "expired"
    if remaining <= margin:
        return "refresh first"
    return "usable"

for margin in margins:
    decisions = [decide(expiry, now, margin) for now in request_times]
    refresh = decisions.count("refresh first")
    expired = decisions.count("expired")
    print(f"Margin {margin}: refresh first {refresh}, expired {expired}")
