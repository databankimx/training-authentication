// The URL and key are fake, and they exist only in this exercise.
var url = "https://api.example.invalid/v1/orders";
var key = "fake-key-1234";
var headers = new Dictionary<string, string> { ["X-Api-Key"] = key };

Console.WriteLine($"GET {url}");
foreach (var (name, value) in headers)
{
    Console.WriteLine($"{name}: {value}");
}
Console.WriteLine(url.Contains(key) ? "Key in URL: yes" : "Key in URL: no");
