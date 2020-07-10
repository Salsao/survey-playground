import { takeEvery, call, put } from 'redux-saga/effects';
import { types, actions as surveyActions } from '../../reducers/survey';
import { post } from '../../api/survey';

function* create(action) {
  try {
    const { payload } = action;
    const response = yield call(post, payload);
    yield put(
      surveyActions.create({
        allIds: response.data.id,
        byId: response.data,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* watchSurvey() {
  yield takeEvery(types.CREATE_REQUEST, create);
}
