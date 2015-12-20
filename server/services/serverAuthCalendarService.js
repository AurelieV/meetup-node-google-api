var google = require('googleapis');
var key = require('../data/service-account-key.json');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  null
);

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
  }
});

module.exports = google.calendar({version: 'v3', auth: jwtClient});

