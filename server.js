// server.js - the main server file. Run this when you want to do tests!

// Require the things
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var User = require('./server/models/user');

// Initialize the app
var app = express();

// set the port (for debugging and permissions purpose, avoid 80, the default port)
const PORT = 8080;

// Connect to the db
mongoose.connect('mongodb://localhost/bhssrc');

// Tell the Express app to use BodyParser, which allows for easy parsing of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use Multer, which can process multipart/form-data (which is what the SendGrid API uses)
app.use(multer({dest: "./uploads/"}).single("email"));

// Configure the request handler to automatically deal with JWT tokens, which are used for authentication
app.use(expressJWT({ secret: "5o0pers3ecr3tl33t", credentialsRequired: false}).unless({ path: ['/api'] }));

// Use some static files (js and css)
app.use('/static/js', express.static("./frontend/dist/"));
app.use('/static/js', express.static("./frontend/static/"));
app.use('/static/css', express.static("./frontend/css/"));

// Route for default page
//  TODO: move this to a different file or something.
app.get('/', (req, res) => {
  res.sendFile("mainPage.html", {
    root: "./frontend"
  });
});

// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.get('/ask', (req, res) => {
  res.sendFile("ask.html", {
    root: "./frontend"
  });
});

app.get('/addAlum', (req, res) => {
  res.sendFile("addAlumnus.html", {
    root: "./frontend"
  });
});

// All of the routes for the users API
require("./server/api/users")("/api/users", app);
require("./server/api/alumni")("/api/alumni", app);
require("./server/api/questions")("/api/questions", app);

app.post('/api/email/parse', function (req, res) {
  var from = req.body.from;
  var text = req.body.text;
  var subject = req.body.subject;
  function parseEmail(text) {
    var ID_REGEX = /\[ID=(\S+)\] DO NOT DELETE!/; //
    var id = text.match(ID_REGEX)[1];
    var HDR1_REGEX = /(?!On[\s\S]*On\s[\s\S]+?wrote:)(On\s([\s\S]+?)wrote:)[\s\S]*$/m;
    var HDR2_REGEX = /From: BroncosConnect[\s\S]*$/m;
    var otext = text.replace(HDR1_REGEX, "").replace(HDR2_REGEX, "").replace(/(^\s+|\s+$)/g, "");
    return otext;
  }

  res.status(200).send();
});

// Tell the Express App to start listening
app.listen(PORT, () => {
    console.log(`Listening on Port: ${ PORT }`);
});
