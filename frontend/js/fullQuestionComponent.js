let React = require("react");

// QuestionObject - ReactJS encapsulation of the HTML features associated
//  with a question being displayed on the page.


class FullQuestionObject extends React.Component {

  // render: returns the pseudo-HTML of a question.
  render() {
    function dateFormat(ds) {
      var d = new Date(ds);
      return `${ d.getMonth() + 1 }/${ d.getDate() }/${ d.getFullYear() }`;
    }
    if (!this.props.questionData) {
      return null;
    }
    var bestAnswer = null;
    for (let answer of this.props.questionData.answers) {
      if (bestAnswer === null || bestAnswer.date < answer.date) {
        bestAnswer = answer;
      }
    }

    var questionElems = this.props.questionData.answers.map(answer => {
      return (
        <div className="questionAnswer">
          <h5 className="questionSpec">Answered by { answer.author } on { dateFormat(answer.date) } </h5>
          <div className="questionContent">{ answer.answerBody.split("\n").map(line => (<div>{line}</div>)) }</div>
        </div>
      );
    });
    return (

      <div className="questionContainer">
        <h3 className="questionHeader"><a href={"/question?id=" + this.props.questionData.qId} target="_blank">{ this.props.questionData.questionTitle }</a></h3>
        <h5 className="questionSpec">Asked by { this.props.questionData.author } on { dateFormat(this.props.questionData.date) } </h5>
        { questionElems }
      </div>
    );
  }
}

// Export the QuestionList and QuestionObject classes so that the main js file can access them.
module.exports = {
  FullQuestionObject: FullQuestionObject,
};
