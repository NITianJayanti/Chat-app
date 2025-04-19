// index.js or server.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initSocket } from "./socket/socket.js"; // 🔥 import socket initializer

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// create HTTP server and bind socket.io to it
const server = http.createServer(app);

// 🔥 initialize socket.io
initSocket(server);

// connect to db and start the server
server.listen(PORT, async () => {
  await connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
