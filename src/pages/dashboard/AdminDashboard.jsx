import React, { useState } from 'react';
import Header from '../../components/Header.jsx';
import { ManageDrivers, ManageOpAdmin, ManageRides,ViewUsers } from '../../components/adminFunctions/index.js';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const AdminDashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentView, setCurrentView] = useState('ManageDrivers');
   const { user, userType} = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
      if(!user || !userType){
        navigate("/")
      } 
    },[])
  const renderView = () => {
    switch (currentView) {
      case 'ManageDrivers':
        return <ManageDrivers />;
      case 'ManageOpAdmin':
        return <ManageOpAdmin />;
      case 'ManageRides':
        return <ManageRides />;
      case 'ViewUsers':
        return <ViewUsers />;
      default:
        return <div />;
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      <AdminSidebar expanded={expanded} setExpanded={setExpanded} setCurrentView={setCurrentView} />
      <div className="w-full overflow-hidden">
        <Header setExpanded={setExpanded} />
        {renderView()}
      </div>
    </div>
  );
};

export default AdminDashboard;