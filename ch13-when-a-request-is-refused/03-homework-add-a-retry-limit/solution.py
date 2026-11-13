# Four simulated requests. Each list is the status codes the server returns for each attempt, in order.
requests = [
    [429, 503, 200],
    [403],
    [429, 429, 429, 429],
    [401, 200],
]
max_retries = 3

for number, statuses in enumerate(requests, start=1):
    attempts = 0
    retries = 0
    refreshed = False
    result = None

    for status in statuses:
        attempts += 1
        if status == 200:
            result = f"ok after {attempts} attempts"
            break
        if status == 403:
            result = "stopped: 403 (no retry)"
            break
        if status == 401:
            if refreshed:
                result = f"stopped: 401 after refresh, after {attempts} attempts"
                break
            refreshed = True
            continue
        if status in (429, 503) and retries < max_retries:
            retries += 1
            continue
        result = f"gave up after {attempts} attempts"
        break

    print(f"request {number}: {result}")
