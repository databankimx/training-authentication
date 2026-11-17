# 2. The Capstone Sample

The sample runs the whole flow in one program. A simulated identity provider checks the client's secret and issues a token. A protected API checks that token and its scope. The client makes four calls: one that gets a token and uses it, one that presents a wrong secret, and one that calls the API without a token.

Every value is fake, and nothing leaves the program. The output shows each step's result, so you can match each line to one of the pieces in the previous reading.

~~~examples source
```csharp
#:sdk Microsoft.NET.Sdk.Web
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false
#:package Microsoft.AspNetCore.TestHost@10.*-*
#:package System.IdentityModel.Tokens.Jwt@8.22.0

using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.TestHost;
using Microsoft.IdentityModel.Tokens;

// Fake values for this example only. A real API never shares its signing secret with the identity provider.
const string Secret = "example-secret-not-real-for-this-sample-only-32";
const string Issuer = "https://issuer.example.invalid";
const string Audience = "https://api.example.invalid";
const string ClientId = "reports-client";
const string ClientSecret = "example-client-secret-not-real";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

// The identity provider: checks the client's identifier and secret, then issues a token for the scope it asks for.
string IssueToken(string clientId, string clientSecret, string scope, out string error)
{
    error = null;
    if (clientId != ClientId || clientSecret != ClientSecret)
    {
        error = "invalid_client";
        return null;
    }
    var claims = new[] { new Claim("scope", scope) };
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var issued = new JwtSecurityToken(Issuer, Audience, claims, DateTime.UtcNow.AddMinutes(-15), DateTime.UtcNow.AddMinutes(10), credentials);
    return new JwtSecurityTokenHandler().WriteToken(issued);
}

var builder = WebApplication.CreateBuilder();
builder.WebHost.UseTestServer();
var app = builder.Build();

// The API: validates the token, then checks that it carries the scope this endpoint needs.
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
        new JwtSecurityTokenHandler().ValidateToken(header["Bearer ".Length..], parameters, out var validated);
        var scope = ((JwtSecurityToken)validated).Claims.FirstOrDefault(c => c.Type == "scope")?.Value ?? "";
        return scope.Split(' ', StringSplitOptions.RemoveEmptyEntries).Contains("reports.read")
            ? Results.Text("report")
            : Results.StatusCode(403);
    }
    catch (SecurityTokenException)
    {
        return Results.Unauthorized();
    }
});

await app.StartAsync();
var client = app.GetTestClient();

var token = IssueToken(ClientId, ClientSecret, "reports.read", out var issueError);
Console.WriteLine(token != null
    ? "client with correct secret: token issued"
    : $"client with correct secret: refused, {issueError}");

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
var withToken = await client.GetAsync("/reports");
Console.WriteLine($"API call with token: {(int)withToken.StatusCode}");

IssueToken(ClientId, "wrong-secret", "reports.read", out var refusedError);
Console.WriteLine($"client with wrong secret: refused, {refusedError}");

client.DefaultRequestHeaders.Authorization = null;
var withoutToken = await client.GetAsync("/reports");
Console.WriteLine($"API call with no token: {(int)withoutToken.StatusCode}");
```
```python
# Fake values for this example only. A real API never shares its signing secret with the identity provider.
import time

import jwt
from fastapi import FastAPI, Header
from fastapi.responses import PlainTextResponse
from fastapi.testclient import TestClient

SECRET = "example-secret-not-real-for-this-sample-only-32"
ISSUER = "https://issuer.example.invalid"
AUDIENCE = "https://api.example.invalid"
CLIENT_ID = "reports-client"
CLIENT_SECRET = "example-client-secret-not-real"

# The identity provider: checks the client's identifier and secret, then issues a token for the scope it asks for.
def issue_token(client_id, client_secret, scope):
    if client_id != CLIENT_ID or client_secret != CLIENT_SECRET:
        return None, "invalid_client"
    now = int(time.time())
    claims = {"iss": ISSUER, "aud": AUDIENCE, "nbf": now - 900, "exp": now + 600, "scope": scope}
    return jwt.encode(claims, SECRET, algorithm="HS256"), None

app = FastAPI()

# The API: validates the token, then checks that it carries the scope this endpoint needs.
@app.get("/reports")
def reports(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        return PlainTextResponse("unauthorized", status_code=401)
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
        return PlainTextResponse("unauthorized", status_code=401)
    if "reports.read" not in payload.get("scope", "").split():
        return PlainTextResponse("forbidden", status_code=403)
    return PlainTextResponse("report")

client = TestClient(app)

token, _ = issue_token(CLIENT_ID, CLIENT_SECRET, "reports.read")
print("client with correct secret: token issued" if token else "client with correct secret: refused")
print(f"API call with token: {client.get('/reports', headers={'Authorization': 'Bearer ' + token}).status_code}")

_, refused_error = issue_token(CLIENT_ID, "wrong-secret", "reports.read")
print(f"client with wrong secret: refused, {refused_error}")
print(f"API call with no token: {client.get('/reports').status_code}")
```
```javascript
import express from "express";
import { SignJWT, jwtVerify } from "jose";

// Fake values for this example only. A real API never shares its signing secret with the identity provider.
const secret = new TextEncoder().encode("example-secret-not-real-for-this-sample-only-32");
const issuer = "https://issuer.example.invalid";
const audience = "https://api.example.invalid";
const clientId = "reports-client";
const clientSecret = "example-client-secret-not-real";

// The identity provider: checks the client's identifier and secret, then issues a token for the scope it asks for.
async function issueToken(id, secretValue, scope) {
  if (id !== clientId || secretValue !== clientSecret) return { error: "invalid_client" };
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ scope })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setNotBefore(now - 900)
    .setExpirationTime(now + 600)
    .sign(secret);
  return { token };
}

const app = express();

// The API: validates the token, then checks that it carries the scope this endpoint needs.
app.get("/reports", async (req, res) => {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return res.status(401).end();
  try {
    const { payload } = await jwtVerify(header.slice("Bearer ".length), secret, {
      algorithms: ["HS256"],
      issuer,
      audience,
      clockTolerance: "60s",
    });
    if (!String(payload.scope ?? "").split(" ").includes("reports.read")) return res.status(403).end();
    res.send("report");
  } catch {
    res.status(401).end();
  }
});

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const { port } = server.address();

async function callApi(headers) {
  const response = await fetch(`http://127.0.0.1:${port}/reports`, { headers });
  return response.status;
}

