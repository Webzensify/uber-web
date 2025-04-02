import React, { useState } from "react";
import {
  FaUserPlus,
  FaUsers,
  FaCar,
  FaTasks,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
const OwnerSidebar = ({ expanded, setExpanded, setCurrentView }) => {
  const [selected, setSelected] = useState("CreateDriver");
  const { logout } = useAuth();
  const handleItemClick = (view) => {
    setCurrentView(view);
    setSelected(view);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <aside
      className={`min-h-max min-w-[100vw] absolute sm:static sm:translate-x-0 ${
        !expanded && "-translate-x-full"
      } sm:min-w-min transition-all`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h2
            className={`font-serif font-extrabold text-primary-dark transition-all overflow-hidden ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-primary"
          >
            <FaBars />
          </button>
        </div>
        <ul className="flex-1 px-3">
          <SideBarItems
            expanded={expanded}
            icon={<FaUserPlus size={20} />}
            text="Add Driver"
            onClick={() => handleItemClick("CreateDriver")}
            selected={selected === "CreateDriver"}
          />
          <SideBarItems
            expanded={expanded}
            icon={<FaUsers size={20} />}
            text="View Drivers"
            onClick={() => handleItemClick("ViewDriver")}
            selected={selected === "ViewDriver"}
          />
          <SideBarItems
            expanded={expanded}
            icon={<FaCar size={20} />}
            text="View Rides"
            onClick={() => handleItemClick("ViewRides")}
            selected={selected === "ViewRides"}
          />
          <SideBarItems
            expanded={expanded}
            icon={<FaTasks size={20} />}
            text="Fleet"
            onClick={() => handleItemClick("Fleet")}
            selected={selected === "Fleet"}
          />
          <hr className="my-3" />
          <SideBarItems
            expanded={expanded}
            icon={<FaSignOutAlt size={20} />}
            text="Logout"
            onClick={handleLogout}
            selected={selected === "Logout"}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default OwnerSidebar;

function SideBarItems({ icon, text, expanded, onClick, selected }) {
  return (
    <li
      className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        selected ? "bg-primary" : "hover:bg-primary-light"
      }`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-36 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}
