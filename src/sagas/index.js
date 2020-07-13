import { all, fork } from 'redux-saga/effects';
import watchAnswer from './answer';
import watchSurvey from './survey';

export default function*() {
  yield all([fork(watchAnswer), fork(watchSurvey)]);
}
