import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { receiveWebsocketMessage } from './actions';

const createWebsocketChannel = ws =>
  eventChannel(emitter => {
    ws.addEventListener('message', message => {
      emitter(receiveWebsocketMessage(message.data));
    });

    return () => ws.close();
  });

function* websocketMessageSender(ws) {
  while (true) {
    const action = yield take(a => a.websocket);
    ws.send(JSON.stringify(action.websocket));
  }
}

export function* websocketManager({ url }) {
  const ws = new ReconnectingWebSocket(url, '');
  const wsChannel = yield call(createWebsocketChannel, ws);
  yield fork(websocketMessageSender, ws);

  while (true) {
    const action = yield take(wsChannel);
    yield put(action);
  }
}
