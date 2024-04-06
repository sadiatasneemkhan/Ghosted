// WebSocket.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import from 'react-router-dom'

const SocketTest = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const senderId = 5; // Hardcoded sender_id for testing
  const receiverId = 4; // Hardcoded receiver_id for testing
  const room = "some_room_id"; // A room identifier, can be derived from sender and receiver for a unique room for each conversation
  const [connectionStatus, setConnectionStatus] = useState("Not connected");

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      withCredentials: false,
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
      setConnectionStatus(`Connected (Socket ID: ${newSocket.id})`);
      newSocket.emit("join_room", {
        sender_id: senderId,
        receiver_id: receiverId,
        room,
      });
    });

    newSocket.on("load_conversation", (data) => {
      setMessages(data.reverse());
    });

    newSocket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      const messageData = {
        sender_id: senderId,
        receiver_id: receiverId,
        content: message,
        room,
      };
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  const exitChat = () => {
    navigate("/"); // Redirects to the home page
  };

  return (
    <div>
      <h2>WebSocket Connection Test</h2>
      <p>Status: {connectionStatus}</p>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{`${msg.sender_id === senderId ? "Me" : "Them"}: ${
            msg.content
          }`}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={exitChat}>Exit Chat</button>{" "}
      {/* Button to leave the chat */}
    </div>
  );
};

export default SocketTest;
