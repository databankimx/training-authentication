// The user name and password are fake, and they exist only in this exercise.
const user = "fake-user";
const password = "fake-pass";
const pair = `${user}:${password}`;
const encoded = Buffer.from(pair, "utf8").toString("base64");
console.log(`Basic ${encoded}`);
