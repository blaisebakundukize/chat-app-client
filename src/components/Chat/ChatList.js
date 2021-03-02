import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({ chats, onSelectedChat }) => {
  return (
    <ul className='chat-list'>
      {chats.map((chat) => (
        <ChatItem key={chat.room} chat={chat} onSelectedChat={onSelectedChat} />
      ))}
    </ul>
  );
};

export default ChatList;
