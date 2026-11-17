# Four simulated requests. Each list is the status codes the server returns for each attempt, in order.
requests = [
    [429, 503, 200],
    [403],
    [429, 429, 429, 429],
    [401, 200],
]
max_retries = 3

# Write your code below this comment. For each request, go through its statuses in order and follow the rules. Print one
# line per request, for example "request 1: ok after 3 attempts".
