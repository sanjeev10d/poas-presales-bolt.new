import React, { useState } from 'react';
import { useToast } from './hooks/useToast';
import { useBackgroundAlerts } from './hooks/useBackgroundAlerts';
import ToastContainer from './components/ui/ToastContainer';
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
  const { toasts, removeToast } = useToast();
  
  // Enable background alerts
  useBackgroundAlerts(true);

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
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 lg:w-72 flex-shrink-0">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 ml-0">
        <Header activeModule={activeModule} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          {renderActiveModule()}
        </main>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;