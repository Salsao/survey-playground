import { takeEvery, call, put } from 'redux-saga/effects';
import { types, actions as userActions } from '../../reducers/user';
import { post } from '../../api/user';
import { saveState } from '../../utils/statePersistence';
import { HOME_PATH } from '../../constants';

function* register(action) {
  try {
    const {
      payload: { formAuth, history }
    } = action;
    const response = yield call(post, formAuth);
    yield put(userActions.set(response.data));
    saveState(response.data, 'user');
    history.push(HOME_PATH);
  } catch (error) {
    yield put(userActions.error(error));
  }
}

function* login(action) {
  try {
    const {
      payload: { formAuth, history }
    } = action;
    const response = yield call(post, formAuth);
    yield put(userActions.set(response.data));
    saveState(response.data, 'user');
    history.push(HOME_PATH);
  } catch (error) {
    yield put(userActions.error(error));
  }
}

function* logout() {
  try {
    yield put(userActions.logout());
    saveState({}, 'user');
  } catch (error) {
    yield put(userActions.error(error));
  }
}

export default function* watchUser() {
  yield takeEvery(types.REGISTER_REQUEST, register);
  yield takeEvery(types.LOGIN_REQUEST, login);
  yield takeEvery(types.LOGOUT_REQUEST, logout);
}
