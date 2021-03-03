import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketClient from "socket.io-client";
import ChatList from "./ChatList";
import MessageList from "../Message/MessagesList";
import MessageInput from "../Message/MessageInput";
import {
  handleReceiveRoomMessages,
  handleSendMessage,
  sendMessageSuccess,
} from "../../store/actions/chat";

const SERVER = "http://localhost:4000";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const socket = useRef(socketClient(SERVER));
  const [receivedMessage, setReceivedMessage] = useState({});

  const { authedUser, chat } = useSelector((state) => {
    const authedUser = state.auth;
    const chat = state.chat;
    return { authedUser, chat };
  });

  const dispatch = useDispatch();

  socket.current.on("connection", () => {});

  socket.current.on("see-identify", (id) => {
    console.log(id);
  });

  useEffect(() => {
    socket.current.on("message", (message) => {
      setReceivedMessage({ ...receivedMessage, ...message });
      if (
        receivedMessage.room !== message.room &&
        authedUser.user &&
        authedUser.user.id !== message.sender
      ) {
        dispatch(sendMessageSuccess(message));
      }
    });
  }, [authedUser.user, dispatch, receivedMessage, socket]);

  useEffect(() => {
    if (authedUser.user) {
      socket.current.emit("identity", authedUser.user.id);
    }
  }, [authedUser.user, socket]);

  useEffect(() => {
    if (Array.isArray(chat.chats) && chat.chats.length) {
      socket.current.emit("subscribe", chat.chats);
    }
  }, [chat.chats, socket]);

  const onSelectedChat = (chat) => {
    setSelectedChat({ ...chat });
    dispatch(handleReceiveRoomMessages(chat.room));
  };

  const onSubmitMessage = ({ message }) => {
    const { id: receiver, room } = selectedChat;
    const sender = authedUser.user.id;
    dispatch(handleSendMessage({ message, room, sender, receiver }));
    socket.current.emit("send-message", {
      message,
      room,
      receiver,
      sender,
    });
  };

  // if (chat.chats === null) {
  // }

  // console.log(chat.chats);

  return (
    <>
      {chat.chats === null ? (
        <div>loading</div>
      ) : (
        <div className='chats-container'>
          <section className='chats-section'>
            <div className='flex-center justify-between padding-small'>
              {/* <p className='text'>chats</p> */}
              <input type='search' placeholder='Search people' />
            </div>
            <div className='flex-center'>
              {chat.chats.length ? (
                <div className='size-full'>
                  <ChatList
                    chats={chat.chats}
                    onSelectedChat={onSelectedChat}
                  />
                </div>
              ) : (
                <p className='text'>No Chats available</p>
              )}
            </div>
          </section>
          <section className='messages-section flex-center'>
            {selectedChat ? (
              <>
                {chat.roomMessagesLoading === false ? (
                  <div className='size-full flex-column justify-between'>
                    <p className='text text-center chat-with-title'>
                      {authedUser.user.name}
                    </p>
                    <div className='messages-container'>
                      <MessageList
                        messages={chat.roomMessages[selectedChat.room]}
                        authedUser={authedUser.user}
                      />
                      <div className='message-form-container'>
                        <MessageInput onSubmitMessage={onSubmitMessage} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className='text'>Loading...</p>
                )}
              </>
            ) : (
              <p className='text'>Please select a chat</p>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Chat;
