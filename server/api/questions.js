// questions.js - Controls routes for question part of API

var QuestionObjs = require("../models/question.js"),
    Question = QuestionObjs.Question,
    Answer = QuestionObjs.Answer;

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
              	from: "mailer-" + savedQ.id + "@broncosconnect.org",
              	fromname: "BroncosConnect",
              	subject: req.body.title,
              	text: req.body.body,
                html: req.body.body.replace(/\n/g, "<br/>")
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

  app.post('/api/email/parse', function (req, res) {
    var emailRegex = /[\s\S]+<([^@\(\)\[\]\"\:\;\\\?<>\,]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+)>|([^@\(\)\[\]\"\:\;\\\?<>\,]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+)/;

    var fromMatch = req.body.from.match(emailRegex);
    var from = formMatch[1] || fromMatch[2];
    var qId = req.body.to.match(/mailer-(.+)@broncosconnect\.org/i)[1];
    var text = req.body.text;

    function parseEmail(text) {
      var HDR1_REGEX = /(?!On[\s\S]*On\s[\s\S]+?wrote:)(On\s([\s\S]+?)wrote:)[\s\S]*$/m;
      var HDR2_REGEX = /From: BroncosConnect[\s\S]*$/m;
      var otext = text.replace(HDR1_REGEX, "").replace(HDR2_REGEX, "").replace(/(^\s+|\s+$)/g, "");
      return otext;
    }

    var responseText = parseEmail(text);

    Alum.findOne({email: from}, function(err, alum) {
      if (err) {
        console.log(err);
        return;
      }
      if (alum) {
        Question.findById(qId, function(err, q) {
          if (err) {
            console.log(err);
            return;
          }
          if (!q) {
            console.log("No question object found w/ given ID");
            return;
          }
          q.answers.push(new Answer({
            answerBody: responseText,
            author: alum.fName + " " + alum.lName,
            date: new Date()
          }));
        });
      } else {
        console.log("Weird sender: " + from);
      }

    });

    res.status(200).send();
  });
};
