const cors = require('cors');
const express = require('express');
const jwt = require('express-jwt');
const request = require('request');

const {
  AUTH0_CLIENT_ID: audience,
  AUTH0_CLIENT_SECRET: secret,
  AUTH0_DOMAIN: domain,
  CLOUDANT_ACCOUNT: account,
  CLOUDANT_DB_PREFIX: dbPrefix,
  CLOUDANT_PASSWORD: pass,
  CLOUDANT_USERNAME: user,
} = process.env;

const app = express();

app.all('/db/*',
  cors({ origin: '*' }),
  jwt({ audience, issuer: `https://${domain}/`, secret: new Buffer(secret, 'base64') }),
  function (req, res) {
    const match = req.url.match(/\/db\/(.*)/);
    const dbMatch = match[1].match(new RegExp(`${dbPrefix}\\/(.*)`));
    const path = dbMatch && [
      `${dbPrefix}_user_${req.user.sub.replace('|', '_')}`,
      dbMatch[1]
    ].join('/');

    req.pipe(request({
      auth: { pass, user },
      method: req.method.toLowerCase(),
      uri: [`https://${account}.cloudant.com`, path].join('/'),
    })).pipe(res);
  }
);

app.listen(8000);