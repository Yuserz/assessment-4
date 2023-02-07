import React, { useState } from "react";
import { Chat, Navbar } from "../components";
import { MainLayout } from "../layout";

const Home = () => {
  return (
    <MainLayout>
      <div className="w-fit h-full flex flex-col">
        <Navbar />
        
        <div className="w-full h-full p-4 pr-6 mt-4">
          <p className="w-full px-3 py-1">Contacts</p>
        </div>
      </div>
      <div className="w-full h-auto bg-violet-200 flex items-end justify-center p-2">
        <Chat></Chat>
      </div>
    </MainLayout>
  );
};

export default Home;
