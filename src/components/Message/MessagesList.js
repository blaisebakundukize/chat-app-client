import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, authedUser }) => {
  return (
    <ul className='message-list'>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          authedUser={authedUser}
        />
      ))}
    </ul>
  );
};

export default MessageList;
