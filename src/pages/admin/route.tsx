import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BusinessLine from './business-line/index';
import PeopleManage from './people-manage/index';
import ModelManage from './model-manage/index';

export const Router = () => (
  <>
    <Switch>
      <Redirect exact from="/admin" to="/admin/business-line" />
    </Switch>
    <Route exact strict path="/admin/business-line" component={BusinessLine} />
    <Route exact strict path="/admin/people-manage" component={PeopleManage} />
    <Route exact strict path="/admin/model-manage" component={ModelManage} />
  </>
);

export default Router;
