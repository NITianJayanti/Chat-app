import { Server } from "socket.io";

let io;
const userSocketMap = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", socket.id, "with userId:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log("Updated userSocketMap:", userSocketMap);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      console.log("User disconnected, updated userSocketMap:", userSocketMap);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log("user disconnected", socket.id);
    });
  });
};

export const getReceiverSocketId = (receiverId) => {
  console.log("Getting socket ID for receiver:", receiverId);
  console.log("Current userSocketMap:", userSocketMap);
  return userSocketMap[receiverId];
};

export const getSenderSocketId = (senderId) => {
  console.log("Getting socket ID for sender:", senderId);
  console.log("Current userSocketMap:", userSocketMap);
  return userSocketMap[senderId];
};

export { io };
