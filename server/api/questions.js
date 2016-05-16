// questions.js - Controls routes for question part of API

var QuestionObjs = require("../models/question.js"),
    Question = QuestionObjs.Question,
    Answer = QuestionObjs.Answer;

var User = require("../models/user.js");
var Alum = require("../models/alum.js");

var sanitize = require('mongo-sanitize');

var sendgrid = require("sendgrid")("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");


module.exports = function(API, app) {
  app.post(API + "/retrieveByEmail", (req, res) => {
    if (!req.user) {
      res.status(400).send("No authentication");
      return;
    }
    if (req.body.email !== undefined) {
      User.findOne({email: req.body.email}, function(err, u) {
        if (!u) {
          res.status(400).send("No user matching reqs. Though you are a l33t haxorz for figuring out our server secret");
          return;
        }

        Question.find({"_id": { $in: u.qIDs}, "isPublic": true}, function(err, qs) {
            res.status(200).send(JSON.stringify(
                qs.map((m) => ({
                    questionTitle: (m.questionTitle),
                    questionBody: (m.questionBody),
                    author: u.fName + " " + u.lName,
                    qId: (m._id.toString()),
                    answers: m.answers.map((a) => ({
                        answerBody: a.answerBody,
                        author: a.author,
                        date: a.date
                    })),
                    date: m.date
                }))
            ));
        });
      });
    }
  });

  app.post(API + "/retrieveByNumber", (req, res) => {
    if (!req.user) {
      res.status(400).send("No authentication");
      return;
    }
    if (req.body.number !== undefined) {
      var query = [];
      if (req.body.query) {
        query = req.body.query;
      }
      var qBody = {$and: query.map(function(q) {
        return {"questionTitle": new RegExp(q, "gi")};
      }), $where: "this.answers.length > 0"};

      console.log(qBody.$and.length > 0 ? qBody : {});

      Question.find(qBody.$and.length > 0 ? qBody : {$where: "this.answers.length > 0"}).limit(parseInt(req.body.number)).sort({date: -1}).exec(function(err, qs) {
        if (err) {
          console.log(err);
          return;
        }
        if (!qs || qs.length < 1) {
          res.status(400).send("no answers");
          return;
        }

        var questionDataList = [];

        qs.map(function(q) {
          User.findById(q.author, function(err, u) {
            questionDataList.push({
                questionTitle: (q.questionTitle),
                questionBody: (q.questionBody),
                author: u.fName + " " + u.lName,
                qId: (q._id.toString()),
                answers: q.answers.map((a) => ({
                    answerBody: a.answerBody,
                    author: a.author,
                    date: a.date
                })),
                date: q.date
            });

            if (questionDataList.length >= qs.length) {
              res.status(200).send(JSON.stringify(questionDataList));
            }
          });
        });


      });

    } else {
      res.status(400).send("no number");
      return;
    }
  });

  app.post(API + "/retrieveById", (req, res) => {
    if (!req.user) {
      res.status(400).send("No authentication");
      return;
    }
    if (req.body.id !== undefined) {
      Question.findById(req.body.id, function(err, q) {
        if (err) {
          console.log(err);
          return;
        }
        if (!q) {
          res.status(400).send("no answers");
          return;
        }

        User.findById(q.author, function(err, u) {
          res.status(200).send({
              questionTitle: (q.questionTitle),
              questionBody: (q.questionBody),
              author: u.fName + " " + u.lName,
              qId: (q._id.toString()),
              answers: q.answers.map((a) => ({
                  answerBody: a.answerBody,
                  author: a.author,
                  date: a.date
              })),
              date: q.date
          });
        });


      });

    } else {
      res.status(400).send("no number");
      return;
    }
  });

  app.post(API + "/ask", (req, res) => {

    if (req.user !== undefined) {

      User.findOne({email: req.user.email}, function(err, u) {
        if (!u) {
          res.status(400).send("No user matching reqs. Though you are a l33t haxorz for figuring out our server secret");
          return;
        }

        var sentBody = req.body.title + "\n----------\n" + req.body.body;

        new Question({
          isPublic: true,
          questionTitle: req.body.title,
          questionBody: sentBody,
          author: u.id,
          answers: [],
          date: new Date()
        }).save(function(err, savedQ) {
          u.update({$push: {qIDs: savedQ.id}}, function(err) {
            if (err) console.log(err);
          });


          Alum.find({}, function(err, alumni) {
            for (var i in alumni) {
              var alum = alumni[i];

              var email = new sendgrid.Email({
              	to: alum.email,
              	toname: alum.fName + " " + alum.lName,
              	from: "mailer-" + savedQ.id + "@broncosconnect.org",
              	fromname: "BroncosConnect",
              	subject: req.body.title,
              	text: sentBody,
                html: sentBody.replace(/\n/g, "<br/>")
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

  app.post('/api/email/parse', (req, res) => {
    var emailRegex = /[\s\S]+<([^@\(\)\[\]\"\:\;\\\?<>\,]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+)>|([^@\(\)\[\]\"\:\;\\\?<>\,]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+)/;

    var fromMatch = req.body.from.match(emailRegex);
    var from = fromMatch[1] || fromMatch[2];
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
        var newAnswerObject = {
          answerBody: responseText,
          author: alum.fName + " " + alum.lName,
          date: new Date()
        };
        Question.update({"_id": qId}, {$push: {'answers': newAnswerObject}}, function(err) {
          if (err) {
            console.log(err);
            return;
          }



          Question.findById({"_id": qId}, function(err, q) {
            if (err) {
              console.log(err);
              return;
            }

            User.findById({"_id": q.author}, function(err, u) {
              if (err) {
                console.log(err);
                return;
              }

              var respBody = "Your Question: " + q.questionBody + "\n";
              respBody += "Answered by " + alum.fName + " " + alum.lName + "\n";
              respBody += "Response body:\n" + responseText;

              var email = new sendgrid.Email({
                to: u.email,
                toname: u.fName + " " + u.lName,
                from: "mailer@broncosconnect.org",
                fromname: "BroncosConnect",
                subject: "Response to your question: '" + q.questionTitle + "'",
                text: respBody,
                html: respBody.replace(/\n/g, "<br/>")
              });

              sendgrid.send(email);
            });
          });




        });
      } else {
        console.log("Weird sender: " + from);
      }

    });

    res.status(200).send();
  });



};
