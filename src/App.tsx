import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BookList from './containers/BookList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BookList} />
        <BookList/>
      </Switch>
    </Router>
  );
};

export default App;
