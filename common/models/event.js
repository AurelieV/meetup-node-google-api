var calendar = require('../../server/services/serverAuthCalendarService.js');
var moment = require('moment');

module.exports = function(Event) {
  Event.beforeRemote('create', function(ctx, event, next) {
    var body = ctx.req.body;
    var date = moment(body.date).format('YYYY-MM-DD');
    calendar.events.insert({
        calendarId: 'p5cg5s4qnfelvk9r0hkil8q7p0@group.calendar.google.com',
        resource: {
          summary: body.title,
          end: {
            date: date
          },
          start: {
            date: date
          }
        }
      }, function (err, googleEvent) {
        body.googleId = googleEvent.id;
        next();
    });
  });
};
