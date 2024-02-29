import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/logout");
        console.log(response);
        if (response.data.status) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  };
  return (
    <>
      <div className="flex flex-col  h-screen bg-emerald-400 items-center">
        <h1 className="text-2xl text-white mt-20"> Welcome to our website </h1>
        <button className="bg-cyan-600 mt-24 text-lg w-48 p-2 rounded-lg hover:bg-cyan-700 text-white">
          <Link to="/dashboard"> Dashboard</Link>
        </button>
        <br />
        <button
          onClick={handleLogout}
          className="bg-cyan-600 text-lg w-48 p-2 rounded-lg  mt-4 hover:bg-cyan-700 text-white"
        >
          logout
        </button>
      </div>
    </>
  );
};

export default Home;
