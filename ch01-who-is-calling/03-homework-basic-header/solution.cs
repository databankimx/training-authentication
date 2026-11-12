// The user name and password are fake, and they exist only in this exercise.
var user = "fake-user";
var password = "fake-pass";
var pair = $"{user}:{password}";
var encoded = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(pair));
Console.WriteLine($"Basic {encoded}");
