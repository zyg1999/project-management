import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './home/index';
import BugList from './buglist/index';
import Demand from './demand/index';
import DataAnalysis from './data-analysis/index';
import CreateDemand from './create-demand/index';
export const Router = () => (
  <>
    <Switch>
      <Redirect exact from="/user" to="/user/home" />
    </Switch>
    <Route exact strict path="/user/home" component={Home} />
    <Route exact strict path="/user/buglist" component={BugList} />
    <Route exact strict path="/user/demand-list" component={Demand} />
    <Route exact strict path="/user/data-analysis" component={DataAnalysis} />
    <Route exact strict path="/user/create-demand" component={CreateDemand} />
  </>
);
export default Router;
