// questions.js - Controls routes for question part of API

var Question = require("../models/question.js");
var User = require("../models/user.js");
var Alum = require("../models/alum.js");

var sanitize = require('mongo-sanitize');


module.exports = function(API, app) {
  app.post(API + "/ask", (req, res) => {

    if (req.user !== undefined) {

      User.findOne({email: req.user.email}, function(err, u) {
        if (!u) {
          res.status(400).send("No user matching reqs. Though you are a l33t haxorz for figuring out our server secret");
          return;
        }

        new Question({
          isPublic: true,
          questionTitle: req.body.title,
          questionBody: req.body.body,
          author: u.id,
          answers: [],
          date: new Date()
        }).save(function(err, savedQ) {
          u.qIDs.push(savedQ.id);

          var sendgrid = require("sendgrid")("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");

          Alum.find({}, function(err, alumni) {
            for (var i in alumni) {
              var alum = alumni[i];

              var email = new sendgrid.Email({
              	to: alum.email,
              	toname: alum.fName + " " + alum.lName,
              	from: "mailer@broncosconnect.org",
              	fromname: "BroncosConnect",
              	subject: req.body.title,
              	text: req.body.body
              });

              sendgrid.send(email);

            }
            res.status(200).send("Success!");
          });

        });

      });

    } else {
      res.status(403).send("not auth token provided");
      return;
    }

  });
};
