import React from 'react';
import StatCard from './ui/StatCard';
import { useToast } from '../hooks/useToast';
import { calculateVehicleStats, calculateAverageTurnaroundTime } from '../utils/dataCalculations';
import { TrendingUp, Ship, Truck, Train, Activity, AlertTriangle } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const { showSuccess, showInfo } = useToast();
  
  // Sample data for calculations (in real app, this would come from context/state)
  const sampleVehicleData = [
    { status: 'Completed', turnaroundTime: '2h 15m' },
    { status: 'In Progress', turnaroundTime: '2h 30m' },
    { status: 'Completed', turnaroundTime: '2h 45m' },
    { status: 'Completed', turnaroundTime: '2h 20m' },
    { status: 'Completed', turnaroundTime: '2h 10m' }
  ];
  
  const vehicleStats = calculateVehicleStats(sampleVehicleData);
  const avgTurnaround = calculateAverageTurnaroundTime(sampleVehicleData);
  
  const handleQuickAction = (action: string) => {
    showInfo('Quick Action', `${action} module accessed successfully`);
  };

  return (
    <div className="space-y-8">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vessels"
          value="23"
          subtitle="5 at berth, 18 at anchorage"
          icon={Ship}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Active Vehicles"
          value="147"
          subtitle="124 cargo, 30 non-cargo"
          icon={Truck}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Rake Operations"
          value="8"
          subtitle="3 loading, 2 unloading, 3 dispatched"
          icon={Train}
          trend={{ value: 5, isPositive: false }}
          color="purple"
        />
        <StatCard
          title="System Health"
          value="95%"
          subtitle="All systems operational"
          icon={Activity}
          trend={{ value: 2, isPositive: true }}
          color="teal"
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Live Operations Status - Large Card */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Live Operations Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">LIVE</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Gate Operations</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">154</p>
              <p className="text-sm text-blue-700">active vehicles</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Weighment Operations</span>
              </div>
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-green-700">vehicles in queue</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Berth Operations</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">5</p>
              <p className="text-sm text-purple-700">vessels docked</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Yard Allocation</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">72%</p>
              <p className="text-sm text-orange-700">utilization</p>
            </div>
          </div>
        </div>
        
        {/* Alerts Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Route Deviation</p>
                <p className="text-xs text-gray-600">Vehicle OR09AB2345 deviated</p>
                <p className="text-xs text-gray-500">2 min ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Queue Alert</p>
                <p className="text-xs text-gray-600">WB-3 exceeding threshold</p>
                <p className="text-xs text-gray-500">5 min ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Vessel Arrival</p>
                <p className="text-xs text-gray-600">MV COASTAL approaching</p>
                <p className="text-xs text-gray-500">8 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('Vessel Tracking')}
            className="p-6 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Vessel Tracking</span>
          </button>
          <button 
            onClick={() => handleQuickAction('Vehicle Status')}
            className="p-6 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Vehicle Status</span>
          </button>
          <button 
            onClick={() => handleQuickAction('Rake Schedule')}
            className="p-6 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <Train className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Rake Schedule</span>
          </button>
          <button 
            onClick={() => handleQuickAction('System Monitor')}
            className="p-6 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 text-center group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">System Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;