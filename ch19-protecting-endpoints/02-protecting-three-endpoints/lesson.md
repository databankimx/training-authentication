# 2. Protecting Three Endpoints

The sample is an API with three endpoints. `/health` is public. `/reports` requires the `reports.read` scope, and `/orders` requires `orders.write`. The sample sends four fixed requests inside a test host and prints the status each one receives.

The tokens are signed with the fake secret from Chapter 17, and each request's status comes from the same two checks: the token must be valid, and it must carry the scope the endpoint requires. The output shows each rule at work.

~~~examples source
```csharp
#:sdk Microsoft.NET.Sdk.Web
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property PublishAot=false
#:property Nullable=disable
#:package Microsoft.AspNetCore.TestHost@10.*-*
#:package System.IdentityModel.Tokens.Jwt@8.22.0

using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.TestHost;
using Microsoft.IdentityModel.Tokens;

// Fake secret and identifiers, for this example only.
const string Secret = "example-secret-not-real-for-this-sample-only-32";
const string Issuer = "https://issuer.example.invalid";
const string Audience = "https://api.example.invalid";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

var builder = WebApplication.CreateBuilder();
builder.WebHost.UseTestServer();
var app = builder.Build();

// The token must be valid, and it must carry the required scope. The scope claim is a list separated by spaces.
IResult Guard(HttpContext context, string requiredScope)
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
        new JwtSecurityTokenHandler().ValidateToken(header["Bearer ".Length..], parameters, out var validated);
        var scopeClaim = ((JwtSecurityToken)validated).Claims.FirstOrDefault(c => c.Type == "scope")?.Value ?? "";
        var scopes = scopeClaim.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return scopes.Contains(requiredScope) ? Results.Text("ok") : Results.StatusCode(403);
    }
    catch (SecurityTokenException)
    {
        return Results.Unauthorized();
    }
}

app.MapGet("/health", () => Results.Text("ok"));
app.MapGet("/reports", (HttpContext context) => Guard(context, "reports.read"));
app.MapGet("/orders", (HttpContext context) => Guard(context, "orders.write"));

string MakeToken(string scope)
{
    var claims = new[] { new Claim("scope", scope) };
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var token = new JwtSecurityToken(Issuer, Audience, claims, DateTime.UtcNow.AddMinutes(-15), DateTime.UtcNow.AddMinutes(10), credentials);
    return new JwtSecurityTokenHandler().WriteToken(token);
}

await app.StartAsync();
var client = app.GetTestClient();
var reader = MakeToken("reports.read");

// Each case: a label, the path, and the token to send (null for no token).
var cases = new (string Label, string Path, string Token)[]
{
    ("reports, reads token", "/reports", reader),
    ("orders, reads token", "/orders", reader),
    ("reports, no token", "/reports", null),
    ("health, no token", "/health", null),
};

foreach (var (label, path, token) in cases)
{
    client.DefaultRequestHeaders.Authorization = token == null ? null : new AuthenticationHeaderValue("Bearer", token);
    var response = await client.GetAsync(path);
    Console.WriteLine($"{label}: {(int)response.StatusCode}");
}
```
```python
# Fake secret and identifiers, for this example only.
import time

import jwt
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.testclient import TestClient

SECRET = "example-secret-not-real-for-this-sample-only-32"
ISSUER = "https://issuer.example.invalid"
AUDIENCE = "https://api.example.invalid"

app = FastAPI()

# The token must be valid, and it must carry the required scope. The scope claim is a list separated by spaces.
def require_scope(scope):
    def check(authorization: str | None = Header(default=None)):
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401)
        try:
            payload = jwt.decode(
                authorization.removeprefix("Bearer "),
                SECRET,
                algorithms=["HS256"],
                audience=AUDIENCE,
                issuer=ISSUER,
                leeway=60,
            )
        except jwt.PyJWTError:
            raise HTTPException(status_code=401)
        if scope not in payload.get("scope", "").split():
            raise HTTPException(status_code=403)
        return payload
    return check

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/reports", dependencies=[Depends(require_scope("reports.read"))])
def reports():
    return {"report": "ok"}

@app.get("/orders", dependencies=[Depends(require_scope("orders.write"))])
def orders():
    return {"order": "ok"}

def make_token(scope):
    now = int(time.time())
    claims = {"iss": ISSUER, "aud": AUDIENCE, "nbf": now - 900, "exp": now + 600, "scope": scope}
    return jwt.encode(claims, SECRET, algorithm="HS256")

client = TestClient(app)
reader = make_token("reports.read")

# Each case: a label, the path, and the token to send (None for no token).
cases = [
    ("reports, reads token", "/reports", reader),
    ("orders, reads token", "/orders", reader),
    ("reports, no token", "/reports", None),
    ("health, no token", "/health", None),
]
for label, path, token in cases:
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    response = client.get(path, headers=headers)
    print(f"{label}: {response.status_code}")
```
```javascript
import express from "express";
import { SignJWT, jwtVerify } from "jose";

// Fake secret and identifiers, for this example only.
const secret = new TextEncoder().encode("example-secret-not-real-for-this-sample-only-32");
const issuer = "https://issuer.example.invalid";
const audience = "https://api.example.invalid";

// The token must be valid, and it must carry the required scope. The scope claim is a list separated by spaces.
function requireScope(scope) {
  return async (req, res, next) => {
    const header = req.headers.authorization ?? "";
    if (!header.startsWith("Bearer ")) return res.status(401).end();
    try {
      const { payload } = await jwtVerify(header.slice("Bearer ".length), secret, {
        algorithms: ["HS256"],
        issuer,
        audience,
        clockTolerance: "60s",
      });
      if (!String(payload.scope ?? "").split(" ").includes(scope)) return res.status(403).end();
      next();
    } catch {
      res.status(401).end();
    }
  };
}

const app = express();
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/reports", requireScope("reports.read"), (req, res) => res.json({ report: "ok" }));
app.get("/orders", requireScope("orders.write"), (req, res) => res.json({ order: "ok" }));

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const { port } = server.address();

async function makeToken(scope) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ scope })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setNotBefore(now - 900)
    .setExpirationTime(now + 600)
    .sign(secret);
}

const reader = await makeToken("reports.read");
// Each case: a label, the path, and the token to send (null for no token).
const cases = [
  ["reports, reads token", "/reports", reader],
  ["orders, reads token", "/orders", reader],
  ["reports, no token", "/reports", null],
  ["health, no token", "/health", null],
];
for (const [label, path, token] of cases) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`http://127.0.0.1:${port}${path}`, { headers });
  console.log(`${label}: ${response.status}`);
}
server.close();
```
~~~

The output is the same in every language:

~~~text
reports, reads token: 200
orders, reads token: 403
reports, no token: 401
health, no token: 200
~~~

Change the `/orders` line in one tab to require `reports.read`, and press Run. The second line becomes 200, because the token now carries the scope that endpoint requires. Each endpoint has its own requirement, and the token is judged against that requirement alone.

> **Note: Windows Firewall.** The JavaScript example starts Express on a local port and calls it. The first time it runs, Windows Firewall may show a prompt asking whether to allow Node.js to accept connections. The example only uses 127.0.0.1, so choose Allow for private networks. There's no need to allow public networks.

> **.NET Framework 4.8.** ASP.NET Core doesn't run on .NET Framework 4.8. The 4.8 alternative is ASP.NET Web API 2 with OWIN middleware, which applies the same scope check in a message handler or an attribute, using the same validation parameters. The C# sample also uses the range operator in `header["Bearer ".Length..]`, which is a C# 8 feature, and the `Split(' ', ...)` overload, which exists only in .NET Core. On 4.8, use `header.Substring("Bearer ".Length)` and `Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)`.

> **Aside: 401 and 403 answer different questions.**
> A 401 says the caller could not be identified, so signing in again may help. A 403 says the caller is identified and lacks permission, so signing in again won't help, and the caller needs a different permission. Use each one for its own case.

> **Common mistake.** Checking the scope before the token is validated. A scope read from an unverified token can be anything. The check order is the one from Chapter 17: validate first, then read the claims.

---