const issued = await issueToken(clientId, clientSecret, "reports.read");
console.log(issued.token ? "client with correct secret: token issued" : `client with correct secret: refused, ${issued.error}`);
console.log(`API call with token: ${await callApi({ Authorization: `Bearer ${issued.token}` })}`);

const refused = await issueToken(clientId, "wrong-secret", "reports.read");
console.log(`client with wrong secret: refused, ${refused.error}`);
console.log(`API call with no token: ${await callApi({})}`);
server.close();
```
~~~

The output is the same in every language:

~~~text
client with correct secret: token issued
API call with token: 200
client with wrong secret: refused, invalid_client
API call with no token: 401
~~~

Change the client's requested scope in the first call from `reports.read` to `orders.write`, and press Run. The second line becomes `403`. The provider still issues a token, because the client's secret is correct, and the API refuses the request for the missing scope. Each check refuses for its own reason.

> **Note: Windows Firewall.** The JavaScript example starts Express on a local port and calls it. The first time it runs, Windows Firewall may show a prompt asking whether to allow Node.js to accept connections. The example only uses 127.0.0.1, so choose Allow for private networks. There's no need to allow public networks.

> **.NET Framework 4.8.** ASP.NET Core doesn't run on .NET Framework 4.8. The 4.8 alternatives are ASP.NET Web API 2 or MVC with OWIN for the API, and the same `System.IdentityModel.Tokens.Jwt` calls for the provider and the checks. The C# sample uses the range operator in `header["Bearer ".Length..]`, which is a C# 8 feature. On 4.8, use `Substring` with the same start position. The sample also uses the `Split(' ', ...)` overload, which exists only in .NET Core. On 4.8, use `Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)`.

> **Aside: the sample is a simplified system.**
> It uses one shared secret, a simulated provider, and no real network. Those simplifications make it run offline. The checks it makes are the real ones, and they are the checks a production system needs.

> **Common mistake.** Checking that the client got a token, and stopping there. The token proves the provider accepted the client. It does not prove the API will accept the token, or that the client should be asking for that scope.

---
