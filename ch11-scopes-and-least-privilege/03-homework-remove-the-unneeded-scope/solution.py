# The scopes the nightly job needs, and the scopes its token request asks for today. Both are fixed for the exercise.
needed = {"reports.read", "orders.read"}
requested = ["reports.read", "reports.write", "orders.read", "admin.all"]

kept = [scope for scope in requested if scope in needed]
removed = [scope for scope in requested if scope not in needed]
print(f"requested: {' '.join(kept)}")
print(f"removed: {' '.join(removed)}")
