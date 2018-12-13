import { put } from 'redux-saga/effects';
import { websocketManager } from './index';

websocketManager({ url: 'ws://localhost:3000/ws' });

function* messageSaga(message) {
  yield put(message);
}
