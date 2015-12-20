var clientAuthService = require('../../server/services/clientAuthCalendarService.js');

var calendar = clientAuthService.service;
var urlAuth  = clientAuthService.url;

module.exports = function(GoogleAccount) {
  GoogleAccount.getUrl = function(next) {
    next(null, urlAuth);
  };

  GoogleAccount.loadCalendars = function(code, next) {
    var oAuth = calendar._options.auth;
    oAuth.getToken(code, function(err, tokens) {
      if (err) next(err);
      oAuth.setCredentials(tokens);
      calendar.calendarList.list({}, function(err, data){
        next(err, data.items);
      });
    });
  };

  GoogleAccount.remoteMethod('getUrl', {
    accepts: [],
    returns: {
      arg: 'url',
      type: 'string'
    },
    http: {
      path: '/auth-url',
      verb: 'get'
    }
  });

  GoogleAccount.remoteMethod('loadCalendars', {
    accepts:{
      arg: 'code',
      type: 'string',
      required: true
    },
    returns: {
      arg: 'calendars',
      type: '[object]'
    },
    http: {
      path: '/load-calendars',
      verb: 'get'
    }
  });
};
