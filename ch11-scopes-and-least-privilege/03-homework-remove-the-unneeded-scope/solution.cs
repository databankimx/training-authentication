using System.Collections.Generic;
using System.Linq;

// The scopes the nightly job needs, and the scopes its token request asks for today. Both are fixed for the exercise.
var needed = new HashSet<string> { "reports.read", "orders.read" };
var requested = new[] { "reports.read", "reports.write", "orders.read", "admin.all" };

var kept = requested.Where(scope => needed.Contains(scope)).ToArray();
var removed = requested.Where(scope => !needed.Contains(scope)).ToArray();
Console.WriteLine($"requested: {string.Join(" ", kept)}");
Console.WriteLine($"removed: {string.Join(" ", removed)}");
