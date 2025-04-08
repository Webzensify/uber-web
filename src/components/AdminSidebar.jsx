import React, { useState } from 'react';
import { FaUsers, FaFileAlt, FaChartBar, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = ({ expanded, setExpanded, setCurrentView }) => {
  const [selected, setSelected] = useState('ManageDrivers');
  const { logout, userType } = useAuth(); // Access userType from AuthContext

  const handleItemClick = (view) => {
    setCurrentView(view);
    setSelected(view);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`min-h-max min-w-[100vw] absolute sm:static sm:translate-x-0 ${!expanded && "-translate-x-full"} sm:min-w-min transition-all`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h2 className={`font-serif font-extrabold text-primary-dark transition-all overflow-hidden ${expanded ? "w-32" : "w-0"}`}>Admin Panel</h2>
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-primary">
            <FaBars />
          </button>
        </div>
        <ul className="flex-1 px-3">
          <SideBarItems
            expanded={expanded}
            icon={<FaUsers size={20} />}
            text="Manage Drivers"
            onClick={() => handleItemClick('ManageDrivers')}
            selected={selected === 'ManageDrivers'}
          />
          {userType === 'admin' && ( // Conditionally render "Manage Op Admin"
            <SideBarItems
              expanded={expanded}
              icon={<FaFileAlt size={20} />}
              text="Create Op Admin"
              onClick={() => handleItemClick('ManageOpAdmin')}
              selected={selected === 'ManageOpAdmin'}
            />
          )}
          <SideBarItems
            expanded={expanded}
            icon={<FaChartBar size={20} />}
            text="Manage Rides"
            onClick={() => handleItemClick('ManageRides')}
            selected={selected === 'ManageRides'}
          />
          {userType === 'admin' && (
          <SideBarItems
            expanded={expanded}
            icon={<FaUsers size={20} />}
            text="Passengers"
            onClick={() => handleItemClick('ViewUsers')}
            selected={selected === 'ViewUsers'}
          />
          )}
          <hr className="my-3" />
          <SideBarItems
            expanded={expanded}
            icon={<FaSignOutAlt size={20} />}
            text="Logout"
            onClick={handleLogout}
            selected={selected === 'Logout'}
          />

        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

function SideBarItems({ icon, text, expanded, onClick, selected }) {
  return (
    <li
      className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${selected ? 'bg-primary' : 'hover:bg-primary-light'}`}
      onClick={onClick}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-36 ml-3" : "w-0"}`}>{text}</span>
    </li>
  );
}