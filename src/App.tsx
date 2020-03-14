import React from 'react';
import './App.css';
import BookList from './containers/BookList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BookList} />
        <BookList></BookList>
      </Switch>
    </Router>
  );
};

export default App;
