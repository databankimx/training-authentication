// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The key set the issuer publishes now, after a rotation. Each fetch returns this set, and every fetch is counted.
var published = new HashSet<string> { "rsa-2026-01", "rsa-2026-02" };
var fetches = 0;
HashSet<string> Fetch()
{
    fetches++;
    return new HashSet<string>(published);
}

// The cache starts with one key, which is all the API had before the rotation.
var cache = new HashSet<string> { "rsa-2026-01" };
var requests = new[] { "rsa-2026-01", "rsa-2026-02", "rsa-2026-03", "rsa-2026-02" };

for (var i = 0; i < requests.Length; i++)
{
    var kid = requests[i];
    string result;
    if (cache.Contains(kid))
    {
        result = $"{kid} from cache";
    }
    else
    {
        cache = Fetch();
        result = cache.Contains(kid) ? $"{kid} after refetch" : $"refused, {kid} not published";
    }
    Console.WriteLine($"request {i + 1}: {result}");
}
Console.WriteLine($"fetches: {fetches}");
