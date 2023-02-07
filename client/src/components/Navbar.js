import * as React from "react";
import { NavLink } from "react-router-dom";

// Define the active/inactive class names in an object
const styles = {
  active: "p-2 font-bold text-gray-700 rounded-lg",
  inactive: "p-2",
};

export default function Navbar() {
  // Define the list of items to be rendered in the navbar
  const items = [
    {
      id: "1",
      title: "Home",
      path: "/",
    },
    {
      id: "2",
      title: "Contacts",
      path: "/Inventory",
    }
  ];

  
  return (
    <nav className="flex h-full w-1/4">
      <ul className="w-full h-full flex flex-col">
        {/* Use map() to generate the list items from the items array */}
        {items.map((item) => (
          <li key={item.id} className=" p-4">
            <NavLink
              to={item.path}
              // Use the styles object to determine the class name
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
