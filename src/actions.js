import { WEBSOCKET_MESSAGE_RECEIVED } from './constants';

export const receiveWebsocketMessage = data => ({
  type: WEBSOCKET_MESSAGE_RECEIVED,
  data,
});
