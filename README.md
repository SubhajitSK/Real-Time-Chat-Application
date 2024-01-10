# ChatSync Application Documentation

This documentation provides information on how to use, set up, and run the Chat Application.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setting Up the Project](#setting-up-the-project)
- [Running the Project](#running-the-project)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Introduction

The ChatSync is a real-time chat platform that allows users to log in, sign up, and participate in chat room. Users can join a chat room, send messages, and view the chat history. The project is built using React for the frontend, Node.js with Express for the backend, and MongoDB for data storage. Socket.IO is used for real-time communication.

## Technologies Used

- **Frontend:**

  - React
  - react-router-dom
  - axios
  - socket.io-client
  - react-toastify

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - bcrypt
  - jsonwebtoken
  - cors
  - socket.io

## Project Structure

The project is organized into the following main components:

- **frontend:** React-based frontend application.
- **backend:** Node.js backend server.
- **models:** MongoDB data models (User, Message).
- **routes:** Express routes for authentication and messages.
- **socket.js:** Socket.IO setup for real-time communication.
- **users.js:** User management functions.
- **.env:** Environment variables configuration.
- **App.jsx:** Main React application component.
- **Server.js:** Entry point for the Node.js server.

The backend server is configured to serve the frontend's static files from the `dist` folder. This allows both the frontend and backend to run seamlessly on the same port.

## Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/SubhajitSK/Real-Time-Chat-Application.git
   cd chat-application
   ```
2. Install the dependencies:
   ```bash
   cd frontend
   npm install
   ```
   ```bash
   cd ../backend
   npm install
   ```
3. Create a `.env` file in the `backend` directory.
   and add the following environment variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET= Your_secret_token (can be any string)
   PORT=3001 (or any other port)
   ```

## Running the Project

Start the backend server:

```bash
cd backend
node server.js
```

open another terminal and run:

```bash
ipconfig
```

Look for the `IPv4 Address` in the output. For example:

```bash
IPv4 Address: 192.168.29.108
```

Combine your IPv4 address with the port number, for example:

```bash
192.168.29.108:3001
```

Open your web browser and go to the combined address, for example:

```bash
http://192.168.29.108:3001
```

This should allow you to access the Chat Application in your browser.

## Features

- **User Authentication:**

  - Users can register and log in securely using bcrypt for password hashing.

- **Real-Time Chat:**

  - Socket.IO enables real-time communication for chat messages.

- **Chat Rooms:**

  - Users can join a default chat room upon login.
  - Chat history is displayed when joining a room.

- **Message History:**

  - Chat messages are stored in MongoDB, allowing users to view previous messages.

- **User Management:**
  - User data is managed using MongoDB and Mongoose.
  - Users can log out, and their data is removed from the session.

## API Endpoints

### Authentication:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in an existing user.

### Messages:

- `GET /api/messages/:room`: Retrieve chat messages for a specific room.
- `DELETE /api/messages/:room`: Delete all chat messages for a specific room.

## Troubleshooting

- **MongoDB Connection:**

  - Ensure that the MongoDB URI in the `.env` file is correct.
  - Check the MongoDB server status.

- **Port Conflict:**

  - If port is already in use, update the `PORT` variable in the `.env` file and restart the server.

- **Frontend/Backend Connection:**

  - Ensure that the backend server is running before starting the frontend.
  - Check for CORS-related issues in the browser console.

- **Socket.IO Connection:**
  - Verify that the Socket.IO connection is established in the browser console.
  - Check for errors related to socket connections.

## Trouble Implementing "Who Is Typing" Feature

Unfortunately, I'm currently facing challenges while implementing the "Who Is Typing" feature in the application. Despite my efforts, the functionality is not working as intended.

Thank you for your understanding.
