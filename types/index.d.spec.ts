import { put } from 'redux-saga/effects';
import {
  configureWebsockets,
  websocketManager,
  addMessageHandler,
} from './index';

configureWebsockets();
websocketManager({ url: 'ws://localhost:3000/ws' });

function* messageSaga(message) {
  yield put(message);
}

addMessageHandler(messageSaga);
