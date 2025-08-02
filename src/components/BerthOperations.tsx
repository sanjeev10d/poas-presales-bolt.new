import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Train, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

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
      operatorName: 'Suresh Kumar',
      destination: 'Terminal 1',
      totalWeight: '3480 MT',
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
      operatorName: 'Rajesh Patel',
      destination: 'Terminal 2',
      totalWeight: '3300 MT',
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
      operatorName: 'Amit Singh',
      destination: 'Terminal 3',
      totalWeight: '2700 MT',
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
      operatorName: 'Priya Sharma',
      destination: 'Terminal 4',
      totalWeight: '2880 MT',
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
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'sourceTerminal', label: 'Source Terminal' },
    { key: 'destination', label: 'Destination' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'timeIn', label: 'In Time' },
    { key: 'timeOut', label: 'Out Time' },
    { key: 'loadedWagons', label: 'Loaded Wagons' },
    { key: 'emptyWagons', label: 'Empty Wagons' },
    { key: 'totalWeight', label: 'Total Weight' },
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
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => setSelectedRake(row)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <span>View</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <nav className="flex space-x-2">
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border ${
                  stage.status === 'completed' ? 'bg-green-50 border-green-200' :

      {/* Statistics Cards */}
        <StatCard
          title="Active Vessels"
          value="2"
          subtitle="Currently at berth"
          icon={Ship}
          color="blue"
        />
        <StatCard
          title="Completed Operations"
          value="11"
          subtitle="Vessels departed today"
          icon={CheckCircle}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Berth Utilization"
          value="85%"
          subtitle="Average utilization"
          icon={Anchor}
          trend={{ value: 5, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Avg Turnaround"
          value="13h 15m"
          subtitle="Average vessel time"
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Rake Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900">Berth Operations - All Vessels</h3>
        </div>
        <div className="p-6">
          <DataTable data={vesselData} columns={columns} />
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
          <div className="space-y-6">
            {/* Rake Information Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Rake Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Reference No:</span>
                    <span className="text-gray-900">{selectedRake.rakeRefNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Source Station:</span>
                    <span className="text-gray-900">{selectedRake.sourceTerminal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Destination:</span>
                    <span className="text-gray-900">{selectedRake.destination}</span>
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
                    <span className="font-medium text-gray-600">Total Weight:</span>
                    <span className="text-gray-900">{selectedRake.totalWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Railway PN Number:</span>
                    <span className="text-gray-900">{selectedRake.railwayPNNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Operation Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operator:</span>
                    <span className="text-gray-900">{selectedRake.operatorName}</span>
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
                    <span className="text-gray-900">{selectedRake.wtr}</span>
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
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Complete Operation Timeline</h4>
              <div className="space-y-3">
                {selectedRake.timeline.map((stage: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      stage.status === 'completed' ? 'bg-green-500' :
                      stage.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                      <p className="text-xs text-gray-600">{stage.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                      stage.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {stage.status === 'completed' ? 'Completed' :
                       stage.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RakeOperations;