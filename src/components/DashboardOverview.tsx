import React from 'react';
import StatCard from './ui/StatCard';
import { TrendingUp, Ship, Truck, Train, Activity, AlertTriangle } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
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
          subtitle="89 cargo, 58 non-cargo"
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
          value="98.5%"
          subtitle="All systems operational"
          icon={Activity}
          trend={{ value: 2, isPositive: true }}
          color="teal"
        />
      </div>

      {/* Live Operations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Operations Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-slate-900">Gate Operations</span>
              </div>
              <span className="text-sm text-slate-600">147 active vehicles</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-slate-900">Weighment Operations</span>
              </div>
              <span className="text-sm text-slate-600">8 vehicles in queue</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-slate-900">Berth Operations</span>
              </div>
              <span className="text-sm text-slate-600">5 vessels docked</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-medium text-slate-900">Yard Allocation</span>
              </div>
              <span className="text-sm text-slate-600">78% utilization</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts & Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Route Deviation Alert</p>
                <p className="text-xs text-slate-600">Vehicle OR09AB2345 deviated from Route-17</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Weighbridge Queue Alert</p>
                <p className="text-xs text-slate-600">WB-3 queue exceeding threshold</p>
                <p className="text-xs text-slate-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Vessel Arrival</p>
                <p className="text-xs text-slate-600">MV COASTAL approaching berth 7</p>
                <p className="text-xs text-slate-500">8 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Ship className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-900">Vessel Tracking</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Truck className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-900">Vehicle Status</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Train className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-900">Rake Schedule</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center">
            <Activity className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-slate-900">System Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;