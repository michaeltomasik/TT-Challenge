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

  saveAnswer() {
    const saveQuestionUrl = `${url.questionsUrl}${this.state.selectedChoice.url}`

    fetch(saveQuestionUrl, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.url === this.state.selectedChoice.url) {
          this.props.history.push('/1');
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const { choices, question } = this.state;
    const allVotes = choices.reduce((a, b) => a + b.votes, 0);

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
                checked={this.state.selectedChoice.choice === answer.choice} 
                onChange={() => this.selectAnswer(answer)} />
            </span>
          </div>
        )}
        <input type="button" value="Vote" onClick={() => this.saveAnswer()} />
      </div>
    );
  }
}

export default QuestionDetails;
