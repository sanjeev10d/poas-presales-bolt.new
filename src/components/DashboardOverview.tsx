import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import Chart from './ui/Chart';
import HeatMap from './ui/HeatMap';
import { useToast } from '../hooks/useToast';
import { calculateVehicleStats, calculateAverageTurnaroundTime } from '../utils/dataCalculations';
import { 
  TrendingUp, 
  Ship, 
  Truck, 
  Train, 
  Activity, 
  AlertTriangle, 
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  RefreshCw,
  ArrowRight,
  Eye,
  ChevronDown,
  TrendingDown
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveModule?: (module: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveModule = () => {} }) => {
  const { showSuccess, showInfo } = useToast();
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Sample data for calculations
  const sampleVehicleData = [
    { status: 'Completed', turnaroundTime: '2h 15m' },
    { status: 'In Progress', turnaroundTime: '2h 30m' },
    { status: 'Completed', turnaroundTime: '2h 45m' },
    { status: 'Completed', turnaroundTime: '2h 20m' },
    { status: 'Completed', turnaroundTime: '2h 10m' }
  ];
  
  const vehicleStats = calculateVehicleStats(sampleVehicleData);
  const avgTurnaround = calculateAverageTurnaroundTime(sampleVehicleData);

  // Chart data for visualizations
  const operationalTrendsData = [
    { label: 'Mon', value: 2650 },
    { label: 'Tue', value: 2890 },
    { label: 'Wed', value: 2420 },
    { label: 'Thu', value: 3100 },
    { label: 'Fri', value: 2847 },
    { label: 'Sat', value: 2200 },
    { label: 'Sun', value: 1850 }
  ];

  const cargoDistributionData = [
    { label: 'Coal', value: 520000 },
    { label: 'Iron Ore', value: 280000 },
    { label: 'Fertilizer', value: 150000 },
    { label: 'Containers', value: 50000 }
  ];

  // Realistic port terminal utilization data (vehicles per hour)
  const terminalUtilizationData = [
    { x: 'CB (MCHP)', y: '06:00-10:00', value: 245 },
    { x: 'IOB (IOHP)', y: '06:00-10:00', value: 312 },
    { x: 'GCB (CQ-1)', y: '06:00-10:00', value: 189 },
    { x: 'GCB (CQ-2)', y: '06:00-10:00', value: 276 },
    { x: 'GCB (MPB)', y: '06:00-10:00', value: 267 },
    { x: 'GCB (SQ)', y: '06:00-10:00', value: 198 },
    { x: 'AM/NS CQ-3', y: '06:00-10:00', value: 234 },
    { x: 'PEQCTPL EQ-1', y: '06:00-10:00', value: 287 },
    { x: 'PEQCTPL EQ-2', y: '06:00-10:00', value: 156 },
    { x: 'PEQCTPL EQ-3', y: '06:00-10:00', value: 203 },
    { x: 'PPL FB-1', y: '06:00-10:00', value: 178 },
    { x: 'IFFCO FB-2', y: '06:00-10:00', value: 245 },
    { x: 'KICT', y: '06:00-10:00', value: 298 },
    { x: 'JSWPTPL NIOB', y: '06:00-10:00', value: 167 },
    { x: 'PICT', y: '06:00-10:00', value: 221 },
    
    { x: 'CB (MCHP)', y: '10:00-14:00', value: 198 },
    { x: 'IOB (IOHP)', y: '10:00-14:00', value: 267 },
    { x: 'GCB (CQ-1)', y: '10:00-14:00', value: 234 },
    { x: 'GCB (CQ-2)', y: '10:00-14:00', value: 189 },
    { x: 'GCB (MPB)', y: '10:00-14:00', value: 312 },
    { x: 'GCB (SQ)', y: '10:00-14:00', value: 245 },
    { x: 'AM/NS CQ-3', y: '10:00-14:00', value: 278 },
    { x: 'PEQCTPL EQ-1', y: '10:00-14:00', value: 201 },
    { x: 'PEQCTPL EQ-2', y: '10:00-14:00', value: 289 },
    { x: 'PEQCTPL EQ-3', y: '10:00-14:00', value: 156 },
    { x: 'PPL FB-1', y: '10:00-14:00', value: 234 },
    { x: 'IFFCO FB-2', y: '10:00-14:00', value: 198 },
    { x: 'KICT', y: '10:00-14:00', value: 267 },
    { x: 'JSWPTPL NIOB', y: '10:00-14:00', value: 312 },
    { x: 'PICT', y: '10:00-14:00', value: 189 },
    
    { x: 'CB (MCHP)', y: '14:00-18:00', value: 312 },
    { x: 'IOB (IOHP)', y: '14:00-18:00', value: 189 },
    { x: 'GCB (CQ-1)', y: '14:00-18:00', value: 276 },
    { x: 'GCB (CQ-2)', y: '14:00-18:00', value: 245 },
    { x: 'GCB (MPB)', y: '14:00-18:00', value: 198 },
    { x: 'GCB (SQ)', y: '14:00-18:00', value: 289 },
    { x: 'AM/NS CQ-3', y: '14:00-18:00', value: 167 },
    { x: 'PEQCTPL EQ-1', y: '14:00-18:00', value: 245 },
    { x: 'PEQCTPL EQ-2', y: '14:00-18:00', value: 298 },
    { x: 'PEQCTPL EQ-3', y: '14:00-18:00', value: 234 },
    { x: 'PPL FB-1', y: '14:00-18:00', value: 189 },
    { x: 'IFFCO FB-2', y: '14:00-18:00', value: 276 },
    { x: 'KICT', y: '14:00-18:00', value: 201 },
    { x: 'JSWPTPL NIOB', y: '14:00-18:00', value: 267 },
    { x: 'PICT', y: '14:00-18:00', value: 312 },
    
    { x: 'CB (MCHP)', y: '18:00-22:00', value: 167 },
    { x: 'IOB (IOHP)', y: '18:00-22:00', value: 234 },
    { x: 'GCB (CQ-1)', y: '18:00-22:00', value: 198 },
    { x: 'GCB (CQ-2)', y: '18:00-22:00', value: 312 },
    { x: 'GCB (MPB)', y: '18:00-22:00', value: 276 },
    { x: 'GCB (SQ)', y: '18:00-22:00', value: 167 },
    { x: 'AM/NS CQ-3', y: '18:00-22:00', value: 289 },
    { x: 'PEQCTPL EQ-1', y: '18:00-22:00', value: 178 },
    { x: 'PEQCTPL EQ-2', y: '18:00-22:00', value: 234 },
    { x: 'PEQCTPL EQ-3', y: '18:00-22:00', value: 298 },
    { x: 'PPL FB-1', y: '18:00-22:00', value: 245 },
    { x: 'IFFCO FB-2', y: '18:00-22:00', value: 189 },
    { x: 'KICT', y: '18:00-22:00', value: 156 },
    { x: 'JSWPTPL NIOB', y: '18:00-22:00', value: 267 },
    { x: 'PICT', y: '18:00-22:00', value: 201 }
  ];
  
  // Additional chart data for enhanced visualizations
  const hourlyTrafficData = [
    { label: '00:00', value: 45 },
    { label: '04:00', value: 32 },
    { label: '08:00', value: 189 },
    { label: '12:00', value: 245 },
    { label: '16:00', value: 198 },
    { label: '20:00', value: 156 }
  ];

  const equipmentUtilizationData = [
    { label: 'Cranes', value: 89 },
    { label: 'Reach Stackers', value: 76 },
    { label: 'Forklifts', value: 82 },
    { label: 'Trailers', value: 94 }
  ];

  const handleQuickAction = (action: string, module: string) => {
    if (setActiveModule) {
      setActiveModule(module);
      showSuccess('Navigation', `Switched to ${action}`);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
    showSuccess('Data Refreshed', 'Dashboard data has been updated successfully');
  };

  const navigationCards = [
    {
      title: 'Gate Operations',
      description: 'Monitor vehicle entry/exit and security clearance',
      icon: Truck,
      module: 'gate',
      stats: { active: '2,847', completed: '3,247' },
      color: 'blue'
    },
    {
      title: 'Weighment Operations',
      description: 'Track cargo weighing and compliance',
      icon: Activity,
      module: 'weighment',
      stats: { queue: '47', success: '98.7%' },
      color: 'green'
    },
    {
      title: 'Rake Operations',
      description: 'Manage railway cargo operations',
      icon: Train,
      module: 'rake',
      stats: { active: '24', completed: '187' },
      color: 'purple'
    },
    {
      title: 'Berth Operations',
      description: 'Vessel docking and cargo handling',
      icon: Ship,
      module: 'berth',
      stats: { vessels: '12', utilization: '92%' },
      color: 'teal'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Port Operations Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vessels"
          value="89"
          subtitle="12 at berth, 77 at anchorage"
          icon={Ship}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Active Vehicles"
          value="2,847"
          subtitle="2,124 cargo, 723 non-cargo"
          icon={Truck}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Rake Operations"
          value="24"
          subtitle="8 loading, 6 unloading, 10 dispatched"
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

      {/* Advanced Visualizations Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Operational Trends Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Vehicle Traffic Trends</h3>
              <p className="text-sm text-gray-500">Daily vehicle movements over the past week</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-green-600">LIVE</span>
            </div>
          </div>
          
          <Chart
            type="area"
            data={operationalTrendsData}
            config={{
              colors: ['#3B82F6', '#10B981'],
              height: 300,
              showGrid: true,
              showLabels: true,
              animate: true
            }}
            className="mb-4"
          />
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Peak: Thursday (3,100 vehicles)</span>
            <span>Average: 2,565 vehicles/day</span>
          </div>
        </div>

        {/* Cargo Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Cargo Distribution</h3>
              <p className="text-sm text-gray-500">By cargo type</p>
            </div>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <Chart
            type="donut"
            data={cargoDistributionData}
            config={{
              colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
              height: 200,
              animate: true
            }}
            className="mb-4"
          />
          
          <div className="space-y-2">
            {cargoDistributionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] }}
                  ></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value} MT</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Traffic Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hourly Traffic Pattern</h3>
              <p className="text-sm text-gray-500">Vehicle movements by time of day</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-semibold">Peak at 12:00</span>
            </div>
          </div>
          
          <Chart
            type="bar"
            data={hourlyTrafficData}
            config={{
              colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
              height: 250,
              showGrid: true,
              animate: true
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Equipment Utilization</h3>
              <p className="text-sm text-gray-500">Current utilization rates by equipment type</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold">85% Avg</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {equipmentUtilizationData.map((item, index) => (
              <Chart
                key={index}
                type="progress"
                data={[item]}
                config={{
                  colors: [['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index]],
                  animate: true
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Utilization Heatmap */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">PPP Terminal Utilization Heatmap</h3>
            <p className="text-sm text-gray-500">Vehicle traffic across terminals and time periods</p>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Updated every 5 minutes</span>
          </div>
        </div>
        
        <div className="mb-4">
          <HeatMap
            data={terminalUtilizationData}
            colorScale={['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb']}
            className="w-full"
            interactive={true}
          />
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Higher values indicate more vehicle traffic. Peak hours: 10:00-14:00
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Quick Access Modules</h3>
            <p className="text-sm text-gray-500">Navigate to detailed operational views</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Modules
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
              purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
              teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
            };
            
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(card.title, card.module)}
                className="group p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[card.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {Object.entries(card.stats).map(([key, value], statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-sm font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent System Alerts</h3>
            <p className="text-sm text-gray-500">Latest operational notifications and warnings</p>
          </div>
          <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <Eye className="w-4 h-4" />
            <span>View All</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Route Deviation Alert</p>
              <p className="text-xs text-gray-600">Vehicle OR09AB2345 deviated from assigned route</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <button className="text-xs text-red-600 hover:text-red-700 font-medium">
              Investigate
            </button>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Queue Threshold Exceeded</p>
              <p className="text-xs text-gray-600">Weighbridge WB-3 queue time exceeding 15 minutes</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
            <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium">
              Monitor
            </button>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Ship className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Vessel Arrival Notification</p>
              <p className="text-xs text-gray-600">MV COASTAL STAR approaching Berth B-03</p>
              <p className="text-xs text-gray-500">8 minutes ago</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;