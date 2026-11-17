# 1. The Client Credentials Flow

In the client credentials flow, the script is the client, and it authenticates as itself. No person signs in and no browser is involved. The script sends its client identifier and its secret to the token endpoint, along with the scopes it wants, and the identity provider returns an access token for that client.

The sequence shows the script asking for a token and then calling the API with it. No person appears anywhere.

~~~text
Script                              Token endpoint               API
   |                                       |                      |
   |------ POST: token request ----------->|                      |
   |                                       |                      |
   |<----- access_token, expires_in -------|                      |
   |                                       |                      |
   |------ request with Authorization: Bearer <token> ----------->|
   |<------ response ---------------------------------------------|
~~~

## The request

The request is a form-encoded POST to the token endpoint. Its main fields are these:

- `grant_type` is `client_credentials`, which names the flow.
- `client_id` identifies the script, as the identity provider registered it.
- `client_secret` proves the script is that client. Some providers accept it as a Basic credential in the header instead, and the provider's documentation says which.
- `scope` lists the permissions the script asks for, separated by spaces.

The request is made from the script's own system, server to server. The secret should never reach a browser or a user's machine.

## The response

The response is JSON. It holds an `access_token`, the `token_type` (usually `Bearer`), and an `expires_in` value in seconds. The access token is then sent to the API in the `Authorization` header, as Chapter 1 showed.

Most providers don't issue a refresh token in this flow. When the access token runs out, the script simply asks again with its client credentials, which is why Chapter 6 treated renewal as a request for a new token rather than an exchange.

## Keeping the secret safe

The client secret is the credential here, and it's a long-lived one, so it needs the most care of any secret in this tutorial. Store it in a secrets manager or the platform's own identity where one is available, rotate it on a schedule, and replace it at once if it leaks. Chapter 2 covered where secrets belong.

> **Aside: the script's identity is not a person's.**
> Tokens from this flow act as the client, not as any person. Logs and audit trails show the client's name, so a team must know which person or team owns each client, and must be able to answer for what it does.

> **Common mistake.** Asking for every scope the API offers, because it is easier than working out which ones the job needs. The token then carries access the script never uses, and it's all exposed if the token leaks. Ask only for the scopes the job needs.

---
