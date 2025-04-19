import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Homepage from "./components/HomePage.jsx";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice.js";
import { setSocket } from "./redux/socketSlice.js";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  // Create protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!authUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: !authUser ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/login",
      element: !authUser ? <Login /> : <Navigate to="/" />,
    },
  ]);

  useEffect(() => {
    if (authUser) {
      console.log("Connecting socket for user:", authUser._id);
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });

      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.on("newMessage", (message) => {
        console.log("Received new message:", message);
      });

      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        console.log("Closing socket connection");
        socket.close();
      };
    } else {
      if (socket) {
        console.log("Closing socket connection (no auth user)");
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
