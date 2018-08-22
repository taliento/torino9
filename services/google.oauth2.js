"use strict";

const { google } = require("googleapis");
const plus = google.plus("v1");
const Q = require("q");

const configuration = {
  web: {
    client_id: "<CLIENT_ID>.apps.googleusercontent.com",
    project_id: "torino9",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "<client_secret>",
    redirect_uris: ["<GOOGLE_REDIRECT_URI>"]
  }
};

const scopes = ["https://www.googleapis.com/auth/plus.me"];

let oauth2Client = null;

function configure() {
  let keys = configuration.web;
  keys.client_id = keys.client_id.replace(
    "<CLIENT_ID>",
    process.env.GOOGLE_CLIENT_ID
  );
  keys.client_secret = process.env.GOOGLE_CLIENT_SECRET;
  keys.redirect_uris[0] = process.env.GOOGLE_REDIRECT_URI;

  oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
  );

  google.options({ auth: oauth2Client });
}

function authenticate(_token) {
  let deferred = Q.defer();
  oauth2Client.getToken(_token).then(googleToken => {
    oauth2Client.credentials = googleToken.tokens;
    deferred.resolve(oauth2Client);
  });
  return deferred.promise;
}

async function getOauthUrl() {
  return new Promise((resolve, reject) => {
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes.join(" ")
    });
    var url = {};
    url.url = authorizeUrl;
    resolve(url);
  });
}

function googleAuth(code) {
  let deferred = Q.defer();
  authenticate(code)
    .then(client => {
      plus.people.get({ userId: "me" }).then(res => deferred.resolve(res.data));
    })
    .catch(console.error);
  return deferred.promise;
}

module.exports = {
  getOauthUrl,
  configure,
  googleAuth
};
