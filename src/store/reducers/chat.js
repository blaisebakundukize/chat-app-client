import {
  RECEIVE_RECENT_CHATS,
  RECEIVE_ROOM_MESSAGES_SUCCESS,
  RECEIVE_ROOM_MESSAGES_FAIL,
  RECEIVE_ROOM_MESSAGES_START,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
} from "../actions/chat";

const initialState = {
  chats: null,
  roomMessages: null,
  roomMessagesLoading: false,
  roomMessagesError: null,
  sendMessageLoading: false,
  sendMessageError: null,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECENT_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    case RECEIVE_ROOM_MESSAGES_START:
      return {
        ...state,
        roomMessagesLoading: true,
        roomMessagesError: null,
      };
    case RECEIVE_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        roomMessages: {
          ...state.roomMessages,
          [action.room]: [...action.messages],
        },
        roomMessagesLoading: false,
        roomMessagesError: null,
      };
    case RECEIVE_ROOM_MESSAGES_FAIL:
      return {
        ...state,
        roomMessagesError: action.error,
        roomMessagesLoading: true,
      };
    case SEND_MESSAGE_START:
      return {
        ...state,
        sendMessageLoading: true,
        sendMessageError: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        roomMessages: {
          ...state.roomMessages,
          [action.message.room]: [
            ...state.roomMessages[action.message.room],
            action.message,
          ],
        },
        roomMessagesLoading: false,
        roomMessagesError: null,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        sendMessageError: action.error,
        sendMessageLoading: false,
      };
    default:
      return state;
  }
};

export default chat;
