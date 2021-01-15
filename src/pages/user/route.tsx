import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './home/index';
import BugList from './buglist/index';
import Demand from './demand/index';
export default function Router() {
  return (
    <>
      <Switch>
        <Redirect exact from="/user" to="/user/home" />
      </Switch>
      <Route exact strict path="/user/home" component={Home} />
      <Route exact strict path="/user/buglist" component={BugList} />
      <Route exact strict path="/user/demand-list" component={Demand} />
    </>
  );
}
