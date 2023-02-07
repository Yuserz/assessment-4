import React, { useState } from "react";
import { Chat, Navbar } from "../components";
import { MainLayout } from "../layout";

const Home = () => {

  return (
    <MainLayout>
      <Navbar /> 
      <div className="w-full h-auto bg-gray-700 flex items-end justify-center">
        <Chat>
        </Chat>
      </div>
    </MainLayout>
  );
};

export default Home;
