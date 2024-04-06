// WebSocket.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import from 'react-router-dom'

const SocketTest2 = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const senderId = 4; // Hardcoded sender_id for testing
  const receiverId = 5; // Hardcoded receiver_id for testing
  const room = "some_room_id"; // A room identifier, can be derived from sender and receiver for a unique room for each conversation
  const [connectionStatus, setConnectionStatus] = useState("Not connected");

  useEffect(() => {
    // set up web socket
    const newSocket = io("http://localhost:8080", {
      withCredentials: false,
    });

    setSocket(newSocket);

    //listens to connection event. when connected it sends the sender id, reciever id, and room (which is necessary for socket.io) to the backend
    newSocket.on("connect", () => {
      setConnectionStatus(`Connected (Socket ID: ${newSocket.id})`);
      newSocket.emit("join_room", {
        sender_id: senderId,
        receiver_id: receiverId,
        room,
      });
    });

    // listens to load convo event from backend and sets messages according to recieved data
    newSocket.on("load_conversation", (data) => {
      setMessages(data.reverse());
    });

    // listens for new recieved messages event from backend. the previous state of messages persists and the incoming message is added on top
    newSocket.on("receive_message", (message) => {
      //prevMessages is an argument passed in the new array (it's all the previous messages in the state)
      // ...prevMessages copies all old elements into new array and adds message at the end
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // listens for disconnection
    newSocket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    // cleanup on unmount
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
      //   emit data to backend
      socket.emit("send_message", messageData);
      //   reset message once its sent
      setMessage("");
    }
  };

  const exitChat = () => {
    navigate("/"); // redirects to the home page
  };

  //   chat gpt did this:
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

export default SocketTest2;
