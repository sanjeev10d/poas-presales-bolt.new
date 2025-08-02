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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('regular')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === 'regular'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Regular Rakes
          </button>
          <button
            onClick={() => setActiveTab('bobrn')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex justify-between">
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border ${
                  stage.status === 'completed' ? 'bg-green-50 border-green-200' :
          <div className="space-y-6">
            {/* Vehicle and Route Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Vehicle & Route Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Vehicle Number:</span>
                    <span className="text-gray-900 font-semibold">{selectedVehicle.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Assigned Route:</span>
                    <span className="text-gray-900">{selectedVehicle.assignedRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Last Location:</span>
                    <span className="text-gray-900">{selectedVehicle.lastKnownLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Timestamp:</span>
                    <span className="text-gray-900">{selectedVehicle.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Route Efficiency:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedVehicle.routeEfficiency >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.routeEfficiency >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.routeEfficiency}%
                    </span>
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
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Driver Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Driver Name:</span>
                    <span className="text-gray-900">{selectedVehicle.driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Driver ID:</span>
                    <span className="text-gray-900">{selectedVehicle.driver.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Compliance Score:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedVehicle.driver.complianceScore >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.driver.complianceScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.driver.complianceScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Route Map Playback */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Route className="w-5 h-5 mr-2 text-purple-600" />
                Interactive Route Map Playback
              </h4>
              <div className="w-full h-64 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Route Visualization</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Interactive map showing vehicle movement and route compliance
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Assigned Route</span>
                    </div>
            {/* Route Deviation Analytics */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Route Deviation Analytics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Planned Distance</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVehicle.routeDetails.plannedDistance}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Actual Distance</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVehicle.routeDetails.actualDistance}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Deviation Points</p>
                  <p className="text-lg font-bold text-red-600">{selectedVehicle.routeDetails.deviationPoints}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Time Outside Corridor</p>
                  <p className="text-lg font-bold text-orange-600">{selectedVehicle.routeDetails.timeOutsideCorridor}</p>
                    </div>
                  </div>
            </div>
                      <p className="text-xs text-gray-600">{stage.time}</p>
            {/* Violation Summary */}
            {(selectedVehicle.deviationFlag || selectedVehicle.restrictedAreaEntry) && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="font-semibold text-red-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Violation Summary
                </h4>
                <div className="space-y-2 text-sm text-red-800">
                  {selectedVehicle.deviationFlag && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Route deviation detected - exceeded corridor boundaries</span>
                    </div>
                  )}
                  {selectedVehicle.restrictedAreaEntry && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Unauthorized entry into restricted zone</span>
                    </div>
                  )}
              </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RakeOperations;