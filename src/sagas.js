import { eventChannel } from 'redux-saga';
import {
  take,
  call,
  getContext,
  setContext,
  all,
  fork,
} from 'redux-saga/effects';
import ReconnectingWebSocket from 'reconnecting-websocket';

const createWebsocketChannel = ws =>
  eventChannel(emitter => {
    ws.onmessage = message => {
      emitter(JSON.parse(message.data));
    };

    return () => ws.close();
  });

export function configureWebsockets() {
  return setContext({ wsHandlers: new Set() });
}

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
    const message = yield take(wsChannel);
    const subscriptions = yield getContext('wsHandlers');
    yield all(Array.from(subscriptions).map(s => call(s, message)));
  }
}

export function* addMessageHandler(handler) {
  const subscriptions = yield getContext('wsHandlers');
  subscriptions.add(handler);
}
