import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("Received new message in hook:", newMessage);
      // Only add the message if it's for the current user
      if (newMessage.senderId === authUser?._id || newMessage.receiverId === authUser?._id) {
        console.log("Adding message to state");
        dispatch(setMessages([...messages, newMessage]));
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, dispatch, authUser]);
};

export default useGetRealTimeMessage;
