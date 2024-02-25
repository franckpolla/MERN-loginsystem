import React, { useState } from "react";
import { useNavigation } from "react-router-dom";
const forgotPassword = () => {
  const [email, setEmail] = useState("");
  let navigate = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postrequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/forgotPassword",
          {
            email,
          }
        );
        console.log(response.data);
        if (response.data.status) {
          alert("Please check your email for the reset password link!");
          navigate("/login");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    postrequest();
  };

  return (
    <>
      <div>
        <div className="text-center   containere flex flex-col h-screen justify-center items-center text-white ">
          <div className="border p-20 w-3/4 md:w-96 lg:w-96 rounded-3xl flex flex-col justify-center bg-slate-600  items-center">
            <h1 className="text-3xl font-bold mb-4"> Get password</h1>
            <form
              onSubmit={handleSubmit}
              className="sign-up-form flex flex-col justify-center items-center "
            >
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" text-black border p-1 rounded text-center w-50"
                autoComplete="off"
              />

              <button className="bg-cyan-600 text-lg w-48 p-2 rounded-lg  mt-4 hover:bg-cyan-700 text-white">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
