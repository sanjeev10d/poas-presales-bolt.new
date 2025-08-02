import React from 'react';
import { 
  LayoutDashboard, 
  LogIn, 
  Scale, 
  Train, 
  Anchor, 
  Warehouse, 
  Settings, 
  MapPin,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'gate', label: 'Gate Operations', icon: LogIn },
  { id: 'weighment', label: 'Weighment Operations', icon: Scale },
  { id: 'rake', label: 'Rake Operations', icon: Train },
  { id: 'berth', label: 'Berth Operations', icon: Anchor },
  { id: 'yard', label: 'Yard Allocation', icon: Warehouse },
  { id: 'resources', label: 'Resource Management', icon: Settings },
  { id: 'geofencing', label: 'Geofencing & Routes', icon: MapPin },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  return (
    <div className="fixed left-0 top-0 w-64 lg:w-72 h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">POAS</h1>
            <p className="text-gray-500 text-sm hidden lg:block">Paradip Port Authority</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="flex-1 font-medium text-sm lg:text-base">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3 bg-green-50 rounded-xl">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">System Status</p>
            <p className="text-xs text-green-400">All Systems Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;