import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-xs md:max-w-sm w-full">
        <h2 className="text-blue-500 font-bold text-center text-2xl mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
            />
          </label>
          <label className="mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
            />
          </label>
          <button
            type="submit"
            className="w-full p-3 font-bold mb-4 bg-blue-500 text-white rounded cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
