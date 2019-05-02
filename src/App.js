import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuestionList from './components/QuestionList';
import QuestionDetails from './components/QuestionDetails';

function App() {
  return (
    <Router>
      <Route path="/question/:id" component={QuestionDetails} />
      <Route path="/" component={QuestionList} exact />
    </Router>
  );
}

export default App;