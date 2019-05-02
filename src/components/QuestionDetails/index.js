import React from 'react';
import { saveAnswer, getQuestion } from '../../utils/api/pollsAPI';
import url from '../../constants/url'

import './questionDetails.css'
class QuestionDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      choices: [],
      selectedChoice: '',
    }
  }

  componentDidMount() {
    getQuestion(this.state.id).then(res => {
      this.setState({ ...res.data });
    });
  }

  selectAnswer(selected) {
    this.setState({ selectedChoice: selected });
  }

  save() {
    saveAnswer(this.state.selectedChoice).then((res) => {
      if(res.success) this.props.history.push('/1');
    });
  }

  render() {
    const { choices, question, selectedChoice } = this.state;
    const allVotes = choices.reduce((a, b) => a + b.votes, 0);

    return (
      <div className="QuestionDetails">
        <h1>Question Details</h1>
        <h2>Question: {question}</h2>
        {choices.map((answer, key) =>
          <div className="QuestionDetails-row" key={`answer-${key}`}>
            <span>{answer.choice}</span>
            <span>{answer.votes}</span>
            <span>{Math.floor((answer.votes/allVotes)*100)}%</span>
            <span>
              <input
                type="radio"
                value={answer.choice}
                checked={this.state.selectedChoice.choice === answer.choice} 
                onChange={() => this.selectAnswer(answer)} />
            </span>
          </div>
        )}
        <input disabled={selectedChoice === ''} type="button" value="Vote" onClick={() => this.save()} />
      </div>
    );
  }
}

export default QuestionDetails;
