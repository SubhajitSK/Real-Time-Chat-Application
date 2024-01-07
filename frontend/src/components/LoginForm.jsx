import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const userData = response.data;
        onLogin(userData);
        navigate(`/chat?user=${userData.username}&room=default`);
        toast.success(`Login successful. Welcome, ${userData.username}!`);
      }
    } catch (error) {
      toast.error("invalid username or password.");
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
