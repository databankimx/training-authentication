// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The token is a fake service-account token, and its signature is a placeholder that this exercise doesn't check.
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmMtMSIsImV4cCI6MTg5MzQ1NjAwMH0.signature-not-checked";

var payload = token.Split('.')[1];
var text = payload.Replace('-', '+').Replace('_', '/');
switch (text.Length % 4)
{
    case 2: text += "=="; break;
    case 3: text += "="; break;
}
var claims = System.Text.Json.JsonDocument.Parse(System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(text))).RootElement;

var subject = claims.GetProperty("sub").GetString();
var expires = claims.GetProperty("exp").GetInt64();
var expiresUtc = DateTimeOffset.FromUnixTimeSeconds(expires).UtcDateTime.ToString("yyyy-MM-dd");
Console.WriteLine($"Subject: {subject}");
Console.WriteLine($"Expires at (Unix seconds): {expires}");
Console.WriteLine($"Expires at (UTC): {expiresUtc}");
