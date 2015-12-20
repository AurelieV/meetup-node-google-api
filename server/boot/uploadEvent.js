module.exports = function uploadEvent(server, next) {
  var calendar = require('../../server/services/serverAuthCalendarService.js');
  var _ = require('lodash');
  var Event = server.models.Event;
  calendar.events.list({
    calendarId: 'p5cg5s4qnfelvk9r0hkil8q7p0@group.calendar.google.com'
  }
  , function(err, data) {
      console.log('err', err);
      console.log('data', data);
      var events = _.map(data.items, function(item) {
        return {
          title: item.summary || 'Pas de titre',
          date: new Date(item.start.date),
          googleId: item.id
        }
      });
      Event.create(events, next)
    })
};
