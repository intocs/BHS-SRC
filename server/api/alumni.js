


var Alum = require("../models/alum.js");

var sanitize = require('mongo-sanitize');


module.exports = function(API, app) {
  app.post(API + "/register", (req, res) => {

    var fields = ["fName", "lName", "email"];

    var conditions = {
      "fName":   (s) => (s !== "" && sanitize(s) === s),
      "lName":   (s) => (s !== "" && sanitize(s) === s),
      "email":   (s) => (s !== "" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(s) && sanitize(s) === s)
    };

    // make sure that all of the fields were sent in some form to here
    for (var i in fields) {
      var f = fields[i];

      // Check that each field exists
      if (!req.body[f]) {
        res.status(400).send("missing " + f);
        return;
      }

      // Check that each field is valid
      if (!conditions[f](req.body[f])) {
        res.status(400).send("invalid " + f);
        return;
      }
    }

    if (Alum.find({email: req.body.email}).length() > 0) {
      res.status(400).send("duplicate email");
    }

    new Alum({
      "email": req.body.email,
      "fName": req.body.fName,
      "lName": req.body.lName
    }).save(function(err) {
      // If there was an error saving it...
      if (err) {
        console.error("saving error: ", err);
        res.status(400).send("entry saving error");
      } else {
        res.status(200).send("success");
      }
    });

  });
};
