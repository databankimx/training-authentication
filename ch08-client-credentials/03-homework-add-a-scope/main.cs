// The two lines below suppress compiler warnings that would confuse a learner. They are not part of the exercise.
#:property Nullable=disable
#:property PublishAot=false

// The endpoint, client, and secret are fake, and nothing is sent.
var tokenEndpoint = "https://login.example.invalid/oauth/token";
var clientId = "example-client";
var clientSecret = "example-secret-not-real";
var scopes = new[] { "reports.read" };

// Write your code below this comment. Add the scope orders.read to the list, build the request with the scopes joined by
// a space and encoded, and print "POST " and the endpoint, then the body with the secret shown as ****.
