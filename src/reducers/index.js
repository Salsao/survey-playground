import { combineReducers } from 'redux';
import user from './user';
import survey from './survey';

const reducers = combineReducers({
  user,
  survey,
});

export default reducers;
