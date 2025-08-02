import React from 'react';
import { Bell, Search, User, Clock } from 'lucide-react';

interface HeaderProps {
  activeModule: string;
}

const Header: React.FC<HeaderProps> = ({ activeModule }) => {
  const getModuleTitle = (module: string) => {
    const titles: { [key: string]: string } = {
      overview: 'Dashboard Overview',
      gate: 'Gate Operations',
      weighment: 'Weighment Operations',
      rake: 'Rake Operations',
      berth: 'Berth Operations',
      yard: 'Yard Allocation',
      resources: 'Resource Management',
      geofencing: 'Geofencing & Route Compliance'
    };
    return titles[module] || 'Dashboard';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-6 shadow-lg z-50">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{getModuleTitle(activeModule)}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'short'
            })}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search operations..."
              className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-64 lg:w-80 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          
          <button className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          <div className="hidden sm:flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Port Controller</p>
              <p className="text-gray-500">ICCC Operations</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;