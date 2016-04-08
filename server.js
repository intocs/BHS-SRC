//importing modules and setting port ======================================================================
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var expressJwt = require('express-jwt'); //JWT's
var config = require('config.json'); //db config
var router = express.Router(); //router
var session = require('express-session'); //uses sessions to keep track of users

const PORT = 8000;

//configuration ===========================================================================================
//our db
var db = require('./config.json');
//once we have a db we can connect to we put that here..
mongoose.connect('mongodb://localhost/bhssrc.. whatever we want to call it');
//set our view engine to EJS - node looks for EJS files
app.set('view engine', 'ejs');
//look in views
app.set('views', __dirname + '/views');
// get all data/stuff of the body (POST) parameters. this is all configuring body parser
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json6

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

//routes ==================================================================================================
//we should move this to a different frontend file so we avoid having backend and frontend in the same file
//replace with a reference to a file called "routes" and pass in our app
//then we can use: require('/routes')(app);

app.use('/api/users', require('./controllers/api/UsersController'));
//initial starting point in some funky syntax (thank you Chris)
app.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: "./frontend"
    });
});
/// catch 404 and forwarding to error handler ============================================================
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//start the app ===========================================================================================
app.listen(PORT, () => {
    console.log(`im listening on port:  ${ PORT }`);
});
