import { all, fork } from 'redux-saga/effects';
import watchAnswer from './answer';
import watchSurvey from './survey';
import watchUser from './user';

export default function*() {
  yield all([fork(watchAnswer), fork(watchSurvey), fork(watchUser)]);
}
