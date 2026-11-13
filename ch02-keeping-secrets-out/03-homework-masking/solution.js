// The samples are fake, and they exist only in this exercise.
const mask = (value) => (value.length <= 4 ? "****" : "****" + value.slice(-4));

const samples = ["example-token-not-real", "short", "abc"];
for (const sample of samples) {
  console.log(mask(sample));
}
