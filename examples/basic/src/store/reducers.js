import { RECEIVE_MESSAGE } from './constants';

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return [...state, { title: action.title, content: action.content }];
    default:
      return state;
  }
};
