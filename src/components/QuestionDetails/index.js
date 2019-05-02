import React from 'react';
import { saveAnswer, getQuestion } from '../../utils/api/pollsAPI';

import './questionDetails.css';
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
        <table className="QuestionDetails-table" >
          {choices.map((answer, key) =>
            <tr key={`answer-${key}`}>
              <td>{answer.choice}</td>
              <td>{answer.votes}</td>
              <td>{Math.floor((answer.votes/allVotes)*100)}%</td>
              <td>
                <input
                  className="QuestionDetails-button"
                  type="radio"
                  value={answer.choice}
                  checked={this.state.selectedChoice.choice === answer.choice} 
                  onChange={() => this.selectAnswer(answer)} />
              </td>
            </tr>
          )}
        </table>
        <input
          className="QuestionDetails-button"
          disabled={selectedChoice === ''}
          type="button"
          value="Save Vote"
          onClick={() => this.save()} />
      </div>
    );
  }
}

export default QuestionDetails;
