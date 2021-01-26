// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Returns timestamp
app.get("/api/timestamp/:date", function(req, res) {
// instantiate date using either unix or 12-3-2000 format
let date;
if(isNaN(req.params.date)) {
  date = new Date(req.params.date);
} else {
  date = new Date(req.params.date * 1000);
}

let message;
//if date is not valid, print error message
if(isNaN(date.getTime())) {
  message = {error: "Invalid Date"}
} else {
  message = {unix: date.getTime(), utc: date.toUTCString()};
}
res.send(message);
});

// Returns a timestamp for the current time
app.get("/api/timestamp", function(req, res) {
  let date = new Date();
  let message = {unix: date.getTime(), utc: date.toUTCString()};
  res.send(message);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
