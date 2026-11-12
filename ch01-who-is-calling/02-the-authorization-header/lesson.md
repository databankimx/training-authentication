# 2. The Authorization Header

Most APIs take a credential in a request header called `Authorization`. The header has two parts: a scheme, which says what kind of credential it is, and the credential itself. A bearer token is the most common scheme, and the word "bearer" means the holder of the token is treated as the caller. That's why a bearer token has to be protected like a password.

The header has three visible parts. The diagram labels them.

~~~text
Authorization: Bearer example-token-not-real
|              |      |
|              |      +-- the credential itself
|              +-- the scheme: what kind of credential this is
+-- the header name the API reads
~~~

## Building the header

The sample below builds the header for a bearer token. The token is fake, and it's there only to show the shape. Real tokens come from an identity provider, and they're never written into code.

~~~examples
```csharp
// A fake token, for illustration only. Real tokens come from an identity provider.
var token = "example-token-not-real";
var headers = new Dictionary<string, string>
{
    ["Authorization"] = $"Bearer {token}",
};
foreach (var (name, value) in headers)
{
    Console.WriteLine($"{name}: {value}");
}
```
```python
# A fake token, for illustration only. Real tokens come from an identity provider.
token = "example-token-not-real"
headers = {"Authorization": f"Bearer {token}"}
for name, value in headers.items():
    print(f"{name}: {value}")
```
```javascript
// A fake token, for illustration only. Real tokens come from an identity provider.
const token = "example-token-not-real";
const headers = { Authorization: `Bearer ${token}` };
for (const [name, value] of Object.entries(headers)) {
  console.log(`${name}: ${value}`);
}
```
~~~

The output is the same in every language:

~~~text
Authorization: Bearer example-token-not-real
~~~

Edit the token in one tab, press Run, and see the header change. Notice that the scheme word and the token are separated by one space. Many APIs refuse a header with the wrong spacing, so keep the format exact.

## What the header is, and what it isn't

The header is a claim, not a proof of anything by itself. Whoever can read the request, or the log that recorded it, can copy the header and send it again. That's the reason the header must travel only over HTTPS, and the reason logs must never record it in full. Chapter 14 covers logging in detail.

> **Aside: the header is not the request.**
> The header is one part of the request. The body, the URL, and the method all travel alongside it. A valid header doesn't make a request valid for the resource it asks for. That decision belongs to authorization, which Step 1 covered.

> **Common mistake.** Putting the token in the URL as a query parameter because it was easier to test. Query strings are written to logs, browser history, and proxies. Keep credentials in the header.

---
