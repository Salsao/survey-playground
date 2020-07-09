import { takeEvery } from 'redux-saga/effects';
import { types } from '../../reducers/user';

function* register() {
  try {
    console.log('try');
  } catch (error) {
    console.log(error);
  }
}

export default function* watchUser() {
  yield takeEvery(types.REGISTER_REQUEST, register);
}
