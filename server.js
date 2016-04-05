//importing modules and setting port ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

const PORT = 8000;

//configuration ===========================================================================================
//our db
// var db = require('./config.js');
//once we have a db we can connect to we put that here..
mongoose.connect('mongodb://localhost/bhssrc');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure the request handler to automatically deal with JWT tokens, which are used for authentication
app.use(expressJWT({ secret: "5o0pers3ecr3tl33t", credentialsRequired: false}).unless({ path: ['/login'] }));


app.use('/static/js', express.static("./frontend/dist/"));
app.use('/static/js', express.static("./frontend/static/"));
app.use('/static/css', express.static("./frontend/css/"));
//routes ==================================================================================================
//we should move this to a different frontend file so we avoid having backend and frontend in the same file
//replace with a reference to a file called "routes" and pass in our app
//then we can use: require('/routes')(app);
app.get('/', (req, res) => {
    if (req.user) {
      res.sendFile("private.html", {
          root: "./frontend"
      });
    } else {
      res.sendFile("public.html", {
          root: "./frontend"
      });
    }
});

app.post('/login', (req, res) => {
  if (!req.body.email) {
    res.status(400).send("email required");
    return;
  }
  if (!req.body.password) {
    res.status(400).send("password required");
    return;
  }

  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.status(400).send("unregistered email");
      return;
    }
    user.comparePassword(req.body.password, function(err, res) {
      if (err) {
        console.error("password matching error: ", err);
        return;
      }
      if (res) {
        var token = jwt.sign({email: user.email}, "5o0pers3ecr3tl33t");
        res.status(200).json(token);
      } else {
        res.status(400).send("negative password match");
      }
    });
  });

});

//start the app ===========================================================================================
app.listen(PORT, () => {
    console.log(`im listening on port:  ${ PORT }`);
});
