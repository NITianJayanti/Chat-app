import React from "react";

import Message from "./Message";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import useGetMessages from "../hooks/useGetMessages";
import useGetConversations from "../hooks/useGetConversations";

const Messages = () => {
  useGetRealTimeMessage();
  useGetMessages();
  useGetConversations();
  
  const { messages } = useSelector((store) => store.message);
  const { authUser, selectedUser } = useSelector((store) => store.user);

  if (!messages || !selectedUser) return;

  // Filter messages to only show those between current user and selected user
  const filteredMessages = messages.filter(
    (message) =>
      (message.senderId === authUser?._id && message.receiverId === selectedUser?._id) ||
      (message.senderId === selectedUser?._id && message.receiverId === authUser?._id)
  );

  return (
    <div className="px-4 flex-1 overflow-auto">
      {filteredMessages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
