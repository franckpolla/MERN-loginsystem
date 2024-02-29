import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get("http://localhost:3000/auth/verify");
      console.log(response.data);
      if (response.data.status) {
        console.log(response.data);
      } else {
        navigate("/");
      }
    };
    getdata();
  }, []);
  return (
    <>
      <div className="bg-green-500 h-screen flex justify-center items-center">
        <h1 className="text-2xl text-center">Welcom to the dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
