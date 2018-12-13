import {
  WEBSOCKET_OPENED,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_ERROR_THROWN,
} from './constants';

export const websocketOpened = () => ({ type: WEBSOCKET_OPENED });

export const websocketClosed = () => ({ type: WEBSOCKET_CLOSED });

export const websocketMessageReceived = data => ({
  type: WEBSOCKET_MESSAGE_RECEIVED,
  data,
});

export const websocketErrorThrown = () => ({ type: WEBSOCKET_ERROR_THROWN });
