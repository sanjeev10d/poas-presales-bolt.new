import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Train, Clock, AlertTriangle, CheckCircle, Eye, Wrench, RotateCcw } from 'lucide-react';

const RakeOperations: React.FC = () => {
  const [selectedRake, setSelectedRake] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('regular');

  const rakeData = [
    {
      id: 1,
      rakeRefNo: 'RK-2024-001',
      wagonCount: 58,
      timeIn: '08:30 AM',
      timeOut: '02:15 PM',
      loadedWagons: 58,
      emptyWagons: 0,
      wtr: '5h 45m',
      alerts: 'None',
      sourceTerminal: 'Jharsuguda',
      status: 'Completed',
      cargoType: 'Coal',
      railwayPNNumber: 'RPN-2024-001',
      timeline: [
        { stage: 'Station Arrival', time: '08:15 AM', status: 'completed' },
        { stage: 'Station Departure', time: '08:30 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '08:45 AM', status: 'completed' },
        { stage: 'Hopper Placement', time: '08:55 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '01:30 PM', status: 'completed' },
        { stage: 'Rake Dispatch (Railway PN)', time: '02:00 PM', status: 'completed' },
        { stage: 'PRP Top Point Arrival', time: '02:10 PM', status: 'completed' },
        { stage: 'Station Arrival', time: '02:15 PM', status: 'completed' },
        { stage: 'Station Departure', time: '02:15 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      rakeRefNo: 'RK-2024-002',
      wagonCount: 60,
      timeIn: '10:15 AM',
      timeOut: '—',
      loadedWagons: 55,
      emptyWagons: 5,
      wtr: '6h 12m (ongoing)',
      alerts: 'Load Discrepancy',
      sourceTerminal: 'Talcher',
      status: 'In Progress',
      cargoType: 'Coal',
      railwayPNNumber: 'RPN-2024-002',
      timeline: [
        { stage: 'Station Arrival', time: '10:00 AM', status: 'completed' },
        { stage: 'Station Departure', time: '10:15 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '10:30 AM', status: 'completed' },
        { stage: 'Hopper Placement', time: '10:40 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '—', status: 'in-progress' },
        { stage: 'Rake Dispatch (Railway PN)', time: '—', status: 'pending' },
        { stage: 'PRP Top Point Arrival', time: '—', status: 'pending' },
        { stage: 'Station Arrival', time: '—', status: 'pending' },
        { stage: 'Station Departure', time: '—', status: 'pending' }
      ]
    }
  ];

  const bobrnRakeData = [
    {
      id: 1,
      rakeRefNo: 'BOBRN-2024-001',
      wagonCount: 55,
      timeIn: '07:45 AM',
      timeOut: '01:45 PM',
      loadedWagons: 55,
      emptyWagons: 0,
      wtr: '6h 00m',
      alerts: 'None',
      sourceTerminal: 'Barbil',
      status: 'Completed',
      cargoType: 'Iron Ore',
      railwayPNNumber: 'BOBRN-PN-2024-001',
      timeline: [
        { stage: 'Station Arrival', time: '07:30 AM', status: 'completed' },
        { stage: 'Station Departure', time: '07:45 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '08:00 AM', status: 'completed' },
        { stage: 'Hopper Placement', time: '08:15 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '01:00 PM', status: 'completed' },
        { stage: 'Rake Dispatch (Railway PN)', time: '01:15 PM', status: 'completed' },
        { stage: 'PRP Top Point Arrival', time: '01:30 PM', status: 'completed' },
        { stage: 'Station Arrival', time: '01:40 PM', status: 'completed' },
        { stage: 'Station Departure', time: '01:45 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      rakeRefNo: 'BOBRN-2024-002',
      wagonCount: 52,
      timeIn: '09:30 AM',
      timeOut: '—',
      loadedWagons: 48,
      emptyWagons: 4,
      wtr: '4h 15m (ongoing)',
      alerts: 'Delayed Unloading',
      sourceTerminal: 'Rourkela',
      status: 'In Progress',
      cargoType: 'Iron Ore',
      railwayPNNumber: 'BOBRN-PN-2024-002',
      timeline: [
        { stage: 'Station Arrival', time: '09:15 AM', status: 'completed' },
        { stage: 'Station Departure', time: '09:30 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '09:45 AM', status: 'completed' },
        { stage: 'Hopper Placement', time: '10:00 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '—', status: 'in-progress' },
        { stage: 'Rake Dispatch (Railway PN)', time: '—', status: 'pending' },
        { stage: 'PRP Top Point Arrival', time: '—', status: 'pending' },
        { stage: 'Station Arrival', time: '—', status: 'pending' },
        { stage: 'Station Departure', time: '—', status: 'pending' }
      ]
    }
  ];

  const columns = [
    { key: 'rakeRefNo', label: 'Rake Ref No.' },
    { key: 'wagonCount', label: 'Wagon Count' },
    { key: 'timeIn', label: 'In Time' },
    { key: 'timeOut', label: 'Out Time' },
    { key: 'loadedWagons', label: 'Loaded Wagons' },
    { key: 'emptyWagons', label: 'Empty Wagons' },
    { key: 'wtr', label: 'WTR' },
    { 
      key: 'alerts', 
      label: 'Alerts',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.alerts}
        </span>
      )
    },
    { key: 'sourceTerminal', label: 'Source Terminal' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedRake(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
          {row.status === 'In Progress' && (
            <>
              <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200">
                <Wrench className="w-3 h-3" />
                <span>Inspect</span>
              </button>
              <button className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                <RotateCcw className="w-3 h-3" />
                <span>Reprocess</span>
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('regular')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'regular'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Regular Rakes
          </button>
          <button
            onClick={() => setActiveTab('bobrn')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bobrn'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            BOBRN Rakes
          </button>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === 'regular' ? (
          <>
            <StatCard
              title="Active Rakes"
              value="3"
              subtitle="Currently in progress"
              icon={Train}
              color="blue"
            />
            <StatCard
              title="Completed Rakes"
              value="12"
              subtitle="Dispatched today"
              icon={CheckCircle}
              trend={{ value: 15, isPositive: true }}
              color="green"
            />
            <StatCard
              title="Exception Alerts"
              value="2"
              subtitle="Requires attention"
              icon={AlertTriangle}
              color="red"
            />
            <StatCard
              title="Avg WTR"
              value="5h 42m"
              subtitle="Wagon turnaround time"
              icon={Clock}
              trend={{ value: 8, isPositive: false }}
              color="orange"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Active BOBRN Rakes"
              value="1"
              subtitle="Currently in progress"
              icon={Train}
              color="blue"
            />
            <StatCard
              title="Completed BOBRN"
              value="8"
              subtitle="Dispatched today"
              icon={CheckCircle}
              trend={{ value: 12, isPositive: true }}
              color="green"
            />
            <StatCard
              title="Exception Alerts"
              value="1"
              subtitle="Requires attention"
              icon={AlertTriangle}
              color="red"
            />
            <StatCard
              title="Avg WTR"
              value="6h 15m"
              subtitle="Wagon turnaround time"
              icon={Clock}
              trend={{ value: 5, isPositive: false }}
              color="orange"
            />
          </>
        )}
      </div>

      {/* Rake Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeTab === 'regular' ? 'Regular Rake' : 'BOBRN Rake'} Operations Audit Logs
          </h3>
        </div>
        <div className="p-6">
          <DataTable data={activeTab === 'regular' ? rakeData : bobrnRakeData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRake && (
        <Modal
          isOpen={!!selectedRake}
          onClose={() => setSelectedRake(null)}
          title={`Rake Details - ${selectedRake.rakeRefNo}`}
          size="xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Rake Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Reference No:</span> {selectedRake.rakeRefNo}</p>
                  <p><span className="font-medium">Source Station:</span> {selectedRake.sourceTerminal}</p>
                  <p><span className="font-medium">Cargo Type:</span> {selectedRake.cargoType}</p>
                  <p><span className="font-medium">Total Wagons:</span> {selectedRake.wagonCount}</p>
                  <p><span className="font-medium">Railway PN Number:</span> {selectedRake.railwayPNNumber}</p>
                  <p><span className="font-medium">Port Entry Time:</span> {selectedRake.timeIn}</p>
                  {selectedRake.timeOut !== '—' && (
                    <p><span className="font-medium">Port Exit Time:</span> {selectedRake.timeOut}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Wagon Images</h4>
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="https://images.pexels.com/photos/2331733/pexels-photo-2331733.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop"
                    alt="Wagon In"
                    className="w-full h-20 object-cover rounded"
                  />
                  <img 
                    src="https://images.pexels.com/photos/2331733/pexels-photo-2331733.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop"
                    alt="Wagon Out"
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Wagon Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Loaded Wagons:</span> {selectedRake.loadedWagons}</p>
                  <p><span className="font-medium">Empty Wagons:</span> {selectedRake.emptyWagons}</p>
                  <p><span className="font-medium">WTR Time:</span> {selectedRake.wtr}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedRake.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedRake.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Alerts:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedRake.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedRake.alerts}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-4">Operation Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {selectedRake.timeline.map((stage: any, index: number) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  stage.status === 'completed' ? 'bg-green-50 border-green-200' :
                  stage.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                  'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    stage.status === 'completed' ? 'bg-green-500 text-white' :
                    stage.status === 'in-progress' ? 'bg-blue-500 text-white' :
                    'bg-slate-300 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-900">{stage.stage}</p>
                    <p className="text-xs text-slate-600">{stage.time}</p>
                  </div>
                  {index < selectedRake.timeline.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      stage.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RakeOperations;