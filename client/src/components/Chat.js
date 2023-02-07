import React from "react";
import { Message } from "./";

export default function Chat() {
  return (
    <div className="flex relative w-full h-full  overflow-hidden bg-white bborder rounded-md">
        <div className=" bg-gray-100 w-full">
            <Message />
        </div>
        <div className="h-fit w-full flex absolute bottom-0 align-baseline gap-1  p-1">
            <input 
            className="w-full h-12 p-4 border shadow-inner bg-gray-100/40 outline-none rounded-md "
            type="text"
            placeholder="type a message..."
             />
             <button className="p-2 border hover:text-white  hover:bg-violet-300 rounded-md text">Send</button>
        </div>        
    </div>
  );
}
