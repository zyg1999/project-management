import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Admin from '../pages/admin/index';

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/userlogin" />
        <Route exact path="/" component={Login} />
        <Route exact path="/userlogin" component={Login} />
        <Route path="/user" render={() => <User />} />
        <Route path="/admin" render={() => <Admin />} />
      </Switch>
    </Router>
  );
}
