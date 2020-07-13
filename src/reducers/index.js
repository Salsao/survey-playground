import { combineReducers } from 'redux';
import answer from './answer';
import user from './user';
import survey from './survey';

const reducers = combineReducers({
  answer,
  user,
  survey
});

export default reducers;
