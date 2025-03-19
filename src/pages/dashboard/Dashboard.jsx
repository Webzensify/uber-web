import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { CreateDriver, UpdateFleet, ViewDriver, ViewRides } from '../../components/ownerFunctions/index.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentView, setCurrentView] = useState('CreateDriver');
  const { addDriver, addFleet } = useContext(AuthContext);

  const renderView = () => {
    switch (currentView) {
      case 'CreateDriver':
        return <CreateDriver addDriver={addDriver} />;
      case 'ViewDriver':
        return <ViewDriver />;
      case 'ViewRides':
        return <ViewRides />;
      case 'UpdateFleet':
        return <UpdateFleet addFleet={addFleet} />;
      default:
        return <div />;
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar expanded={expanded} setExpanded={setExpanded} setCurrentView={setCurrentView} />
      <div className="w-full overflow-hidden">
        <Header />
        <main className="p-4">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;