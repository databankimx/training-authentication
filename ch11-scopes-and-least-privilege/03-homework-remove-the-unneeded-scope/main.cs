// The scopes the nightly job needs, and the scopes its token request asks for today. Both are fixed for the exercise.
var needed = new HashSet<string> { "reports.read", "orders.read" };
var requested = new[] { "reports.read", "reports.write", "orders.read", "admin.all" };

// Write your code below this comment. Keep the requested scopes the job needs, and collect the rest. Keep the original order.
// Print "requested: " and the kept scopes, then "removed: " and the removed scopes, each separated by a single space.
