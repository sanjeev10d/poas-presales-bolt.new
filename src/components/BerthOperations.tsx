import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Ship, Anchor, Clock, TrendingUp, Eye } from 'lucide-react';

const BerthOperations: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const vesselData = [
    {
      id: 1,
      shipName: 'MV SUMATI',
      shipId: 'IMO9234567',
      anchorDownTime: '04:30 AM',
      anchorUpTime: '03:15 PM',
      gangwayIn: '05:10 AM',
      gangwayOut: '02:50 PM',
      waitingTime: '40m',
      assignedBerth: 'Berth 3',
      status: 'Completed',
      cargoType: 'Coal',
      captain: 'Capt. Ravi Sharma',
      flag: 'India',
      lastPort: 'Kolkata',
      vesselLength: '225m',
      draft: '12.5m',
      cargoQuantity: '45,000 MT',
      berthUtilization: '89%',
      vesselDetails: {
        length: '225m',
        beam: '32m',
        draft: '12.5m',
        flag: 'India',
        lastPort: 'Kolkata',
        dwt: '75,000 MT',
        grt: '42,500 GT'
      },
      captain: {
        name: 'Capt. Ravi Sharma',
        license: 'CP12345',
        crewCount: 22,
        nationality: 'Indian'
      },
      operationTimeline: [
        { stage: 'Vessel Spotted', time: '04:15 AM', status: 'completed' },
        { stage: 'Anchor Down', time: '04:30 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '04:45 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '05:00 AM', status: 'completed' },
        { stage: 'Gangway Connection', time: '05:10 AM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '05:30 AM', status: 'completed' },
        { stage: 'Cargo Operations Complete', time: '02:30 PM', status: 'completed' },
        { stage: 'Gangway Disconnection', time: '02:50 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '03:00 PM', status: 'completed' },
        { stage: 'Anchor Up', time: '03:15 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      shipName: 'MV ASHTA',
      shipId: 'IMO9876543',
      anchorDownTime: '06:45 AM',
      anchorUpTime: '—',
      gangwayIn: '—',
      gangwayOut: '—',
      waitingTime: '2h 30m (est.)',
      assignedBerth: 'Berth 5',
      status: 'At Anchorage',
      cargoType: 'Fertilizer',
      captain: 'Capt. Lee Ming',
      flag: 'Singapore',
      lastPort: 'Chennai',
      vesselLength: '180m',
      draft: '10.2m',
      cargoQuantity: '28,000 MT',
      berthUtilization: '—',
      vesselDetails: {
        length: '180m',
        beam: '28m',
        draft: '10.2m',
        flag: 'Singapore',
        lastPort: 'Chennai',
        dwt: '45,000 MT',
        grt: '28,500 GT'
      },
      captain: {
        name: 'Capt. Lee Ming',
        license: 'CP67890',
        crewCount: 18,
        nationality: 'Singaporean'
      },
      operationTimeline: [
        { stage: 'Vessel Spotted', time: '06:30 AM', status: 'completed' },
        { stage: 'Anchor Down', time: '06:45 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '—', status: 'pending' },
        { stage: 'Berth Allocation', time: '—', status: 'pending' },
        { stage: 'Gangway Connection', time: '—', status: 'pending' },
        { stage: 'Cargo Operations Start', time: '—', status: 'pending' },
        { stage: 'Cargo Operations Complete', time: '—', status: 'pending' },
        { stage: 'Gangway Disconnection', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Anchor Up', time: '—', status: 'pending' }
      ]
    }
  ];

  const berthStatus = [
    { id: 'Berth 1', status: 'Available', occupiedBy: null, nextScheduled: 'MV COASTAL (14:30)' },
    { id: 'Berth 2', status: 'Under Maintenance', occupiedBy: null, nextScheduled: null },
    { id: 'Berth 3', status: 'Occupied', occupiedBy: 'MV SUMATI', nextScheduled: 'MV OCEAN (18:00)' },
    { id: 'Berth 4', status: 'Available', occupiedBy: null, nextScheduled: null },
    { id: 'Berth 5', status: 'Reserved', occupiedBy: null, nextScheduled: 'MV ASHTA (Est. 15:00)' }
  ];

  const columns = [
    { key: 'shipName', label: 'Ship Name' },
    { key: 'shipId', label: 'IMO Number' },
    { key: 'assignedBerth', label: 'Berth' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'captain', label: 'Captain' },
    { key: 'flag', label: 'Flag' },
    { key: 'vesselLength', label: 'Length' },
    { key: 'draft', label: 'Draft' },
    { key: 'cargoQuantity', label: 'Cargo Qty' },
    { key: 'anchorDownTime', label: 'Anchor Down' },
    { key: 'anchorUpTime', label: 'Anchor Up' },
    { key: 'waitingTime', label: 'Waiting Time' },
    { key: 'berthUtilization', label: 'Berth Util.' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' : 
          row.status === 'At Anchorage' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {row.status}
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
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ships Docked"
          value="5"
          subtitle="Currently at berths"
          icon={Ship}
          color="blue"
        />
        <StatCard
          title="At Anchorage"
          value="18"
          subtitle="Awaiting berth assignment"
          icon={Anchor}
          trend={{ value: 12, isPositive: false }}
          color="orange"
        />
        <StatCard
          title="Avg Occupancy"
          value="6h 45m"
          subtitle="Average berth duration"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Berth Efficiency"
          value="89.5%"
          subtitle="Utilization rate"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          color="teal"
        />
      </div>

      {/* Berth Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Berth Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {berthStatus.map((berth) => (
            <div key={berth.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900">{berth.id}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  berth.status === 'Available' ? 'bg-green-100 text-green-800' :
                  berth.status === 'Occupied' ? 'bg-blue-100 text-blue-800' :
                  berth.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {berth.status}
                </span>
              </div>
              
              {berth.occupiedBy && (
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Current:</span> {berth.occupiedBy}
                </p>
              )}
              
              {berth.nextScheduled && (
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Next:</span> {berth.nextScheduled}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vessel Berthing Audit */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Vessel Berthing Audit</h3>
        </div>
        <div className="p-6">
          <DataTable data={vesselData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVessel && (
        <Modal
          isOpen={!!selectedVessel}
          onClose={() => setSelectedVessel(null)}
          title={`Vessel Details - ${selectedVessel.shipName}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Vessel Information Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Vessel Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Ship Name:</span>
                    <span className="text-gray-900">{selectedVessel.shipName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">IMO Number:</span>
                    <span className="text-gray-900">{selectedVessel.shipId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Flag:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.flag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Length:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Beam:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.beam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Draft:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.draft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">DWT:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.dwt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">GRT:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.grt}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Captain & Crew Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Captain:</span>
                    <span className="text-gray-900">{selectedVessel.captain.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">License:</span>
                    <span className="text-gray-900">{selectedVessel.captain.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nationality:</span>
                    <span className="text-gray-900">{selectedVessel.captain.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Crew Count:</span>
                    <span className="text-gray-900">{selectedVessel.captain.crewCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Berth Assignment & Cargo Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Berth Assignment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Assigned Berth:</span>
                    <span className="text-gray-900">{selectedVessel.assignedBerth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Anchor Down:</span>
                    <span className="text-gray-900">{selectedVessel.anchorDownTime}</span>
                  </div>
                  {selectedVessel.gangwayIn !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Gangway In:</span>
                      <span className="text-gray-900">{selectedVessel.gangwayIn}</span>
                    </div>
                  )}
                  {selectedVessel.gangwayOut !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Gangway Out:</span>
                      <span className="text-gray-900">{selectedVessel.gangwayOut}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Waiting Time:</span>
                    <span className="text-gray-900">{selectedVessel.waitingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Last Port:</span>
                    <span className="text-gray-900">{selectedVessel.vesselDetails.lastPort}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Cargo Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Type:</span>
                    <span className="text-gray-900">{selectedVessel.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Quantity:</span>
                    <span className="text-gray-900">{selectedVessel.cargoQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVessel.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedVessel.status}
                    </span>
                  </div>
                  {selectedVessel.berthUtilization !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Berth Utilization:</span>
                      <span className="text-gray-900">{selectedVessel.berthUtilization}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Operation Timeline */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Vessel Operation Timeline</h4>
              <div className="space-y-3">
                {selectedVessel.operationTimeline.map((stage: any, index: number) => (
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