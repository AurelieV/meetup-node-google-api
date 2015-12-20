var app = angular.module('app', ['lbServices']);

app.config(function($locationProvider){
  $locationProvider.html5Mode(true);
});

app.controller('mainController', function(Event, GoogleAccount, $location, $scope) {
  // -- Server side auth --
  this.events = Event.find();
  this.createEvent = function(event) {
    Event.create(event, function(eventCreated){
      this.events.push(eventCreated);
    }.bind(this))
  };

  // -- Client side auth --
  this.accounts = GoogleAccount.find();

  GoogleAccount.getUrl(function(data){
    this.authUrl = data.url;
  }.bind(this));

  // Handle return from Google
  var code = $location.search().code;
  if (code) {
    GoogleAccount.loadCalendars({code: code}, function(data) {
      this.calendars = data.calendars
    }.bind(this))
  }
});
