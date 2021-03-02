import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import MessageList from "../Message/MessagesList";
import { handleReceiveRoomMessages } from "../../store/actions/chat";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const { authedUser, chat } = useSelector((state) => {
    const authedUser = state.auth;
    const chat = state.chat;
    return { authedUser, chat };
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (authedUser.isAuthenticated === true && authedUser.user === null) {
  //     dispatch(handleGetAuthedUser());
  //   }
  // }, [authedUser, dispatch]);

  const onSelectedChat = (chat) => {
    setSelectedChat({ ...chat });
    dispatch(handleReceiveRoomMessages(chat.room));
  };

  if (chat.chats === null) {
  }

  console.log(chat);

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
                    <p className='text text-center'>{authedUser.user.name}</p>
                    <div className='messages-container'>
                      <MessageList
                        messages={chat.roomMessages[selectedChat.room]}
                        authedUser={authedUser.user}
                      />
                      <input type='text' placeholder='Message' />
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
