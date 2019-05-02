import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuestionList from './components/QuestionList';
import QuestionDetails from './components/QuestionDetails';
import AddQuestion from './components/AddQuestion';

import url from './constants/url';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path={url.addQuestion} component={AddQuestion}/>
        <Route path={`${url.questions}/:id`} component={QuestionDetails} />
        <Route path="/:page" component={QuestionList} exact />
      </Router>
    </div>
  );
}

export default App;
