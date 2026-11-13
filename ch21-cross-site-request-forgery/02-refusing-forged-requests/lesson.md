# 2. Refusing Forged Requests

The sample is an application with one state-changing endpoint, `POST /transfer`. The session holds an anti-forgery token, and the page must send the same value in an `X-CSRF-Token` header. The endpoint also checks the `Origin` header, and refuses any origin other than the application's own.

The sample sends four requests inside a test host: one that passes both checks, one with no token, one with a token that doesn't match the session, and one from another origin with a valid token. Each one is refused for a different reason, and the output shows which checks ran.

The token value is fixed and fake, so the output is repeatable. In a real application the token is random, and it's created when the session starts.

~~~examples source
```csharp
#:sdk Microsoft.NET.Sdk.Web
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property PublishAot=false
#:property Nullable=disable
#:package Microsoft.AspNetCore.TestHost@10.*-*

using System.Net.Http;
using Microsoft.AspNetCore.TestHost;

// The application's own origin, and the anti-forgery token the session holds. Both are fixed for the example.
const string AppOrigin = "https://app.example.invalid";
const string SessionToken = "example-csrf-token-not-real";

var builder = WebApplication.CreateBuilder();
builder.WebHost.UseTestServer();
var app = builder.Build();

// A state-changing request must come from the application's origin, and must send the session's token in a header.
app.MapPost("/transfer", (HttpContext context) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    if (origin != "" && origin != AppOrigin) return Results.StatusCode(403);

    var cookie = context.Request.Cookies["csrf_token"];
    var header = context.Request.Headers["X-CSRF-Token"].ToString();
    if (cookie == null || header == "" || header != cookie) return Results.StatusCode(403);

    return Results.Text("transfer done");
});

await app.StartAsync();
var client = app.GetTestClient();

// Each case: a label, the origin to send (null for none), the token in the header (null for none), and the cookie.
var cases = new (string Label, string Origin, string Header, string Cookie)[]
{
    ("matching token, same origin", AppOrigin, SessionToken, SessionToken),
    ("no token", AppOrigin, null, SessionToken),
    ("token does not match session", AppOrigin, "guessed-token", SessionToken),
    ("other origin, valid token", "https://evil.example.invalid", SessionToken, SessionToken),
};

foreach (var (label, origin, header, cookie) in cases)
{
    var request = new HttpRequestMessage(HttpMethod.Post, "/transfer");
    if (origin != null) request.Headers.Add("Origin", origin);
    if (header != null) request.Headers.Add("X-CSRF-Token", header);
    request.Headers.Add("Cookie", "csrf_token=" + cookie);
    var response = await client.SendAsync(request);
    Console.WriteLine($"{label}: {(int)response.StatusCode}");
}
```
```python
# The application's own origin, and the anti-forgery token the session holds. Both are fixed for the example.
from fastapi import Cookie, FastAPI, Header
from fastapi.responses import PlainTextResponse
from fastapi.testclient import TestClient

APP_ORIGIN = "https://app.example.invalid"
SESSION_TOKEN = "example-csrf-token-not-real"

app = FastAPI()

# A state-changing request must come from the application's origin, and must send the session's token in a header.
@app.post("/transfer")
def transfer(
    origin: str | None = Header(default=None),
    x_csrf_token: str | None = Header(default=None),
    csrf_token: str | None = Cookie(default=None),
):
    if origin is not None and origin != APP_ORIGIN:
        return PlainTextResponse("forbidden", status_code=403)
    if csrf_token is None or not x_csrf_token or x_csrf_token != csrf_token:
        return PlainTextResponse("forbidden", status_code=403)
    return PlainTextResponse("transfer done")

client = TestClient(app)

# Each case: a label, the origin to send (None for none), the token in the header (None for none), and the cookie.
cases = [
    ("matching token, same origin", APP_ORIGIN, SESSION_TOKEN, SESSION_TOKEN),
    ("no token", APP_ORIGIN, None, SESSION_TOKEN),
    ("token does not match session", APP_ORIGIN, "guessed-token", SESSION_TOKEN),
    ("other origin, valid token", "https://evil.example.invalid", SESSION_TOKEN, SESSION_TOKEN),
]
for label, origin, header, cookie in cases:
    headers = {"Cookie": f"csrf_token={cookie}"}
    if origin is not None:
        headers["Origin"] = origin
    if header is not None:
        headers["X-CSRF-Token"] = header
    response = client.post("/transfer", headers=headers)
    print(f"{label}: {response.status_code}")
```
```javascript
import express from "express";
import http from "node:http";

// The application's own origin, and the anti-forgery token the session holds. Both are fixed for the example.
const appOrigin = "https://app.example.invalid";
const sessionToken = "example-csrf-token-not-real";

const app = express();

// A state-changing request must come from the application's origin, and must send the session's token in a header.
app.post("/transfer", (req, res) => {
  const origin = req.headers.origin;
  if (origin !== undefined && origin !== appOrigin) return res.status(403).end();

  const cookies = Object.fromEntries(
    (req.headers.cookie ?? "").split("; ").filter(Boolean).map((pair) => pair.split("=")),
  );
  const header = req.headers["x-csrf-token"];
  if (!cookies.csrf_token || !header || header !== cookies.csrf_token) return res.status(403).end();

  res.send("transfer done");
});

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const { port } = server.address();

// Sends a POST and resolves with the status. node:http is used so that the Origin header can be set.
function post(headers) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path: "/transfer", method: "POST", headers }, (res) => {
      res.resume();
      res.on("end", () => resolve(res.statusCode));
    });
    req.on("error", reject);
    req.end();
  });
}

// Each case: a label, the origin to send (null for none), the token in the header (null for none), and the cookie.
const cases = [
  ["matching token, same origin", appOrigin, sessionToken, sessionToken],
  ["no token", appOrigin, null, sessionToken],
  ["token does not match session", appOrigin, "guessed-token", sessionToken],
  ["other origin, valid token", "https://evil.example.invalid", sessionToken, sessionToken],
];
for (const [label, origin, header, cookie] of cases) {
  const headers = { Cookie: `csrf_token=${cookie}` };
  if (origin !== null) headers.Origin = origin;
  if (header !== null) headers["X-CSRF-Token"] = header;
  console.log(`${label}: ${await post(headers)}`);
}
server.close();
```
~~~

The output is the same in every language:

~~~text
matching token, same origin: 200
no token: 403
token does not match session: 403
other origin, valid token: 403
~~~

Change the `no token` case to send the session token in its header, and press Run. The second line becomes 200. The token is the only thing that changed, so the token is what decides that request.

> **Note: Windows Firewall.** The JavaScript example starts Express on a local port and calls it. The first time it runs, Windows Firewall may show a prompt asking whether to allow Node.js to accept connections. The example only uses 127.0.0.1, so choose Allow for private networks. There's no need to allow public networks.

> **.NET Framework 4.8.** ASP.NET Core doesn't run on .NET Framework 4.8. The 4.8 alternatives are ASP.NET Web API 2 or MVC, which provide the same anti-forgery and origin checks through their own filters. The C# sample uses tuples and deconstruction, which C# 7 introduced and .NET Framework 4.8 supports.

> **Aside: the origin header is not always there.**
> Browsers send `Origin` on requests that change state, but not on every request, and older clients may omit it. A missing origin is not proof of a safe request, which is why the token check still runs when the origin check passes.

> **Common mistake.** Using the cookie itself as the anti-forgery token. The browser sends the cookie automatically, so an attacker's request carries it too. The token must be a value the page can read and the attacker cannot, and it must be sent in a header, not a cookie.

---
