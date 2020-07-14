import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './scenes/Home';
import SurveyAdmin from './scenes/SurveyAdmin';
import SurveyResults from './scenes/SurveyResults';
import Survey from './scenes/Survey';
import Register from './scenes/Register';
import Header from './components/Header';
import { HOME_PATH, SURVEYS_PATH, REGISTER_PATH } from './constants';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons: Creator: Bilel Djettaou https://www.iconfinder.com/WTicon

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path={`${SURVEYS_PATH}/:id/edit`} component={SurveyAdmin} />
      <Route path={`${SURVEYS_PATH}/:id/results/:answerId`} component={Survey} />
      <Route path={`${SURVEYS_PATH}/:id/results`} component={SurveyResults} />
      <Route path={`${SURVEYS_PATH}/:id`} component={Survey} />
      <Route path={REGISTER_PATH} component={Register} />
      <Route exact path={SURVEYS_PATH} component={SurveyAdmin} />
      <Route exact path={HOME_PATH} component={Home} />
      <Redirect to={HOME_PATH} />
    </Switch>
    <ToastContainer />
  </>
);

export default App;
