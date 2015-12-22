var calendar = require('../../server/services/serverAuthCalendarService.js');
var moment = require('moment');
var calendarId = require('../../server/data/ids.json').calendarId;

module.exports = function(Event) {
  Event.beforeRemote('create', function(ctx, event, next) {
    var body = ctx.req.body;
    var date = moment(body.date).format('YYYY-MM-DD');
    var options = {
      calendarId: calendarId,
      resource: {
        summary: body.title,
        end: {date: date},
        start: {date: date}
      }
    };
    calendar.events.insert(options, function (err, googleEvent) {
      body.googleId = googleEvent.id;
      next();
    });
  });
};
