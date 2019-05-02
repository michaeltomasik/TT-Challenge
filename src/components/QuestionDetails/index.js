import React from 'react';
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
    const id = this.props.id || 1;
    const getQuestionsPageUrl = `${url.questionsUrl}/questions/${id}`;
    
    fetch(getQuestionsPageUrl)
      .then(res => res.json())
      .then(data => this.setState({ ...data }))
      .catch(() => {
        this.setState({ error: true });
      });
  }

  selectAnswer(selected) {
    this.setState({ selectedChoice: selected });
  }

  render() {
    const { choices, question } = this.state;
    const allVotes = choices.reduce((a, b) => a + b.votes, 0);
    console.log(this.state);
    return (
      <div className="QuestionDetails">
        <h1>Question Details</h1>
        <h2>Question: {question}</h2>
        {choices.map((answer, key) =>
          <div className="QuestionDetails-row" key={`answer-${key}`}>
            <span>{answer.choice}</span>
            <span>{answer.votes}</span>
            <span>{(answer.votes/allVotes)*100}%</span>
            <span>
              <input
                type="radio"
                value={answer.choice}
                checked={this.state.selectedChoice === answer.choice} 
                onChange={() => this.selectAnswer(answer.choice)} />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionDetails;
