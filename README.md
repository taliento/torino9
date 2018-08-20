# Torino9app

scout sites


[![Build Status](https://travis-ci.org/taliento/torino9.svg?branch=master)](https://travis-ci.org/taliento/torino9)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## TEST

mocha tests and karma tests

```
npm install
npm start
npm test
```

## DEV

you need an .env file with this params
```
{
  "SECRET": "<SECRET>",
  "MONGODB_URI": "<MONGODB_URI>",
  "PORT": "<PORT>",
  "WEB_CONCURRENCY": <WEB_CONCURRENCY>,
  "IMGUR_USERNAME": "<IMGUR_USERNAME>",
  "IMGUR_PASSWORD": "<IMGUR_PASSWORD>",
  "IMGUR_CLIENTID": "<IMGUR_CLIENTID>"
}

you need an oauth2.keys.json file for googleapis

{
  "web": {
    "client_id": "XXXXX.apps.googleusercontent.com",
    "project_id": "XXXXX",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "XXXX",
    "redirect_uris": [
      "https://XXXX.ngrok.io"
    ]
  }
}


```

to run

```
npm install
npm start
ng serve
```
