// The URL and key are fake, and they exist only in this exercise.
const url = "https://api.example.invalid/v1/orders";
const key = "fake-key-1234";
const headers = { "X-Api-Key": key };

console.log(`GET ${url}`);
for (const [name, value] of Object.entries(headers)) {
  console.log(`${name}: ${value}`);
}
console.log(url.includes(key) ? "Key in URL: yes" : "Key in URL: no");
