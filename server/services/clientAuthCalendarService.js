var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauthConfig = require('../data/oauth.json');
var oauth2Client = new OAuth2(oauthConfig.client_id, oauthConfig.client_secret, 'http://localhost:3000');

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar']
});

module.exports = {
  url: url,
  service: google.calendar({version: 'v3', auth: oauth2Client})
};

