import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { CreateDriver, UpdateFleet, ViewDriver, ViewRides } from '../../components/ownerFunctions/index.js';

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentView, setCurrentView] = useState('CreateDriver');

  const renderView = () => {
    switch (currentView) {
      case 'CreateDriver':
        return <CreateDriver />;
      case 'ViewDriver':
        return <ViewDriver />;
      case 'ViewRides':
        return <ViewRides />;
      case 'UpdateFleet':
        return <UpdateFleet />;
      default:
        return <div />;
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar expanded={expanded} setExpanded={setExpanded} setCurrentView={setCurrentView} />
      <div className="w-full overflow-hidden">
        <Header setExpanded={setExpanded} />
        {renderView()}
      </div>
    </div>
  );
};

export default Dashboard;