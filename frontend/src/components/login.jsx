import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const postrequest = async () => {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.status) {
          navigate("/");
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    postrequest();
  };

  return (
    <>
      <div className="text-center containere flex  landscape:sm:h-auto  landscape:p-10 landscape:md:h-auto landscape:lg:h-screen h-screen justify-center items-center text-white lg:w-full">
        <div className="border p-10 w-3/4 sm:max-w-md md:w-96 lg:w-96 rounded-3xl flex flex-col justify-center bg-slate-600 items-center">
          <h1 className="text-3xl font-bold mb-4">Log in</h1>
          <form
            onSubmit={handleSubmit}
            className="sign-up-form flex flex-col justify-center items-center"
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="text-black border p-2 rounded text-center w-full max-w-xs"
              autoComplete="off"
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              className="text-black border p-2 rounded text-center w-full max-w-xs"
            />
            <br />
            <button className="bg-cyan-600 text-lg w-full py-2 rounded-lg mt-4 hover:bg-cyan-700 text-white">
              Log in
            </button>
            <Link
              to="/forgotPassword"
              className="text-sm text-blue-300 underline"
            >
              Forgot password?
            </Link>
            <p className="p-1">Don't have an account?</p>
            <Link to="/signup" className="text-blue-400 underline">
              Sign up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
export default login;
