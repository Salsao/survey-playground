import { takeEvery, call, put } from 'redux-saga/effects';
import { types, actions as answerActions } from '../../reducers/answer';
import { post, getAll, getOne } from '../../api/answer';

function* create(action) {
  try {
    const { payload } = action;
    const response = yield call(post, payload);
    yield put(answerActions.create(response.data));
  } catch (error) {
    yield put(answerActions.error(error));
  }
}

function* get(action) {
  try {
    const { payload } = action;
    const response = yield call(getAll, payload);
    yield put(answerActions.set(response.data));
  } catch (error) {
    yield put(answerActions.error(error));
  }
}

function* getOneRequest(action) {
  try {
    const { payload } = action;
    const response = yield call(getOne, payload);
    yield put(answerActions.setOne(response.data));
  } catch (error) {
    yield put(answerActions.error(error));
  }
}

export default function* watchSurvey() {
  yield takeEvery(types.CREATE_REQUEST, create);
  yield takeEvery(types.GET_REQUEST, get);
  yield takeEvery(types.GET_ONE_REQUEST, getOneRequest);
}
