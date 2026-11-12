# 2. Where an API Key Goes

Most APIs accept a key in a request header. The header is the right place, because headers aren't written into the address bar, browser history, or the URLs that many logs and proxies record. Some older APIs take the key in the query string instead, and that's the one to avoid when the API gives you a choice.

## The sample

The sample builds a request to an example address, with the key in a header named `X-Api-Key`. The header name comes from the API's documentation, so use the name your API expects. The domain ends in `.invalid`, which is reserved, so the sample can't reach a real service.

~~~examples source
```csharp
// The key is fake, and the address is reserved for examples. The key travels in a header, not in the URL.
var url = "https://api.example.invalid/reports";
var key = "example-key-not-real";
var headers = new Dictionary<string, string>
{
    ["X-Api-Key"] = key,
};
Console.WriteLine($"GET {url}");
foreach (var (name, value) in headers)
{
    Console.WriteLine($"{name}: {value}");
}
```
```python
# The key is fake, and the address is reserved for examples. The key travels in a header, not in the URL.
url = "https://api.example.invalid/reports"
key = "example-key-not-real"
headers = {"X-Api-Key": key}
print(f"GET {url}")
for name, value in headers.items():
    print(f"{name}: {value}")
```
```javascript
// The key is fake, and the address is reserved for examples. The key travels in a header, not in the URL.
const url = "https://api.example.invalid/reports";
const key = "example-key-not-real";
const headers = { "X-Api-Key": key };
console.log(`GET ${url}`);
for (const [name, value] of Object.entries(headers)) {
  console.log(`${name}: ${value}`);
}
```
~~~

The output is the same in every language:

~~~text
GET https://api.example.invalid/reports
X-Api-Key: example-key-not-real
~~~

Notice that the URL line contains no key. Everything that would be written to a log of the request address is safe, and the key appears only in the header line.

> **Aside: the header name is not a secret.**
> The name `X-Api-Key` tells the API which header to read, and it's public. Only the value is secret. Logs can record the name, as long as they never record the value.

> **Common mistake.** Adding the key to the URL, such as `?api_key=...`, because the example in a blog post did it that way. The URL is written to logs, history, and proxies, so the key ends up in all of them. Put it in the header.

---
