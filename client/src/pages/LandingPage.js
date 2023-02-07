import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { InputField } from "../components";

const Login = ({ isAuthenticated, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/LandingPage" />;
  }

  return (
    <div className="absolute bg-black/5 w-screen h-full top-0 left-0">
        Landing Page
    </div>
  );
};

export default Login;
