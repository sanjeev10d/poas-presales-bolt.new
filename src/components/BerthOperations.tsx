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
      vesselDetails: {
        length: '225m',
        beam: '32m',
        draft: '12.5m',
        flag: 'India',
        lastPort: 'Kolkata'
      },
      captain: {
        name: 'Capt. Ravi Sharma',
        license: 'CP12345',
        crewCount: 22
      }
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
      vesselDetails: {
        length: '180m',
        beam: '28m',
        draft: '10.2m',
        flag: 'Singapore',
        lastPort: 'Chennai'
      },
      captain: {
        name: 'Capt. Lee Ming',
        license: 'CP67890',
        crewCount: 18
      }
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
    { key: 'anchorDownTime', label: 'Anchor Down' },
    { key: 'anchorUpTime', label: 'Anchor Up' },
    { key: 'gangwayIn', label: 'Gangway In' },
    { key: 'gangwayOut', label: 'Gangway Out' },
    { key: 'waitingTime', label: 'Waiting Time' },
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
          <span>View Details</span>
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
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Ship Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedVessel.shipName}</p>
                  <p><span className="font-medium">IMO Number:</span> {selectedVessel.shipId}</p>
                  <p><span className="font-medium">Flag:</span> {selectedVessel.vesselDetails.flag}</p>
                  <p><span className="font-medium">Length:</span> {selectedVessel.vesselDetails.length}</p>
                  <p><span className="font-medium">Beam:</span> {selectedVessel.vesselDetails.beam}</p>
                  <p><span className="font-medium">Draft:</span> {selectedVessel.vesselDetails.draft}</p>
                  <p><span className="font-medium">Last Port:</span> {selectedVessel.vesselDetails.lastPort}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Berth Assignment</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Assigned Berth:</span> {selectedVessel.assignedBerth}</p>
                  <p><span className="font-medium">Anchor Down:</span> {selectedVessel.anchorDownTime}</p>
                  {selectedVessel.gangwayIn !== '—' && (
                    <p><span className="font-medium">Gangway In:</span> {selectedVessel.gangwayIn}</p>
                  )}
                  {selectedVessel.gangwayOut !== '—' && (
                    <p><span className="font-medium">Gangway Out:</span> {selectedVessel.gangwayOut}</p>
                  )}
                  <p><span className="font-medium">Waiting Time:</span> {selectedVessel.waitingTime}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Captain & Crew Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Captain:</span> {selectedVessel.captain.name}</p>
                  <p><span className="font-medium">License:</span> {selectedVessel.captain.license}</p>
                  <p><span className="font-medium">Crew Count:</span> {selectedVessel.captain.crewCount}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Cargo Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Cargo Type:</span> {selectedVessel.cargoType}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedVessel.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedVessel.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Alert Flags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVessel.status === 'At Anchorage' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      Awaiting Berth Assignment
                    </span>
                  )}
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Security Cleared
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BerthOperations;