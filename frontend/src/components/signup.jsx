import React from "react";
import { useState } from "react";
import "../components/signup.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postrequest = async () => {
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", {
          username,
          email,
          password,
        });
        console.log(response.data);
        if (response.data.status) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    postrequest();
  };

  return (
    <div className="text-center landscape:p-10  landscape:sm:h-auto  landscape:md:h-auto landscape:lg:h-screen containere flex flex-col h-screen justify-center items-center text-white">
      <div className="border p-6 md:p-10 w-3/4 sm:max-w-md m-6 rounded-3xl flex flex-col justify-center bg-slate-600 items-center">
        <h1 className="text-3xl font-bold mb-4"> Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className="sign-up-form flex flex-col justify-center items-center w-full"
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border text-black p-2 rounded text-center w-full mb-4"
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border text-black p-2 rounded text-center w-full mb-4"
            autoComplete="off"
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            className="border text-black p-2 rounded text-center w-full mb-4"
          />
          <button className="bg-cyan-600 text-lg w-full p-2 rounded-lg mb-4 hover:bg-cyan-700 text-white">
            Sign Up
          </button>
          <p className="mb-4">
            {" "}
            Have an Account?{" "}
            <Link to="/login" className="text underline text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default signup;
