import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Admin from '../pages/admin/index';

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/user" render={() => <User />} />
        <Route path="/admin" render={() => <Admin />} />
      </Switch>
    </Router>
  );
}
