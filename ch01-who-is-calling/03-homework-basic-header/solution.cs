// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The user name and password are fake, and they exist only in this exercise.
var user = "fake-user";
var password = "fake-pass";
var pair = $"{user}:{password}";
var encoded = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(pair));
Console.WriteLine($"Basic {encoded}");
