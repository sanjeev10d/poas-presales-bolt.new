import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Ship, Clock, AlertTriangle, CheckCircle, Eye, Anchor } from 'lucide-react';

const BerthOperations: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const vesselData = [
    {
      id: 1,
      vesselName: 'MV COASTAL PRIDE',
      imoNumber: 'IMO9876543',
      vesselType: 'Bulk Carrier',
      flag: 'India',
      length: '225m',
      draft: '12.5m',
      captain: {
        name: 'Captain Rajesh Kumar',
        license: 'COC-IND-2019',
        crewCount: 24,
        nationality: 'Indian'
      },
      berthNumber: 'Berth-1',
      timeIn: '08:30 AM',
      timeOut: '02:15 PM',
      cargoType: 'Coal',
      cargoQuantity: '45,000 MT',
      berthUtilization: '85%',
      status: 'Completed',
      operatorName: 'Suresh Kumar',
      totalWeight: '45,000 MT',
      timeline: [
        { stage: 'Vessel Arrival at Anchorage', time: '06:00 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '07:30 AM', status: 'completed' },
        { stage: 'Berth Approach', time: '08:00 AM', status: 'completed' },
        { stage: 'Berthing Complete', time: '08:30 AM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '09:00 AM', status: 'completed' },
        { stage: 'Loading/Unloading Complete', time: '01:30 PM', status: 'completed' },
        { stage: 'Documentation Complete', time: '02:00 PM', status: 'completed' },
        { stage: 'Unberthing', time: '02:15 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '02:30 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '02:45 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      vesselName: 'MV OCEAN STAR',
      imoNumber: 'IMO9654321',
      vesselType: 'Container Ship',
      flag: 'Singapore',
      length: '180m',
      draft: '10.2m',
      captain: {
        name: 'Captain Lee Wei Ming',
        license: 'COC-SGP-2020',
        crewCount: 18,
        nationality: 'Singaporean'
      },
      berthNumber: 'Berth-3',
      timeIn: '10:15 AM',
      timeOut: '—',
      cargoType: 'Containers',
      cargoQuantity: '1,200 TEU',
      berthUtilization: '92%',
      status: 'In Progress',
      operatorName: 'Priya Sharma',
      totalWeight: '18,000 MT',
      timeline: [
        { stage: 'Vessel Arrival at Anchorage', time: '08:30 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '09:45 AM', status: 'completed' },
        { stage: 'Berth Approach', time: '10:00 AM', status: 'completed' },
        { stage: 'Berthing Complete', time: '10:15 AM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '10:45 AM', status: 'completed' },
        { stage: 'Loading/Unloading Complete', time: '—', status: 'in-progress' },
        { stage: 'Documentation Complete', time: '—', status: 'pending' },
        { stage: 'Unberthing', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Vessel Departure', time: '—', status: 'pending' }
      ]
    },
    {
      id: 3,
      vesselName: 'MV IRON DUKE',
      imoNumber: 'IMO9123456',
      vesselType: 'Bulk Carrier',
      flag: 'Marshall Islands',
      length: '200m',
      draft: '11.8m',
      captain: {
        name: 'Captain James Wilson',
        license: 'COC-MHL-2018',
        crewCount: 22,
        nationality: 'British'
      },
      berthNumber: 'Berth-2',
      timeIn: '07:45 AM',
      timeOut: '01:45 PM',
      cargoType: 'Iron Ore',
      cargoQuantity: '38,500 MT',
      berthUtilization: '78%',
      status: 'Completed',
      operatorName: 'Amit Singh',
      totalWeight: '38,500 MT',
      timeline: [
        { stage: 'Vessel Arrival at Anchorage', time: '05:30 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '07:15 AM', status: 'completed' },
        { stage: 'Berth Approach', time: '07:30 AM', status: 'completed' },
        { stage: 'Berthing Complete', time: '07:45 AM', status: 'completed' },
        { stage: 'Cargo Operations Start', time: '08:15 AM', status: 'completed' },
        { stage: 'Loading/Unloading Complete', time: '01:00 PM', status: 'completed' },
        { stage: 'Documentation Complete', time: '01:15 PM', status: 'completed' },
        { stage: 'Unberthing', time: '01:30 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '01:40 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '01:45 PM', status: 'completed' }
      ]
    }
  ];

  const columns = [
    { key: 'vesselName', label: 'Vessel Name' },
    { key: 'imoNumber', label: 'IMO Number' },
    { key: 'vesselType', label: 'Vessel Type' },
    { key: 'flag', label: 'Flag' },
    { key: 'length', label: 'Length' },
    { key: 'draft', label: 'Draft' },
    { 
      key: 'captain', 
      label: 'Captain',
      render: (row: any) => row.captain?.name || row.captain
    },
    { key: 'berthNumber', label: 'Berth' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'cargoQuantity', label: 'Cargo Quantity' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'timeIn', label: 'Berth Time' },
    { key: 'timeOut', label: 'Departure Time' },
    { key: 'berthUtilization', label: 'Berth Utilization' },
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
          subtitle="Average across all berths"
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
          <h3 className="text-lg font-semibold text-gray-900">Berth Operations - All Vessels</h3>
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
                    <span className="font-medium text-gray-600">Total Weight:</span>
                    <span className="text-gray-900">{selectedVessel.totalWeight}</span>
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
                    <span className="font-medium text-gray-600">Crew Count:</span>
                    <span className="text-gray-900">{selectedVessel.captain.crewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nationality:</span>
                    <span className="text-gray-900">{selectedVessel.captain.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operator:</span>
                    <span className="text-gray-900">{selectedVessel.operatorName}</span>
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

            {/* Berth Assignment and Cargo Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Berth Assignment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Berth Number:</span>
                    <span className="text-gray-900">{selectedVessel.berthNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Berth Time:</span>
                    <span className="text-gray-900">{selectedVessel.timeIn}</span>
                  </div>
                  {selectedVessel.timeOut !== '—' && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Departure Time:</span>
                      <span className="text-gray-900">{selectedVessel.timeOut}</span>
                    </div>
                  )}
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
                    <span className="font-medium text-gray-600">Cargo Type:</span>
                    <span className="text-gray-900">{selectedVessel.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Quantity:</span>
                    <span className="text-gray-900">{selectedVessel.cargoQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Operation Timeline */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Complete Vessel Operation Timeline</h4>
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