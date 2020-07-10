import { takeEvery, call, put } from 'redux-saga/effects';
import { types, actions as surveyActions } from '../../reducers/survey';
import { post, getOne } from '../../api/survey';

function* create(action) {
  try {
    const { payload } = action;
    const response = yield call(post, payload);
    yield put(surveyActions.create(response.data));
  } catch (error) {
    yield put(surveyActions.error(error));
  }
}

function* get(action) {
  try {
    const { payload } = action;
    const response = yield call(getOne, payload);
    yield put(surveyActions.set(response.data));
  } catch (error) {
    yield put(surveyActions.error(error));
  }
}

export default function* watchSurvey() {
  yield takeEvery(types.CREATE_REQUEST, create);
  yield takeEvery(types.GET_REQUEST, get);
}
