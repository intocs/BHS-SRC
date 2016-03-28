let React = require("react"), ReactDOM = require("react-dom");

let QuestionObject = React.createClass({
  // QuestionObject - ReactJS encapsulation of the HTML features associated
  //  with a question being displayed on the page.

  // render: returns the pseudo-HTML of a question.
  render: function() {

    // N.B. "className" is used to refer to the "class" of an HTML tag.
    //  Because "class" is a reserved keyword in JS, ReactJS uses "className" instead.
    return (
      <div className="questionContainer">
        <h3 className="questionHeader">{ this.props.questionData.question }</h3>
        <h5 className="questionSpec">Answered by { this.props.questionData.responder }, { this.props.questionData.responderCredentials } | Asked by { this.props.questionData.asker }</h5>
        <div className="questionContent">{ this.props.questionData.answer }</div>
      </div>
    );
  }
});

let QuestionList = React.createClass({
  // QuestionList - ReactJS encapsulation of the HTML features associated
  //  with a list of questions being displayed on the page.

  // render: returns the pseudo-HTML of a list of questions.

  render: function() {

    // Maps each element of "data" (which is a js object containing info abt
    //  a comment) to a ReactJS class instance of the QuestionObject class.
    //  each QuestionObject is a "data" value in accordance with whichever
    //  comment object is is from.
    let questionNodes = this.props.questionDataList.map( questionData => (<QuestionObject questionData={questionData} />) );

    // (I like arrow functions. So sue me.)

    // Return a simple div containing the question nodes
    return (
      <div className="questionListContainer">
        { questionNodes }
      </div>
    );
  }
});

// Export the QuestionList and QuestionObject classes so that the main js file can access them.
module.exports = {
  QuestionObject: QuestionObject,
  QuestionList: QuestionList
};
