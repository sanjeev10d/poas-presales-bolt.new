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
            {/* Driver/Person Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                {selectedVehicle.driver ? 'Driver' : 'Person'} Details
              </h4>
              <div className="space-y-3 text-sm">
                {selectedVehicle.driver && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="text-gray-900">{selectedVehicle.driver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">License:</span>
                      <span className="text-gray-900">{selectedVehicle.driver.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Contact:</span>
                      <span className="text-gray-900">{selectedVehicle.driver.contact}</span>
                    </div>
                  </>
                )}
                {selectedVehicle.person && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="text-gray-900">{selectedVehicle.person.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">ID:</span>
                      <span className="text-gray-900">{selectedVehicle.person.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Department:</span>
                      <span className="text-gray-900">{selectedVehicle.person.department}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Vehicle Images - Only 3 images for cargo vehicles */}
          {selectedVehicle.cargoType && (
            <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-600" />
                Vehicle Images
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Front View</p>
                  <img 
                    src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                    alt="Vehicle front view"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Overhead View</p>
                  <img 
                    src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                    alt="Vehicle overhead view"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Number Plate</p>
                  <img 
                    src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                    alt="Vehicle number plate"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default RakeOperations;