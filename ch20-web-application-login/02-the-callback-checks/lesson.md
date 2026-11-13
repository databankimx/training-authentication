# 2. The Callback Checks

The sample is a small web application with one protected route, `/callback`. It starts a login by creating a state and a nonce, stores the state in a session cookie, and builds the login request with both values. Then it sends the callback three requests inside a test host: one with the matching state, one with a state that doesn't match the session, and one with no session at all. It prints the result of each.

The client secret and the token exchange are left out. The sample shows the callback checks, which are the part an attacker would try to get past. The values are fixed and fake, so the output is repeatable, except that the state is random, which is why the sample reports only whether the login request carries the values.

~~~examples source
```csharp
#:sdk Microsoft.NET.Sdk.Web
// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property PublishAot=false
#:property Nullable=disable
#:package Microsoft.AspNetCore.TestHost@10.*-*

using System.Net.Http.Headers;
using Microsoft.AspNetCore.TestHost;

// The login starts here. The state ties the callback to this login, and the nonce ties the ID token to it.
var loginState = Guid.NewGuid().ToString("N");
var nonce = Guid.NewGuid().ToString("N");
var authorizeUrl = "https://login.example.invalid/authorize?client_id=example-client"
    + "&redirect_uri=" + Uri.EscapeDataString("https://app.example.invalid/callback")
    + "&response_type=code&scope=openid%20profile"
    + "&state=" + loginState + "&nonce=" + nonce;
Console.WriteLine($"login request has state and nonce: {authorizeUrl.Contains("state=") && authorizeUrl.Contains("nonce=")}");

var builder = WebApplication.CreateBuilder();
builder.WebHost.UseTestServer();
var app = builder.Build();

// The session cookie holds the state from the login. The callback must return the same value.
app.MapGet("/callback", (HttpContext context, string code, string state) =>
{
    var sessionState = context.Request.Cookies["session_state"];
    if (sessionState == null || sessionState != state) return Results.BadRequest("state mismatch");
    return Results.Text("signed in");
});

await app.StartAsync();
var client = app.GetTestClient();

// Each case: a label, the state the callback carries, and the session cookie (null for none).
var cases = new (string Label, string State, string Session)[]
{
    ("callback, matching state", loginState, loginState),
    ("callback, wrong state", "not-the-same-state", loginState),
    ("callback, no session", loginState, null),
};

foreach (var (label, callbackState, session) in cases)
{
    client.DefaultRequestHeaders.Remove("Cookie");
    if (session != null) client.DefaultRequestHeaders.Add("Cookie", "session_state=" + session);
    var response = await client.GetAsync("/callback?code=example-code&state=" + callbackState);
    Console.WriteLine($"{label}: {(int)response.StatusCode}");
}
```
```python
# The login starts here. The state ties the callback to this login, and the nonce ties the ID token to it.
import uuid
from urllib.parse import quote

from fastapi import FastAPI, Cookie
from fastapi.responses import PlainTextResponse
from fastapi.testclient import TestClient

state = uuid.uuid4().hex
nonce = uuid.uuid4().hex
authorize_url = (
    "https://login.example.invalid/authorize?client_id=example-client"
    f"&redirect_uri={quote('https://app.example.invalid/callback', safe='')}"
    "&response_type=code&scope=openid%20profile"
    f"&state={state}&nonce={nonce}"
)
print(f"login request has state and nonce: {'state=' in authorize_url and 'nonce=' in authorize_url}")

app = FastAPI()

# The session cookie holds the state from the login. The callback must return the same value.
@app.get("/callback")
def callback(code: str, state: str, session_state: str | None = Cookie(default=None)):
    if session_state is None or session_state != state:
        return PlainTextResponse("state mismatch", status_code=400)
    return PlainTextResponse("signed in")

client = TestClient(app)

# Each case: a label, the state the callback carries, and the session cookie (None for none).
cases = [
    ("callback, matching state", state, state),
    ("callback, wrong state", "not-the-same-state", state),
    ("callback, no session", state, None),
]
for label, callback_state, session in cases:
    headers = {"Cookie": f"session_state={session}"} if session else {}
    response = client.get(f"/callback?code=example-code&state={callback_state}", headers=headers)
    print(f"{label}: {response.status_code}")
```
```javascript
import express from "express";
import { randomUUID } from "node:crypto";

// The login starts here. The state ties the callback to this login, and the nonce ties the ID token to it.
const state = randomUUID();
const nonce = randomUUID();
const authorizeUrl =
  "https://login.example.invalid/authorize?client_id=example-client" +
  "&redirect_uri=" + encodeURIComponent("https://app.example.invalid/callback") +
  "&response_type=code&scope=openid%20profile" +
  `&state=${state}&nonce=${nonce}`;
console.log(`login request has state and nonce: ${authorizeUrl.includes("state=") && authorizeUrl.includes("nonce=")}`);

const app = express();

// The session cookie holds the state from the login. The callback must return the same value.
app.get("/callback", (req, res) => {
  const cookies = Object.fromEntries(
    (req.headers.cookie ?? "").split("; ").filter(Boolean).map((pair) => pair.split("=")),
  );
  const sessionState = cookies.session_state;
  if (!sessionState || sessionState !== req.query.state) return res.status(400).send("state mismatch");
  res.send("signed in");
});

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const { port } = server.address();

// Each case: a label, the state the callback carries, and the session cookie (null for none).
const cases = [
  ["callback, matching state", state, state],
  ["callback, wrong state", "not-the-same-state", state],
  ["callback, no session", state, null],
];
for (const [label, callbackState, session] of cases) {
  const headers = session ? { Cookie: `session_state=${session}` } : {};
  const response = await fetch(`http://127.0.0.1:${port}/callback?code=example-code&state=${callbackState}`, { headers });
  console.log(`${label}: ${response.status}`);
}
server.close();
```
~~~

The output is the same in every language:

~~~text
login request has state and nonce: true
callback, matching state: 200
callback, wrong state: 400
callback, no session: 400
~~~

Change the callback's state in one tab to match the session's, and press Run. The second line changes to 200, which is the point: the callback is accepted only when the state belongs to the session that started the login.

> **Note: Windows Firewall.** The JavaScript example starts Express on a local port and calls it. The first time it runs, Windows Firewall may show a prompt asking whether to allow Node.js to accept connections. The example only uses 127.0.0.1, so choose Allow for private networks. There's no need to allow public networks.

> **.NET Framework 4.8.** ASP.NET Core doesn't run on .NET Framework 4.8. The 4.8 alternatives are ASP.NET Web API 2 or MVC with OWIN, which read the same cookie and compare the same state value. The sample also puts string literals inside interpolation braces, a C# 11 feature. On 4.8, move the literal into a variable first. `Guid.NewGuid` is available on 4.8 unchanged.

> **Aside: the state is a check, not a secret.**
> The state is sent to the browser and back, so anyone can see it. Its job is to be unguessable and to match the session. An attacker who can make a victim's browser follow a callback they built can't supply the matching state, because they can't read the victim's session.

> **Common mistake.** Checking that the state is present rather than that it matches the session. A callback with any state passes a presence check. Compare it with the value the session stored at login.

---
