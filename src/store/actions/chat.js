import axios from "../../axios";

export const RECEIVE_RECENT_CHATS = "RECEIVE_RECENT_CHATS";
export const RECEIVE_ROOM_MESSAGES_SUCCESS = "RECEIVE_ROOM_MESSAGES_SUCCESS";
export const RECEIVE_ROOM_MESSAGES_FAIL = "RECEIVE_ROOM_MESSAGES_FAIL";

export const RECEIVE_ROOM_MESSAGES_START = "RECEIVE_ROOM_MESSAGES_START";

export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAIL = "SEND_MESSAGE_FAIL";

export const SEND_MESSAGE_START = "SEND_MESSAGE_START";

export const receiveRecentChats = (chats) => {
  return {
    type: RECEIVE_RECENT_CHATS,
    chats,
  };
};

export const receiveRoomMessagesStart = () => {
  return {
    type: RECEIVE_ROOM_MESSAGES_START,
  };
};

export const receiveRoomMessagesFail = (error) => {
  return {
    type: RECEIVE_ROOM_MESSAGES_FAIL,
    error,
  };
};

export const receiveRoomMessages = (messages, room) => {
  return {
    type: RECEIVE_ROOM_MESSAGES_SUCCESS,
    room,
    messages,
  };
};

export const sendMessageStart = () => ({
  type: SEND_MESSAGE_START,
});

export const sendMessageSuccess = (message) => ({
  type: SEND_MESSAGE_SUCCESS,
  message,
});

export const sendMessageFail = (error) => ({
  type: SEND_MESSAGE_FAIL,
  error,
});

export const handleReceiveRecentChats = () => {
  return (dispatch) => {
    return axios.get("/api/recent-chats").then((response) => {
      dispatch(receiveRecentChats([...response.data.data]));
    });
  };
};

export const handleReceiveRoomMessages = (room) => {
  return async (dispatch) => {
    try {
      dispatch(receiveRoomMessagesStart());
      const response = await axios.get(`/api/room/${room}/messages`);
      dispatch(receiveRoomMessages([...response.data.data], room));
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(receiveRoomMessagesFail(error.response.data.message));
    }
  };
};

export const handleSendMessage = (message) => {
  return async (dispatch) => {
    try {
      dispatch(sendMessageStart());
      const response = await axios.post("/api/new-message", message);
      console.log(response.data);
      dispatch(sendMessageSuccess(response.data));
    } catch (error) {
      console.log("error", error.response.data);
      dispatch(sendMessageFail(error.response.data.message));
    }
  };
};
