import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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
    <div className="text-white flex justify-center">
      <div className="flex flex-col w-screen h-screen max-w-4xl">
        <h2 className="text-5xl font-bold text-blue-500 mt-4 mb-2 text-center">
          Welcome to the Chat room, {user.username}!
        </h2>
        <div className="flex-1 overflow-y-auto px-4">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="message mb-2">
                <span className="user-name text-blue-500">{msg.user}:</span>{" "}
                {msg.text}
              </div>
            ))
          ) : (
            <p className="text-center">No messages available.</p>
          )}
        </div>
        <form
          className="flex items-center justify-between p-4 border-t border-gray-700"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 mr-4 p-2 rounded bg-gray-700 text-white"
            placeholder="Please type here..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
        <div className="flex justify-between p-4">
          <button
            onClick={deleteChat}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Chat
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
