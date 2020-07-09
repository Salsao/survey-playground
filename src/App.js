import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './scenes/Home';
import Survey from './scenes/Survey';
import Header from './components/Header';
import { HOME_PATH, SURVEYS_PATH } from './constants';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons: Creator: Bilel Djettaou https://www.iconfinder.com/WTicon

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path={SURVEYS_PATH} component={Survey} />
      <Route exact path={HOME_PATH} component={Home} />
      <Redirect to={HOME_PATH} />
    </Switch>
    <ToastContainer />
  </>
);

export default App;
