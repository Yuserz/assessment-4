import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { InputField } from "../components";
import swal from "sweetalert2";

const Login = ({ isAuthenticated, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className="absolute bg-black/5 w-screen h-full top-0 left-0">
      <div className="flex items-center justify-evenly  w-full h-full">
        <div className="flex flex-col items-center justify-center w-[30%] h-fit p-10 bg-white border shadow-lg  rounded-xl">
          <form className="w-full h-fit" onSubmit={handleSubmit}>
            <div className="pb-10">
              <h1 className="text-3xl font-bold my-2 select-none text-center">
                Welcome!
              </h1>
            </div>
            <div className="mb-6">
              <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center lg:text-left">
              <button
                type="submit"
                // onClick={handleSubmit}
                className="bg-gray-700 hover:bg-gray-800 text-white max-w-[400px] w-full rounded-md p-4 shadow-md hover:shadow-xl font-bold text-xl"
              >
                Login
              </button>
            </div>
            <Link to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
