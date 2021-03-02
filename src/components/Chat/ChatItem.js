import React from "react";

const ChatItem = ({ chat, onSelectedChat }) => {
  return (
    <li className='chat-item' onClick={() => onSelectedChat(chat)}>
      <p className='text text-bold'>{chat.name}</p>
      <p className='chat-item-message'>{chat.message}</p>
    </li>
  );
};

export default ChatItem;
