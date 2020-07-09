import { all, fork } from 'redux-saga/effects';
import watchUser from './user';

export default function* () {
  yield all([fork(watchUser)]);
}
