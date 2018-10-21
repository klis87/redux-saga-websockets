import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put, fork, all, call } from 'redux-saga/effects';
import {
  configureWebsockets,
  websocketManager,
  addMessageHandler,
} from 'redux-saga-websockets';

import { messagesReducer } from './reducers';
import { receiveMessage } from './actions';

function* receiveMessageHandler(message) {
  if (message.type === 'RECEIVE_MESSAGE') {
    yield put(receiveMessage(message.title, message.content));
  }
}

function* messagesSaga() {
  yield call(addMessageHandler, receiveMessageHandler);
}

function* rootSaga() {
  yield configureWebsockets();
  yield all([
    fork(websocketManager, { url: 'ws://localhost:3000/ws' }),
    fork(messagesSaga),
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
