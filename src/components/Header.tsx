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
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{getModuleTitle(activeModule)}</h1>
          <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleString('en-IN', { 
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'short'
            })}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search operations..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
          
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-300">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Port Controller</p>
              <p className="text-slate-600">ICCC Operations</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;