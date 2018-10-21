import { SEND_MESSAGE, RECEIVE_MESSAGE } from './constants';

export const sendMessage = (title, content) => ({
  type: SEND_MESSAGE,
  websocket: { type: SEND_MESSAGE, title, content },
});

export const receiveMessage = (title, content) => ({
  type: RECEIVE_MESSAGE,
  title,
  content,
});
