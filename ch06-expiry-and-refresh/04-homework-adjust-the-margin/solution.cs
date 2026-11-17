// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The expiry, the request times, and the margins are fixed, so the output repeats.
var expiry = 1893456000L;
var requestTimes = new long[] { 1893455700L, 1893455800L, 1893455900L, 1893455950L, 1893456000L };
var margins = new long[] { 60L, 120L, 240L };

static string Decide(long expiry, long now, long margin)
{
    var remaining = expiry - now;
    if (remaining <= 0) return "expired";
    if (remaining <= margin) return "refresh first";
    return "usable";
}

foreach (var margin in margins)
{
    var refresh = 0;
    var expired = 0;
    foreach (var now in requestTimes)
    {
        var decision = Decide(expiry, now, margin);
        if (decision == "refresh first") refresh++;
        if (decision == "expired") expired++;
    }
    Console.WriteLine($"Margin {margin}: refresh first {refresh}, expired {expired}");
}
