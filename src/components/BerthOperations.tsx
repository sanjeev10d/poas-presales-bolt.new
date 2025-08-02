import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Ship, Anchor, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const BerthOperations: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const vesselData = [
    {
      id: 1,
      vesselName: 'MV OCEAN PRIDE',
      imoNumber: 'IMO9876543',
      vesselType: 'Bulk Carrier',
      berthNumber: 'Berth-1',
      timeIn: '08:30 AM',
      timeOut: '02:15 PM',
      cargoType: 'Coal',
      cargoQuantity: '45,000 MT',
      status: 'Completed',
      captain: {
        name: 'Captain Smith',
        license: 'ML12345',
        nationality: 'Indian'
      },
      operatorName: 'Port Authority',
      dwt: '65,000 MT',
      loa: '225m',
      beam: '32m',
      draft: '12.5m',
      timeline: [
        { stage: 'Vessel Arrival', time: '08:15 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '08:30 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '08:45 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '09:00 AM', status: 'completed' },
        { stage: 'Loading Started', time: '09:30 AM', status: 'completed' },
        { stage: 'Loading Complete', time: '01:30 PM', status: 'completed' },
        { stage: 'Unmooring', time: '02:00 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '02:10 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '02:15 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      vesselName: 'MV COASTAL STAR',
      imoNumber: 'IMO9876544',
      vesselType: 'Container Ship',
      berthNumber: 'Berth-3',
      timeIn: '10:15 AM',
      timeOut: '—',
      cargoType: 'Containers',
      cargoQuantity: '1,200 TEU',
      status: 'In Progress',
      captain: {
        name: 'Captain Johnson',
        license: 'ML67890',
        nationality: 'British'
      },
      operatorName: 'Terminal Operator',
      dwt: '85,000 MT',
      loa: '280m',
      beam: '40m',
      draft: '14.2m',
      timeline: [
        { stage: 'Vessel Arrival', time: '10:00 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '10:15 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '10:30 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '10:45 AM', status: 'completed' },
        { stage: 'Loading Started', time: '11:00 AM', status: 'completed' },
        { stage: 'Loading Complete', time: '—', status: 'in-progress' },
        { stage: 'Unmooring', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Vessel Departure', time: '—', status: 'pending' }
      ]
    },
    {
      id: 3,
      vesselName: 'MV IRON DUKE',
      imoNumber: 'IMO9876545',
      vesselType: 'Ore Carrier',
      berthNumber: 'Berth-2',
      timeIn: '07:45 AM',
      timeOut: '01:45 PM',
      cargoType: 'Iron Ore',
      cargoQuantity: '52,000 MT',
      status: 'Completed',
      captain: {
        name: 'Captain Singh',
        license: 'ML11223',
        nationality: 'Indian'
      },
      operatorName: 'Bulk Terminal',
      dwt: '75,000 MT',
      loa: '240m',
      beam: '38m',
      draft: '13.8m',
      timeline: [
        { stage: 'Vessel Arrival', time: '07:30 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '07:45 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '08:00 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '08:15 AM', status: 'completed' },
        { stage: 'Loading Started', time: '08:30 AM', status: 'completed' },
        { stage: 'Loading Complete', time: '01:00 PM', status: 'completed' },
        { stage: 'Unmooring', time: '01:15 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '01:30 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '01:45 PM', status: 'completed' }
      ]
    }
  ];

  const columns = [
    { key: 'vesselName', label: 'Vessel Name' },
    { key: 'imoNumber', label: 'IMO Number' },
    { key: 'vesselType', label: 'Vessel Type' },
    { key: 'berthNumber', label: 'Berth Number' },
    { 
      key: 'captain', 
      label: 'Captain',
      render: (row: any) => row.captain?.name || row.captain
    },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'cargoQuantity', label: 'Cargo Quantity' },
    { key: 'timeIn', label: 'Arrival Time' },
    { key: 'timeOut', label: 'Departure Time' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'dwt', label: 'DWT' },
    { key: 'loa', label: 'LOA' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
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
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Berth Utilization"
          value="85%"
          subtitle="Average berth occupancy"
          icon={Anchor}
          trend={{ value: 8, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Avg Turnaround"
          value="13h 15m"
          subtitle="Average vessel turnaround"
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Berth Operations Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Berth Operations - All Vessels
          </h3>
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
                    <span className="font-medium text-gray-600">DWT:</span>
                    <span className="text-gray-900">{selectedVessel.dwt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">LOA:</span>
                    <span className="text-gray-900">{selectedVessel.loa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Beam:</span>
                    <span className="text-gray-900">{selectedVessel.beam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Draft:</span>
                    <span className="text-gray-900">{selectedVessel.draft}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Operation Details</h4>
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
                    <span className="font-medium text-gray-600">Berth Number:</span>
                    <span className="text-gray-900">{selectedVessel.berthNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Arrival Time:</span>
                    <span className="text-gray-900">{selectedVessel.timeIn}</span>
                  </div>
                  {selectedVessel.timeOut !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Departure Time:</span>
                      <span className="text-gray-900">{selectedVessel.timeOut}</span>
                    </div>
                  )}
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
                      selectedVessel.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedVessel.status}
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