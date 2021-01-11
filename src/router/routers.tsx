import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../pages/Login/index';

const history = createBrowserHistory();

export default function Routers() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}
