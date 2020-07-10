import { all, fork } from 'redux-saga/effects';
import watchSurvey from './survey';

export default function* () {
  yield all([fork(watchSurvey)]);
}
