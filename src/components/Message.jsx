import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser, onlineUsers } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = message?.senderId === authUser?._id;
  const displayName = isSender ? authUser?.fullName : selectedUser?.fullName;
  const profilePhoto = isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto;
  const isOnline = onlineUsers?.includes(isSender ? authUser?._id : selectedUser?._id);

  // Format the time from createdAt
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full relative">
          <img
            alt="Profile"
            src={profilePhoto}
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
      </div>
      <div className="chat-header">
        <span className="text-sm font-semibold">{displayName}</span>
        <time className="text-xs opacity-50 text-white ml-2">
          {formatTime(message?.createdAt)}
        </time>
      </div>
      <div
        className={`chat-bubble ${
          !isSender ? "bg-gray-200 text-black" : ""
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
