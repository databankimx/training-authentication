// The expiry, the request times, and the margins are fixed, so the output repeats.
const expiry = 1893456000;
const requestTimes = [1893455700, 1893455800, 1893455900, 1893455950, 1893456000];
const margins = [60, 120, 240];

// Write your code below this comment. For each margin, count the requests that need a refresh first, and the requests
// that found the token expired. Print one line per margin, in the form "Margin 60: refresh first 1, expired 1".
