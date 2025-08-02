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
      wagonCount: 45,
      timeIn: '07:45 AM',
      timeOut: '01:45 PM',
      loadedWagons: 45,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rake Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Train className="w-5 h-5 mr-2 text-blue-600" />
                Rake Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Reference No:</span>
                  <span className="text-gray-900 font-semibold">{selectedRake.rakeRefNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Source Station:</span>
                  <span className="text-gray-900">{selectedRake.sourceTerminal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Cargo Type:</span>
                  <span className="text-gray-900">{selectedRake.cargoType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Total Wagons:</span>
                  <span className="text-gray-900">{selectedRake.wagonCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Railway PN Number:</span>
                  <span className="text-gray-900">{selectedRake.railwayPNNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Port Entry Time:</span>
                  <span className="text-gray-900">{selectedRake.timeIn}</span>
                </div>
                {selectedRake.timeOut !== '—' && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Port Exit Time:</span>
                    <span className="text-gray-900">{selectedRake.timeOut}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
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
            
            {/* Wagon Details Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Wagon Details
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Loaded Wagons:</span>
                  <span className="text-gray-900">{selectedRake.loadedWagons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Empty Wagons:</span>
                  <span className="text-gray-900">{selectedRake.emptyWagons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">WTR Time:</span>
                  <span className="text-gray-900 font-semibold text-blue-600">{selectedRake.wtr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedRake.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedRake.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Alerts:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedRake.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedRake.alerts}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Operation Timeline */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Operation Timeline
            </h4>
            <div className="space-y-3">
              {selectedRake.timeline.map((stage: any, index: number) => (
                <div key={index} className={`flex items-center justify-between p-4 bg-white rounded-lg border-l-4 ${
                  stage.status === 'completed' ? 'border-green-500' :
                  stage.status === 'in-progress' ? 'border-blue-500' :
                  'border-slate-300'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      stage.status === 'completed' ? 'bg-green-500 text-white' :
                      stage.status === 'in-progress' ? 'bg-blue-500 text-white' :
                      'bg-slate-300 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{stage.stage}</p>
                      <p className="text-xs text-slate-600">{stage.time}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                    stage.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {stage.status === 'completed' ? 'Completed' :
                     stage.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </div>
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