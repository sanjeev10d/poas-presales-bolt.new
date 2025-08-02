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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      timeOut: '02:15 PM',
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border ${
                  stage.status === 'completed' ? 'bg-green-50 border-green-200' :
      vesselName: 'MV Ocean Pioneer',
      imoNumber: 'IMO9876543',
      vesselType: 'Cargo',
      arrivalTime: '06:30 AM',
      departureTime: '08:45 PM',
      captain: { name: 'Captain Smith', license: 'ML-2024-001', crewCount: 24, nationality: 'British' },
      flag: 'Panama',
      length: '225m',
      draft: '12.5m',
      cargoQuantity: '45,000 MT',
      berthUtilization: '92%',
      turnaroundTime: '14h 15m',
      alerts: 'None',
      berthNumber: 'B-1',
      status: 'Completed',
      cargoType: 'Iron Ore',
      portAgent: 'Maritime Services Ltd',
      destination: 'Singapore',
      timeline: [
        { stage: 'Vessel Arrival', time: '06:15 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '06:30 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '06:45 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '07:00 AM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '07:30 AM', status: 'completed' },
        { stage: 'Loading Complete', time: '07:30 PM', status: 'completed' },
        { stage: 'Documentation', time: '08:00 PM', status: 'completed' },
        { stage: 'Unmooring', time: '08:30 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '08:45 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '08:45 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      vesselName: 'MT Coastal Star',
      imoNumber: 'IMO9654321',
      vesselType: 'Tanker',
      arrivalTime: '02:15 PM',
      departureTime: '—',
      captain: { name: 'Captain Johnson', license: 'ML-2024-002', crewCount: 18, nationality: 'Norwegian' },
      flag: 'Liberia',
      length: '180m',
      draft: '10.2m',
      cargoQuantity: '25,000 MT',
      berthUtilization: '78%',
      turnaroundTime: '12h 30m (ongoing)',
      alerts: 'Weather Delay',
      berthNumber: 'T-2',
      status: 'In Progress',
      cargoType: 'Crude Oil',
      portAgent: 'Ocean Logistics Inc',
      destination: 'Mumbai',
      timeline: [
        { stage: 'Vessel Arrival', time: '02:00 PM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '02:15 PM', status: 'completed' },
        { stage: 'Berth Allocation', time: '02:30 PM', status: 'completed' },
        { stage: 'Mooring Complete', time: '02:45 PM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '03:15 PM', status: 'completed' },
        { stage: 'Loading Complete', time: '—', status: 'in-progress' },
        { stage: 'Documentation', time: '—', status: 'pending' },
        { stage: 'Unmooring', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Vessel Departure', time: '—', status: 'pending' }
      ]
    }
  ];

  const columns = [
    { key: 'vesselName', label: 'Vessel Name' },
    { key: 'imoNumber', label: 'IMO Number' },
    { key: 'vesselType', label: 'Type' },
    { 
      key: 'captain', 
      label: 'Captain',
      render: (row: any) => row.captain?.name || row.captain
    },
    { key: 'flag', label: 'Flag' },
    { key: 'length', label: 'Length' },
    { key: 'draft', label: 'Draft' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'cargoQuantity', label: 'Cargo Quantity' },
    { key: 'berthNumber', label: 'Berth' },
    { key: 'destination', label: 'Destination' },
    { key: 'portAgent', label: 'Port Agent' },
    { key: 'arrivalTime', label: 'Arrival Time' },
    { key: 'departureTime', label: 'Departure Time' },
    { key: 'berthUtilization', label: 'Berth Utilization' },
    { key: 'turnaroundTime', label: 'Turnaround Time' },
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
          onClick={() => setSelectedVessel(row)}
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
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Berth Operations */}
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
      {selectedVessel && (
        <Modal
          isOpen={!!selectedVessel}
          onClose={() => setSelectedVessel(null)}
          title={`Vessel Details - ${selectedVessel.vesselName}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Vessel Information Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Vessel Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Vessel Name:</span>
                    <span className="text-gray-900">{selectedVessel.vesselName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">IMO Number:</span>
                    <span className="text-gray-900">{selectedVessel.imoNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Vessel Type:</span>
                    <span className="text-gray-900">{selectedVessel.vesselType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Flag:</span>
                    <span className="text-gray-900">{selectedVessel.flag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Length:</span>
                    <span className="text-gray-900">{selectedVessel.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Draft:</span>
                    <span className="text-gray-900">{selectedVessel.draft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Type:</span>
                    <span className="text-gray-900">{selectedVessel.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Quantity:</span>
                    <span className="text-gray-900">{selectedVessel.cargoQuantity}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Captain & Crew</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Captain:</span>
                    <span className="text-gray-900">{selectedVessel.captain?.name || selectedVessel.captain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">License:</span>
                    <span className="text-gray-900">{selectedVessel.captain?.license || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Crew Count:</span>
                    <span className="text-gray-900">{selectedVessel.captain?.crewCount || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nationality:</span>
                    <span className="text-gray-900">{selectedVessel.captain?.nationality || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Berth Assignment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Berth Number:</span>
                    <span className="text-gray-900">{selectedVessel.berthNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Arrival Time:</span>
                    <span className="text-gray-900">{selectedVessel.arrivalTime}</span>
                  </div>
                  {selectedVessel.departureTime !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Departure Time:</span>
                      <span className="text-gray-900">{selectedVessel.departureTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Turnaround Time:</span>
                    <span className="text-gray-900">{selectedVessel.turnaroundTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Berth Utilization:</span>
                    <span className="text-gray-900">{selectedVessel.berthUtilization}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Cargo Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Destination:</span>
                    <span className="text-gray-900">{selectedVessel.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Port Agent:</span>
                    <span className="text-gray-900">{selectedVessel.portAgent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVessel.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedVessel.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Alerts:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVessel.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedVessel.alerts}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Operation Timeline */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Complete Operation Timeline</h4>
              <div className="space-y-3">
                {selectedVessel.timeline.map((stage: any, index: number) => (
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

export default BerthOperations;
    }
  ]
}