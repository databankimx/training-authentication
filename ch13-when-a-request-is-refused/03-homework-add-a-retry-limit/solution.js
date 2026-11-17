// Four simulated requests. Each list is the status codes the server returns for each attempt, in order.
const requests = [
  [429, 503, 200],
  [403],
  [429, 429, 429, 429],
  [401, 200],
];
const maxRetries = 3;

requests.forEach((statuses, index) => {
  let attempts = 0;
  let retries = 0;
  let refreshed = false;
  let result = null;

  for (const status of statuses) {
    attempts++;
    if (status === 200) {
      result = `ok after ${attempts} attempts`;
      break;
    }
    if (status === 403) {
      result = "stopped: 403 (no retry)";
      break;
    }
    if (status === 401) {
      if (refreshed) {
        result = `stopped: 401 after refresh, after ${attempts} attempts`;
        break;
      }
      refreshed = true;
      continue;
    }
    if ((status === 429 || status === 503) && retries < maxRetries) {
      retries++;
      continue;
    }
    result = `gave up after ${attempts} attempts`;
    break;
  }

  console.log(`request ${index + 1}: ${result}`);
});
