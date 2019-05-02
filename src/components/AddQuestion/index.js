import React from 'react';
import { saveQuestion } from '../../utils/api/pollsAPI';


class AddQuestion extends React.Component {
  constructor() {
    super();

    this.state = {
      page: '',
      name: '',
      answers: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    const formatedObj = {
      "question": this.state.name,
      "choices": this.state.answers.split(','),
    };

    saveQuestion(formatedObj, this.state.page).then((res) => {
      if(res.success) this.props.history.push(`/${res.page}`);
    });
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="AddQuestion">
        <h1>Add Question</h1>
        <div>
          <p>Name:</p> <input type="text" name="name" value={this.state.name} onChange={this.handleOnChange}/>
        </div>
        <div>
          <br/>
          <b>Please specify answers separeted by comma ex. book, bottle, plate</b>
          <p>Answers:</p> <textarea name="answers" rows = "5" cols = "60" value={this.state.answers} onChange={this.handleOnChange}/>
        </div>
        <div>
          <p>Page:</p> <input name="page" type="text" value={this.state.page} onChange={this.handleOnChange}/>
        </div>
        <input type="button" onClick={this.save} value="Save"/>

      </div>
    );
  }
}

export default AddQuestion;
