import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { InputField } from "../components";
import Swal from "sweetalert2";
import { getData, createData, updateData, deleteData } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const user = data;

  const navigate = useNavigate();

  useEffect(() => {
    const GetData = async () => {
      const response = await getData({ email, password });
      setData(response);
    };
    GetData();
  }, []);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let match = false;
      for (let i = 0; i < user.data.length; i++) {
        if (
          user.data[i].email === email &&
          user.data[i].password === password
        ) {
          match = true;
          break;
        }
      }
      if (match) {
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top-end",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: false,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
        // Toast.fire({
        //   icon: "success",
        //   title: "!",
        // });

        navigate("Home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Email or password",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again later",
      });
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/Home" />;
  // }

  return (
    <div className="absolute bg-black/5 w-screen h-full top-0 left-0">
      <div className="flex items-center justify-evenly  w-full h-full">
        <div className="flex flex-col items-center justify-center w-[30%] h-fit p-10 bg-white border shadow-lg  rounded-xl">
          <form className="w-full h-fit" onSubmit={handleSubmit}>
            <div className="pb-6">
              <h1 className="text-3xl font-bold my-2 select-none text-center">
                Welcome
              </h1>
              <p className="text-sm text-center text-gray-700/40 mt-4 ">Please enter your credentials</p>
            </div>
            <div className="mb-6">
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="bg-violet-400 hover:bg-violet-500 text-white w-full rounded-md p-4 shadow-md hover:shadow-xl font-bold text-xl"
              >
                Login
              </button>
            </div>
            {/* <Link to="/signup">Sign Up</Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
