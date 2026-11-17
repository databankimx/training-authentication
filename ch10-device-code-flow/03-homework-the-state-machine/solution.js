// A fixed sequence of answers from the token endpoint, so the output repeats.
const responses = ["authorization_pending", "slow_down", "authorization_pending", "expired_token", "success"];

// Each answer maps to the state it moves the device into.
const states = {
  authorization_pending: "waiting",
  slow_down: "waiting",
  success: "approved",
  access_denied: "denied",
  expired_token: "expired",
};
const finalStates = new Set(["approved", "denied", "expired"]);

let current = "waiting";
responses.forEach((response, index) => {
  if (!finalStates.has(current)) {
    current = states[response];
  }
  console.log(`poll ${index + 1}: ${response} -> ${current}`);
});
