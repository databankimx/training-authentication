// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
#:package System.IdentityModel.Tokens.Jwt@8.22.0

using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

// Fake secret, 64 bytes long so that HS512 can use it. For this exercise only.
const string Secret = "example-secret-not-real-for-this-homework-only-padded-to-64-bytes-ok";
const string Issuer = "https://issuer.example.invalid";
const string Audience = "https://api.example.invalid/reports";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

string MakeToken(string algorithm, string audience)
{
    var credentials = new SigningCredentials(key, algorithm);
    var token = new JwtSecurityToken(Issuer, audience, null, DateTime.UtcNow.AddMinutes(-15), DateTime.UtcNow.AddMinutes(10), credentials);
    return new JwtSecurityTokenHandler().WriteToken(token);
}

// Returns 200 when the token passes the checks, and 401 when it does not. The validator accepts HS256 and HS512,
// but this API uses HS256 only.
int Validate(string token)
{
    var parameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = Issuer,
        ValidateAudience = true,
        ValidAudience = Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromSeconds(60),
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
    };
    try
    {
        new JwtSecurityTokenHandler().ValidateToken(token, parameters, out _);
        return 200;
    }
    catch (SecurityTokenException)
    {
        return 401;
    }
}

// Write your code below this comment. Make the validator refuse any token whose algorithm is not HS256, then keep the
// three lines below.
Console.WriteLine($"valid HS256: {Validate(MakeToken(SecurityAlgorithms.HmacSha256, Audience))}");
Console.WriteLine($"HS512 token: {Validate(MakeToken(SecurityAlgorithms.HmacSha512, Audience))}");
Console.WriteLine($"wrong audience: {Validate(MakeToken(SecurityAlgorithms.HmacSha256, "https://api.example.invalid/orders"))}");
