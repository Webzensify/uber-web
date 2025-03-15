import React from 'react';
import { FaBars } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const Header = ({ setExpanded }) => {
  return (
    <div className="bg-white min-w-full h-[7.5vh] flex justify-between py-2 px-1">
      <button onClick={() => setExpanded((curr) => !curr)} className="sm:hidden p-1.5 rounded-lg h-min bg-primary">
        <span className="text-black"><FaBars/> </span>
      </button>
      <div className="flex items-center w-full p-4">
        <span className="text-lg font-semibold text-right w-full">Welcome, Owner Name</span>
      </div>
    </div>
  );
};

export default Header;