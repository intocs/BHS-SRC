let React = require("react");

// QuestionObject - ReactJS encapsulation of the HTML features associated
//  with a question being displayed on the page.


class QuestionObject extends React.Component {

  // render: returns the pseudo-HTML of a question.
  render() {
    function dateFormat(ds) {
      var d = new Date(ds);
      return `${ d.getMonth() + 1 }/${ d.getDate() }/${ d.getFullYear() }`;
    }
    var bestAnswer = null;
    for (let answer of this.props.questionData.answers) {
      if (bestAnswer === null || bestAnswer.date < answer.date) {
        bestAnswer = answer;
      }
    }
    return (
      <div className="questionContainer">
        <h3 className="questionHeader">{ this.props.questionData.questionTitle }</h3>
        <h5 className="questionSpec">Answered by { bestAnswer.author } on { dateFormat(bestAnswer.date) } | Asked by { this.props.questionData.author } on { dateFormat(this.props.questionData.date) } </h5>
        <div className="questionContent">{ bestAnswer.answerBody }</div>
      </div>
    );
  }
}

class QuestionList extends React.Component {
  render() {
    // Maps each element of "data" (which is a js object containing info abt
    //  a comment) to a ReactJS class instance of the QuestionObject class.
    //  each QuestionObject is a "data" value in accordance with whichever
    //  comment object is is from.
    let questionNodes = this.props.questionDataList.map( questionData => {
      if (questionData.answers.length > 0)
        return (<QuestionObject questionData={ questionData } />);
    } );

    // (I like arrow functions. So sue me.)

    // Return a simple div containing the question nodes
    return (
      <div className="questionListContainer">
        { questionNodes }
      </div>
    );
  }
}

// Export the QuestionList and QuestionObject classes so that the main js file can access them.
module.exports = {
  QuestionObject: QuestionObject,
  QuestionList: QuestionList
};
