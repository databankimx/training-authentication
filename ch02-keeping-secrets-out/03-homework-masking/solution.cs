// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The samples are fake, and they exist only in this exercise.
string Mask(string value) => value.Length <= 4 ? "****" : "****" + value[^4..];

var samples = new[] { "example-token-not-real", "short", "abc" };
foreach (var sample in samples)
{
    Console.WriteLine(Mask(sample));
}
