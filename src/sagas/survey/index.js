import { takeEvery, call, put } from 'redux-saga/effects';
import { types, actions as surveyActions } from '../../reducers/survey';
import { post, getOne, getAll, putOne } from '../../api/survey';
import { getAllIds, getById } from '../../utils/responseData';
import { SURVEYS_PATH } from '../../constants';

function* create(action) {
  try {
    const {
      payload: { formSurvey, history }
    } = action;
    const response = yield call(post, formSurvey);
    yield put(surveyActions.create(response.data));
    history.push(`${SURVEYS_PATH}/${response.data.id}`);
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
    yield put(surveyActions.error({ ...error, message: 'There is no survey with this id' }));
  }
}

function* getAllRequest(action) {
  try {
    const { payload } = action;
    const response = yield call(getAll, payload);
    yield put(
      surveyActions.setAll({
        allIds: getAllIds(response.data),
        byId: getById(response.data)
      })
    );
  } catch (error) {
    yield put(surveyActions.error(error));
  }
}

function* update(action) {
  try {
    const {
      payload: { formSurvey, history }
    } = action;
    const response = yield call(putOne, formSurvey);
    yield put(surveyActions.set(response.data));
    history.push(`${SURVEYS_PATH}/${response.data.id}`);
  } catch (error) {
    yield put(surveyActions.error(error));
  }
}

export default function* watchSurvey() {
  yield takeEvery(types.CREATE_REQUEST, create);
  yield takeEvery(types.GET_REQUEST, get);
  yield takeEvery(types.GET_ALL_REQUEST, getAllRequest);
  yield takeEvery(types.UPDATE_REQUEST, update);
}
