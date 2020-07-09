import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './scenes/Home';
import Header from './components/Header';
import { HOME_PATH } from './constants';
import './App.css';

// Icons: Creator: Bilel Djettaou https://www.iconfinder.com/WTicon

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path={HOME_PATH} component={Home} />
      <Redirect to={HOME_PATH} />
    </Switch>
  </>
);

export default App;
