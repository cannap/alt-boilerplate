import React from 'react';
import {Route, NotFoundRoute, DefaultRoute} from 'react-router';

export default (
  <Route handler={require('./components/app')}>
    <DefaultRoute name='root' handler={require('./components/home/home')}/>
    <NotFoundRoute handler={require('./pages/not-found')} />
  </Route>
);
