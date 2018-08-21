
'use strict';

const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
const plus = google.plus('v1');

const Q = require('q');

let keys = { redirect_uris: [''] };
const keyPath = path.join(__dirname, '../oauth2.keys.json');
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;

  keys.client_id = keys.client_id.replace("<CLIENT_ID>",process.env.GOOGLE_CLIENT_ID);
  keys.client_secret = process.env.GOOGLE_CLIENT_SECRET;
  keys.redirect_uris[0] = process.env.GOOGLE_REDIRECT_URI);
}

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

const scopes = ['https://www.googleapis.com/auth/plus.me'];

google.options({ auth: oauth2Client });

function authenticate (_token) {
  let deferred = Q.defer();
  oauth2Client.getToken(_token)
  .then(googleToken => {
    oauth2Client.credentials = googleToken.tokens;
    deferred.resolve(oauth2Client);
  });
  return deferred.promise;
}

async function getOauthUrl() {
  return new Promise((resolve, reject) => {
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
    var url = {};
    url.url = authorizeUrl;
    resolve(url);
  });
}

function googleAuth(code) {
  let deferred = Q.defer();
  authenticate(code)
  .then((client) => {
    plus.people.get({ userId: 'me' })
    .then(res => deferred.resolve(res.data))
  })
  .catch(console.error);
  return deferred.promise;
}

module.exports = {
  getOauthUrl,
  googleAuth
};
