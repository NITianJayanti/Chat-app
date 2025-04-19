import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, getSenderSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    console.log("Sending message from:", senderId, "to:", receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await Promise.all([conversation.save(), newMessage.save()]);
    }

    // Get socket IDs for both sender and receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getSenderSocketId(senderId);

    console.log("Receiver socket ID:", receiverSocketId);
    console.log("Sender socket ID:", senderSocketId);

    // Send message to the receiver
    if (receiverSocketId) {
      console.log("Emitting message to receiver:", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log("Receiver socket not found");
    }

    // Send message back to the sender
    if (senderSocketId) {
      console.log("Emitting message to sender:", senderSocketId);
      io.to(senderSocketId).emit("newMessage", newMessage);
    } else {
      console.log("Sender socket not found");
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
