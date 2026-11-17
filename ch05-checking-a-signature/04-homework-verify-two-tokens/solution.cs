// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

using System.Security.Cryptography;
using System.Text;

// The secret is a well-known example key, used only to show the check.
var secret = "your-256-bit-secret";
var genuine = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
var changed = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfR.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

static bool Verify(string token, string secret)
{
    var parts = token.Split('.');
    var signingInput = Encoding.ASCII.GetBytes($"{parts[0]}.{parts[1]}");
    var digest = HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), signingInput);
    var expected = Convert.ToBase64String(digest).TrimEnd('=').Replace('+', '-').Replace('/', '_');
    return CryptographicOperations.FixedTimeEquals(Encoding.ASCII.GetBytes(expected), Encoding.ASCII.GetBytes(parts[2]));
}

Console.WriteLine(Verify(genuine, secret) ? "valid" : "invalid");
Console.WriteLine(Verify(changed, secret) ? "valid" : "invalid");
