import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Admin from '../pages/admin/index';

const history = createBrowserHistory();

export default function Routers() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/user" render={() => <User />} />
        <Route path="/admin" render={() => <Admin />} />
      </Switch>
    </Router>
  );
}
