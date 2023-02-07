import React from "react";

export default function Chat() {
  return (
    <div className="flex relative w-3/4 shadow-md h-40 rounded bg-white bborder ">
        <div className=" bg-slate-500 w-full">

        </div>
        <div className="h-fit w-full flex absolute bottom-0 align-baseline">
            <input 
            className="w-full h-4 p-4 border shadow-inner"
            type="text"
            placeholder="type a message..."
             />
        </div>        
    </div>
  );
}
