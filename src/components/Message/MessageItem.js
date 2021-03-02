import React from "react";
import moment from "moment";

const MessageItem = ({ message, authedUser }) => {
  const time = moment(message.created_at).format("MMM-DD HH:mm");
  const classes =
    authedUser.id === message.sender ? "message-sender" : "message-receiver";
  return (
    <li className={`message-item ${classes}`}>
      <p>
        <span className='text-small'>{message.message}</span>
        <small>{time}</small>
      </p>
    </li>
  );
};

export default MessageItem;
