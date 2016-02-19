//importing modules and setting port ======================================================================
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

const PORT = 8000;

//configuration ===========================================================================================
//our db
var db = require('./config.js');
//once we have a db we can connect to we put that here..
mongoose.connect('mongodb://localhost/bhssrc.. whatever we want to call it');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes ==================================================================================================
//we should move this to a different frontend file so we avoid having backend and frontend in the same file
//replace with a reference to a file called "routes" and pass in our app
//then we can use: require('/routes')(app);
app.get('/', (req, res) => {
    res.sendFile("index.html", {
        root: "./frontend"
    });
});

//start the app ===========================================================================================
app.listen(PORT, () => {
    console.log(`im listening on port:  ${ PORT }`);
});
