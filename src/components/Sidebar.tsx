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
    <div className="w-72 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Anchor className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">POAS</h1>
            <p className="text-slate-400 text-sm">Paradip Port Authority</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">System Status</p>
            <p className="text-xs text-green-400">All Systems Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;