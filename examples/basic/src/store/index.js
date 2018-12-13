import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put, fork, all, takeEvery } from 'redux-saga/effects';
import {
  websocketManager,
  WEBSOCKET_MESSAGE_RECEIVED,
} from 'redux-saga-websockets';

import { messagesReducer } from './reducers';
import { receiveMessage } from './actions';

function* messagesSaga(action) {
  const data = JSON.parse(action.data);

  if (data.type === 'RECEIVE_MESSAGE') {
    yield put(receiveMessage(data.title, data.content));
  }
}

function* rootSaga() {
  yield all([
    fork(websocketManager, { url: 'ws://localhost:3000/ws' }),
    takeEvery(WEBSOCKET_MESSAGE_RECEIVED, messagesSaga),
  ]);
}

export const configureStore = () => {
  const reducers = combineReducers({
    messages: messagesReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
