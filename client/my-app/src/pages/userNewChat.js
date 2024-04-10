import React, { useEffect, useRef, useState } from "react";
import "./userChat.css";
import "./pages.css";
import NavBar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ChatBubble from "../components/MessageBubble";

function UserNewChat() {
  const textareaRef = useRef(null);
  const chatAreaRef = useRef(null);
  const typeMessageRef = useRef(null);
  const [initialChatAreaHeight, setInitialChatAreaHeight] = useState(0);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const room = "some_room_id";
  const [connectionStatus, setConnectionStatus] = useState("Not connected");

  //   HARDCODED!
  const senderId = 2;

  //   not hardcoded
  const splitted = window.location.pathname.split("/");
  const receiverId = splitted[2];

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

  useEffect(() => {
    const setInitialSizes = () => {
      if (chatAreaRef.current) {
        setInitialChatAreaHeight(chatAreaRef.current.offsetHeight);
      }
    };

    const adjustTextareaAndChatArea = () => {
      const textarea = textareaRef.current;
      const typeMessage = typeMessageRef.current;
      if (!textarea || !initialChatAreaHeight || !typeMessage) return;

      const currentTextLength = textarea.value.length;
      if (currentTextLength >= 200) {
        textarea.style.overflowY = "scroll";
        return;
      } else {
        textarea.style.overflowY = "hidden";
      }

      textarea.style.height = "auto";
      const currentTextareaHeight = textarea.scrollHeight;
      let newChatAreaHeight = initialChatAreaHeight;

      if (currentTextareaHeight > textarea.offsetHeight) {
        textarea.style.height = `${currentTextareaHeight}px`;
        typeMessage.style.height = `auto`;
        newChatAreaHeight = Math.max(
          0,
          initialChatAreaHeight - (currentTextareaHeight - 40)
        );
      } else {
        textarea.style.height = `40px`;
        typeMessage.style.height = `auto`;
      }

      if (chatAreaRef.current) {
        chatAreaRef.current.style.height = `${newChatAreaHeight}px`;
      }
    };

    setInitialSizes();

    const textarea = textareaRef.current;
    textarea.addEventListener("input", adjustTextareaAndChatArea);
    textarea.addEventListener("paste", adjustTextareaAndChatArea);

    return () => {
      textarea.removeEventListener("input", adjustTextareaAndChatArea);
      textarea.removeEventListener("paste", adjustTextareaAndChatArea);
    };
  }, [initialChatAreaHeight]);

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
    navigate(-1); // Goes back a page
  };

  return (
    <div>
      <header className="new_msg_header">
        <div className="back_button">
          <img
            src={"/arrow.svg"}
            className="arrow"
            alt="back button"
            onClick={exitChat}
          />
        </div>
        <div className="business_name">
          <h2>Business Name</h2>
        </div>
        <div className="business-pfp">
          <img
            src={"/business-logo.svg"}
            className="sender_pfp"
            alt="business logo"
          />
        </div>
      </header>
      <div className="chat_container">
        <div ref={chatAreaRef} className="chat_area">
          {messages.map((msg, index) => (
            <ChatBubble
              message={msg}
              isUser={msg.sender_id === senderId}
              key={index}
              className="message"
            />
          ))}
        </div>
        <div ref={typeMessageRef} className="type_message">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="type_message_input"
            placeholder="Type Message"
            maxLength="200"
          ></textarea>
          <FontAwesomeIcon
            icon={faPaperPlane}
            title="send message"
            className="fa-svg-icon"
            onClick={sendMessage}
          />
        </div>
      </div>

      <NavBar />
    </div>
  );
}

export default UserNewChat;
