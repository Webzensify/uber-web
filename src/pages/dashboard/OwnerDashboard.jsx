import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import {
  CreateDriver,
  Fleet,
  ViewDriver,
  ViewRides,
  Profile,
} from "../../components/ownerFunctions/index.js";

import OwnerSidebar from "../../components/OwnerSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentView, setCurrentView] = useState("CreateDriver");
  const { user, userType} = useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user || !userType || userType != 'owner'){
      navigate("/")
    } 
  },[])
  const renderView = () => {
    switch (currentView) {
      case "CreateDriver":
        return <CreateDriver />;
      case "ViewDriver":
        return <ViewDriver />;
      case "ViewRides":
        return <ViewRides />;
      case "Fleet":
        return <Fleet />;
      case "Profile":
        return <Profile />;
      default:
        return <div />;
    }
  };
  return (

    <div className="flex bg-white min-h-screen">
      <OwnerSidebar
        expanded={expanded}
        setExpanded={setExpanded}
        setCurrentView={setCurrentView}
      />
      <div className="w-full overflow-hidden">
        <Header setExpanded={setExpanded} />
        {renderView()}
      </div>
    </div>
  );
};

export default OwnerDashboard;
