import React from "react";
import { Navbar } from ".";

export default function Header() {
  return (
    <div className="flex bg-white sm:pr-5 sm:pl-5 p-3 md:pr-10 md:pl-10 select-none shadow-md justify-between items-center h-24 m-auto">
      <Navbar></Navbar>
    </div>
  );
}
