import React, { useState } from 'react';
import Header from '../../components/Header.jsx';
import { CreateDriver, UpdateFleet, ViewDriver, ViewRides } from '../../components/ownerFunctions/index.js';
import OwnerSidebar from '../../components/OwnerSidebar.jsx';

const OwnerDashboard = () => {
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
      <OwnerSidebar expanded={expanded} setExpanded={setExpanded} setCurrentView={setCurrentView} />
      <div className="w-full overflow-hidden">
        <Header setExpanded={setExpanded} />
        {renderView()}
      </div>
    </div>
  );
};

export default OwnerDashboard;