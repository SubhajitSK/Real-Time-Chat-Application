import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/LoginForm.css";

function SignupForm({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });

      if (response.status === 201) {
        const userData = response.data;
        onSignup(userData);
        navigate(`/chat?user=${userData.username}&room=default`);
        toast.success("Signup successful! Welcome to the community.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;
