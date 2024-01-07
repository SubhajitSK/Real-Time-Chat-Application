const users = [];

const addUser = ({ id, user, room }) => {
  user = { id, ...user };

  const existingUser = users.find(
    (u) => u.room === room && u.user.username === user.username
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const newUser = { id, user, room };
  users.push(newUser);

  return { newUser };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
