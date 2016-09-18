# cloudant-per-user-auth0

Express reverse proxy for [Cloudant](https://cloudant.com/) db-per-user with [Auth0](https://auth0.com/).
 
Implements db-per-user strategy without:
 * passwords on the client
 * Cloudant API keys per-user

## Installation

```
npm install
```

## Usage
Set environment variables:
```
  AUTH0_CLIENT_ID
  AUTH0_CLIENT_SECRET
  AUTH0_DOMAIN ("myauth0domain.auth0.com")
  CLOUDANT_ACCOUNT ("mycloudantaccountname")
  CLOUDANT_DB_PREFIX ("todos")
  CLOUDANT_PASSWORD
  CLOUDANT_USERNAME
```

Run with: `npm start`

In the PouchDB ["Getting Started" todo app](https://github.com/nickcolley/getting-started-todo/blob/master/js/app.js#L14):

```
  // Replace with remote instance, this just replicates to another local instance.
  var remoteCouch = 'todos_remote';
```

replace with:
```
var remoteCouch = new PouchDB('http://localhost:8000/db/todos', {
    ajax: {
      headers: {
        Authorization: token // Auth0 id token
      },
      withCredentials: false
    }
  });
```

If the token is valid, the local PouchDB will be synced with a remote Cloudant db uniquely named, using:
 * the `CLOUDANT_DB_PREFIX` environment variable
 * the `subject` claim of the Auth0 jwt (replacing characters not allowed in db names with an underscore)

example: jwt `subject` `google-oauth2|123456789` -> Cloudant db: `todos_user_google-oauth2_123456789`.

## Deployment

`npm run deploy` deploys to a unique url with [now](https://zeit.co/now)

## License

ISC