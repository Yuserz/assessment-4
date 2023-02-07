import React from "react"

export default function inputField(props) {
  return (
    <input
      {...props}
      className="form-control rounded-md p-2 w-full shadow-inner border bg-gray-100/40 outline-gray-300 "
    />
  )
}
