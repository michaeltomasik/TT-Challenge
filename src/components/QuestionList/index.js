import React from 'react'
import moment from 'moment';
import { getQuestionsPage } from '../../utils/api/pollsAPI';

import './questionList.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      questionList: [],
    }
  }

  componentDidMount() {
    getQuestionsPage(this.props.page)
      .then(res => this.setState({ questionList: res.data }))
  }

  handleOnClick(url) {
    this.props.history.push(url);
  }

  render() {
    const { questionList } = this.state;

    return (
      <div className="QuestionList">
        <h1>Questions</h1>
        <div className="QuestionList-list">
          {questionList.map((question, key) => (
            <div key={`question=${key}`} className="QuestionList-question"
              onClick={() => { 
                this.handleOnClick(question.url);
              }}>
              <h1>{question.question}</h1>
              <p>{moment(question.published_at).format("MMMD DD YY")}</p>
              <p>{question.choices.length}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default QuestionList;
