const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const Message = require("./models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async ({ user, room }, callback) => {
      const { error, newUser } = addUser({ id: socket.id, user, room });

      if (error) {
        return callback(error);
      }

      socket.join(newUser.room);

      socket.emit("message", {
        user: "admin",
        text: `Welcome, ${newUser.user.username}!`,
      });

      socket.broadcast.to(newUser.room).emit("message", {
        user: "admin",
        text: `${newUser.user.username} has joined the chat`,
      });

      io.to(newUser.room).emit("roomData", {
        room: newUser.room,
        users: getUsersInRoom(newUser.room),
      });

      try {
        const messages = await Message.find({ room: newUser.room }).sort({
          createdAt: 1,
        });
        socket.emit("messages", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      callback();
    });

    socket.on("sendMessage", async (message, callback) => {
      const user = getUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: user.user.username,
          text: message,
        });

        const newMessage = new Message({
          user: user.user.username,
          text: message,
          room: user.room,
        });
        await newMessage.save();

        callback();
      }
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "admin",
          text: `${user.user.username} has left the chat`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
};

module.exports = socketHandler;
