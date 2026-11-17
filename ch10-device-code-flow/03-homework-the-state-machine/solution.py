# A fixed sequence of answers from the token endpoint, so the output repeats.
responses = ["authorization_pending", "slow_down", "authorization_pending", "expired_token", "success"]

# Each answer maps to the state it moves the device into.
states = {
    "authorization_pending": "waiting",
    "slow_down": "waiting",
    "success": "approved",
    "access_denied": "denied",
    "expired_token": "expired",
}
final_states = {"approved", "denied", "expired"}

current = "waiting"
for number, response in enumerate(responses, start=1):
    if current not in final_states:
        current = states[response]
    print(f"poll {number}: {response} -> {current}")
