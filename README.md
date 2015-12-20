# Meetup Node - Google API
/!\ This is a demo project. There is no error handler, and client code is minimal.

## Files
* This project has a server part generated by [LoopBack](http://loopback.io), to easily expose an API for demonstration purpose.
* The client is a little angular app, also for demo (vendors are "hard" imported in order to not use build tasks)
* The interesting part of this project, is the google service, in particular these files
  * `common/models/event.js` and `server/services/serverAuthCalendarService.js` for server side authentication
  * `common/models/google-account.js` and `server/services/clientAuthCalendarService.js` for client side authentication

## Complete google authentification information
* Go to [Google Dev Console](https://console.developers.google.com/flows/enableapi?apiid=admin&credential=client_key)
* Choose or create a project
* Go to `Identifiants` page.
* Create a new account key service and download a .json file
* Put it on `server/data` and name it `service-account-key.json`
* Create an OAuth Key
* Create a file `server/data/oauth-key.json` with keys `client_id` and `client_secret`
* Don't forget to activate the Google API you want to use in the Google Developers Console (for this repo, Google Calendar)

## Launch the project
* `npm install`
* `node server/server.js` to start the API
* Go to localhost:3000

