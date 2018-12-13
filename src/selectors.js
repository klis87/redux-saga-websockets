import { WEBSOCKET_STATE } from './constants';

export const isWebsocketConnected = state => state[WEBSOCKET_STATE].connected;

export const isWebsocketDisconnected = state =>
  state[WEBSOCKET_STATE].disconnected;
