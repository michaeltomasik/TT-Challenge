import React from 'react'
import moment from 'moment';
import url from '../../constants/url';

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
    const currentPage = this.props.page || 1;
    const getQuestionsPageUrl = `${url.questionsUrl}/questions?page=${currentPage}`;
    
    fetch(getQuestionsPageUrl)
      .then(res => res.json())
      .then(data => this.setState({ questionList: data }))
      .catch(() => {
        this.setState({ error: true, });
      });
  }

  handleOnClick(url) {
    this.props.history.push(url);
  }

  render() {
    console.log(this.props);
    const { questionList } = this.state;

    return (
      <div className="QuestionList">
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
    );
  }
}

export default QuestionList;
