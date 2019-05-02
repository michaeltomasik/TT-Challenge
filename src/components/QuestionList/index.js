import React from 'react';
import url from '../../constants/url'

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false;
    }
  }

  componentDidMount() {
    const currentPage = this.props.page || 1;
    const getQuestionsPageUrl = `${url.questionsUrl}/questions?page=${currentPage}`;
    
    fetch(getQuestionsPageUrl)
      .then(res => res.json())
      .then(data => this.setState({ ...data }))
      .catch(() => {
        this.setState({ error: true, });
      });
  }

  render() {
    return (
      <div className="QuestionList">QuestionList</div>
    );
  }
}

export default QuestionList;
