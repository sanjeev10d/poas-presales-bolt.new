import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import GateOperations from './components/GateOperations';
import WeighmentOperations from './components/WeighmentOperations';
import RakeOperations from './components/RakeOperations';
import BerthOperations from './components/BerthOperations';
import YardOperations from './components/YardOperations';
import ResourceManagement from './components/ResourceManagement';
import GeofencingOperations from './components/GeofencingOperations';

function App() {
  const [activeModule, setActiveModule] = useState('overview');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <DashboardOverview />;
      case 'gate':
        return <GateOperations />;
      case 'weighment':
        return <WeighmentOperations />;
      case 'rake':
        return <RakeOperations />;
      case 'berth':
        return <BerthOperations />;
      case 'yard':
        return <YardOperations />;
      case 'resources':
        return <ResourceManagement />;
      case 'geofencing':
        return <GeofencingOperations />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col">
        <Header activeModule={activeModule} />
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;