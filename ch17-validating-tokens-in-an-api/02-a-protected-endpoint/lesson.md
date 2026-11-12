# 2. A Protected Endpoint

The sample builds a small API with one protected endpoint, `/reports`. It starts the API inside a test host, which runs the request pipeline in memory, so nothing listens on a network port. It then sends three fixed requests: a valid token, a token meant for another API, and an expired token. It prints the status each one receives, and exits.

The fake secret and identifiers are for this example only. A real API gets its keys from its identity provider, as Chapter 18 explains. Each request's status comes from the same validation settings, so the three results show each check at work.

~~~examples source
```csharp
#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
#:package Microsoft.AspNetCore.TestHost@10.*-*
#:package System.IdentityModel.Tokens.Jwt@8.22.0

using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.TestHost;
using Microsoft.IdentityModel.Tokens;

// Fake secret and identifiers, for this example only.
const string Secret = "example-secret-not-real-for-this-sample-only-32";
const string Issuer = "https://issuer.example.invalid";
const string Audience = "https://api.example.invalid/reports";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

var builder = WebApplication.CreateBuilder();
builder.WebHost.UseTestServer();
var app = builder.Build();

app.MapGet("/reports", (HttpContext context) =>
{
    var header = context.Request.Headers.Authorization.ToString();
    if (!header.StartsWith("Bearer ")) return Results.Unauthorized();

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
        new JwtSecurityTokenHandler().ValidateToken(header["Bearer ".Length..], parameters, out _);
        return Results.Text("report");
    }
    catch (SecurityTokenException)
    {
        return Results.Unauthorized();
    }
});

string MakeToken(string audience, DateTime expires)
{
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var token = new JwtSecurityToken(Issuer, audience, null, expires.AddMinutes(-15), expires, credentials);
    return new JwtSecurityTokenHandler().WriteToken(token);
}

await app.StartAsync();
var client = app.GetTestClient();

var cases = new (string Name, string Token)[]
{
    ("valid token", MakeToken(Audience, DateTime.UtcNow.AddMinutes(10))),
    ("wrong audience", MakeToken("https://api.example.invalid/orders", DateTime.UtcNow.AddMinutes(10))),
    ("expired token", MakeToken(Audience, DateTime.UtcNow.AddMinutes(-10))),
};

foreach (var (name, token) in cases)
{
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    var response = await client.GetAsync("/reports");
    Console.WriteLine($"{name}: {(int)response.StatusCode}");
}
```
```python
# Fake secret and identifiers, for this example only.
import time

import jwt
from fastapi import FastAPI, Header, HTTPException
from fastapi.testclient import TestClient

SECRET = "example-secret-not-real-for-this-sample-only-32"
ISSUER = "https://issuer.example.invalid"
AUDIENCE = "https://api.example.invalid/reports"

app = FastAPI()

@app.get("/reports")
def reports(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401)
    try:
        jwt.decode(
            authorization.removeprefix("Bearer "),
            SECRET,
            algorithms=["HS256"],
            audience=AUDIENCE,
            issuer=ISSUER,
            leeway=60,
        )
    except jwt.PyJWTError:
        raise HTTPException(status_code=401)
    return {"report": "ok"}

def make_token(audience, expires_in):
    now = int(time.time())
    claims = {"iss": ISSUER, "aud": audience, "nbf": now - 900, "exp": now + expires_in}
    return jwt.encode(claims, SECRET, algorithm="HS256")

client = TestClient(app)
cases = [
    ("valid token", make_token(AUDIENCE, 600)),
    ("wrong audience", make_token("https://api.example.invalid/orders", 600)),
    ("expired token", make_token(AUDIENCE, -600)),
]
for name, token in cases:
    response = client.get("/reports", headers={"Authorization": f"Bearer {token}"})
    print(f"{name}: {response.status_code}")
```
```javascript
import express from "express";
import { SignJWT, jwtVerify } from "jose";

// Fake secret and identifiers, for this example only.
const secret = new TextEncoder().encode("example-secret-not-real-for-this-sample-only-32");
const issuer = "https://issuer.example.invalid";
const audience = "https://api.example.invalid/reports";

const app = express();
app.get("/reports", async (req, res) => {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return res.status(401).end();
  try {
    await jwtVerify(header.slice("Bearer ".length), secret, {
      algorithms: ["HS256"],
      issuer,
      audience,
      clockTolerance: "60s",
    });
    res.json({ report: "ok" });
  } catch {
    res.status(401).end();
  }
});

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const { port } = server.address();

async function makeToken(aud, expiresAt) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setAudience(aud)
    .setNotBefore(expiresAt - 900)
    .setExpirationTime(expiresAt)
    .sign(secret);
}

const now = Math.floor(Date.now() / 1000);
const cases = [
  ["valid token", await makeToken(audience, now + 600)],
  ["wrong audience", await makeToken("https://api.example.invalid/orders", now + 600)],
  ["expired token", await makeToken(audience, now - 600)],
];
for (const [name, token] of cases) {
  const response = await fetch(`http://127.0.0.1:${port}/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`${name}: ${response.status}`);
}
server.close();
```
~~~

The output is the same in every language:

~~~text
valid token: 200
wrong audience: 401
expired token: 401
~~~

Change the valid token's lifetime in one tab to a negative number of minutes, and press Run. The first line changes to 401, the same status the expired token receives. Each case is refused by exactly one check, so the three lines show the three checks at work.

> **Note: Windows Firewall.** The JavaScript example starts Express on a local port and calls it. The first time it runs, Windows Firewall may show a prompt asking whether to allow Node.js to accept connections. The example only uses 127.0.0.1, so choose Allow for private networks. There's no need to allow public networks.

> **.NET Framework 4.8.** ASP.NET Core doesn't run on .NET Framework 4.8, so this C# sample can't be copied to a 4.8 project as it stands. The 4.8 alternative is ASP.NET Web API 2 with OWIN middleware, using the same validation parameters: the issuer, audience, lifetime, clock skew, and signing key are set the same way. The `System.IdentityModel.Tokens.Jwt` calls work on 4.8 unchanged.

> **Aside: the test host runs the real pipeline.**
> The requests pass through the same middleware and routing as a production request, and only the network is missing. A test that passes here is testing the real validation, not a copy of it.

> **Common mistake.** Testing only the valid case. A validator that accepts everything passes a test of the valid case alone. Keep one request for each refusal you expect the API to make.

---
