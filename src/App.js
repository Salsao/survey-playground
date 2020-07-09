import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './scenes/Home';
import { HOME_PATH } from './constants';

const App = () => (
  <Switch>
    <Route exact path={HOME_PATH} component={Home} />
    <Redirect to={HOME_PATH} />
  </Switch>
);

export default App;
