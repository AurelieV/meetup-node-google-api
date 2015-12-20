var app = angular.module('app', ['lbServices']);

app.config(function($locationProvider){
  $locationProvider.html5Mode(true);
});

app.controller('mainController', function(Event, GoogleAccount, $location, $scope) {
  var ctrl = this;

  // -- Server side auth --
  this.events = Event.find();
  this.createEvent = function(event) {
    Event.create(event, function(eventCreated){
      ctrl.events.push(eventCreated);
    })
  };

  // -- Client side auth --
  this.accounts = GoogleAccount.find();

  GoogleAccount.getUrl(function(data){
    ctrl.authUrl = data.url;
  });

  // Handle return from Google
  var code = $location.search().code;
  if (code) {
    GoogleAccount.loadCalendars({code: code}, function(data) {
      ctrl.calendars = data.calendars
    })
  }
});
