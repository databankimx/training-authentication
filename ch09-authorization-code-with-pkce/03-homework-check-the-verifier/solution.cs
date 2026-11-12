using System.Security.Cryptography;
using System.Text;

// The stored challenge and the verifiers are fixed, so the output repeats.
var storedChallenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM";
var verifiers = new[] { "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", "", "not-the-right-verifier" };

static string Verify(string verifier, string stored)
{
    if (string.IsNullOrEmpty(verifier)) return "rejected";
    var digest = SHA256.HashData(Encoding.ASCII.GetBytes(verifier));
    var challenge = Convert.ToBase64String(digest).TrimEnd('=').Replace('+', '-').Replace('/', '_');
    var same = CryptographicOperations.FixedTimeEquals(
        Encoding.ASCII.GetBytes(challenge), Encoding.ASCII.GetBytes(stored));
    return same ? "accepted" : "rejected";
}

foreach (var verifier in verifiers)
{
    Console.WriteLine(Verify(verifier, storedChallenge));
}
