import {
  WEBSOCKET_OPENED,
  WEBSOCKET_CLOSED,
  WEBSOCKET_ERROR_THROWN,
} from './constants';

const defaultState = {
  connected: false,
  disconnected: false,
};

export const websocketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case WEBSOCKET_OPENED:
      return { connected: true, disconnected: false };
    case WEBSOCKET_CLOSED:
    case WEBSOCKET_ERROR_THROWN:
      return { connected: false, disconnected: true };
    default:
      return state;
  }
};
