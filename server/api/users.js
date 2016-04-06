
var User = require("../models/user.js");

var jwt = require('jsonwebtoken');


module.exports = function(API, app) {
  app.post(API + '/login', (req, res) => {

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
      user.comparePassword(req.body.password, function(err, compRes) {
        if (err) {
          console.error("password matching error: ", err);
          return;
        }
        if (compRes) {
          var token = jwt.sign({email: user.email}, "5o0pers3ecr3tl33t");
          res.status(200).json(token);
        } else {
          res.status(400).send("negative password match");
        }
      });
    });

  });
};
