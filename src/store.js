import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { loadState } from './utils/statePersistence';
import { types } from './reducers/user';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const user = loadState('user');

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    return reducers(
      {
        ...state,
      },
      action
    );
  }
  return reducers(state, action);
};

const store = createStore(
  rootReducer,
  { user },
  compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

sagaMiddleware.run(rootSaga);

export default store;
