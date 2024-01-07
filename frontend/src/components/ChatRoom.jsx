import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../style/ChatRoom.css";

const ChatRoom = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join", { user, room: "default" }, (error) => {
        if (error) {
          console.error(error);
        }
      });

      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("messages", (prevMessages) => {
        setMessages(prevMessages);
      });
    }
  }, [socket, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const deleteChat = async () => {
    try {
      await axios.delete("/api/messages/default");
      setMessages([]);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages/default");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Welcome to the Chat room, {user.username}!</h2>
      <div className="chat-container">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <span className="user-name">{msg.user}:</span> {msg.text}
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      <form className="message-input-container" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          placeholder="Please type here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <button onClick={deleteChat} className="delete-chat-button">
        Delete Chat
      </button>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default ChatRoom;
