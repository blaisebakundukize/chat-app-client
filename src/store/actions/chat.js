import axios from "../../axios";

export const RECEIVE_RECENT_CHATS = "RECEIVE_RECENT_CHATS";
export const RECEIVE_ROOM_MESSAGES_SUCCESS = "RECEIVE_ROOM_MESSAGES_SUCCESS";
export const RECEIVE_ROOM_MESSAGES_FAIL = "RECEIVE_ROOM_MESSAGES_FAIL";

export const RECEIVE_ROOM_MESSAGES_START = "RECEIVE_ROOM_MESSAGES_START";

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
