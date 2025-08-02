import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { useToast } from '../hooks/useToast';
import { calculateBerthUtilization, calculateAverageTurnaroundTime } from '../utils/dataCalculations';
import { Ship, Clock, AlertTriangle, CheckCircle, Eye, Anchor } from 'lucide-react';

const BerthOperations: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const { showSuccess, showInfo } = useToast();

  const vesselData = [
    {
      id: 1,
      vesselName: 'MV Ocean Pioneer',
      imoNumber: 'IMO9234567',
      captain: {
        name: 'Captain Smith',
        license: 'ML-2024-001',
        crewCount: 24,
        nationality: 'British'
      },
      flag: 'Panama',
      length: 225,
      draft: 12.5,
      cargoQuantity: 45000,
      berthUtilization: '85%',
      arrivalTime: '06:30 AM',
      departureTime: '08:45 PM',
      berthNumber: 'B-01',
      status: 'Loading',
      cargoType: 'Coal',
      timeline: [
        { stage: 'Vessel Arrival', time: '06:15 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '06:30 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '06:45 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '07:00 AM', status: 'completed' },
        { stage: 'Loading Started', time: '07:30 AM', status: 'completed' },
        { stage: 'Loading Complete', time: '—', status: 'in-progress' },
        { stage: 'Unmooring', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Vessel Departure', time: '—', status: 'pending' }
      ]
    },
    {
      id: 2,
      vesselName: 'MV Cargo Master',
      imoNumber: 'IMO9345678',
      captain: {
        name: 'Captain Johnson',
        license: 'ML-2024-002',
        crewCount: 28,
        nationality: 'Norwegian'
      },
      flag: 'Liberia',
      length: 180,
      draft: 10.2,
      cargoQuantity: 32000,
      berthUtilization: '92%',
      arrivalTime: '10:15 AM',
      departureTime: '—',
      berthNumber: 'B-02',
      status: 'Unloading',
      cargoType: 'Iron Ore',
      timeline: [
        { stage: 'Vessel Arrival', time: '10:00 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '10:15 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '10:30 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '10:45 AM', status: 'completed' },
        { stage: 'Unloading Started', time: '11:00 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '—', status: 'in-progress' },
        { stage: 'Unmooring', time: '—', status: 'pending' },
        { stage: 'Pilot Disembark', time: '—', status: 'pending' },
        { stage: 'Vessel Departure', time: '—', status: 'pending' }
      ]
    }
    ,
    {
      id: 3,
      vesselName: 'MT Liquid Gold',
      imoNumber: 'IMO9456789',
      captain: {
        name: 'Captain Rodriguez',
        license: 'ML-2024-003',
        crewCount: 22,
        nationality: 'Spanish'
      },
      flag: 'Marshall Islands',
      length: 200,
      draft: 11.8,
      cargoQuantity: 38000,
      berthUtilization: '78%',
      arrivalTime: '08:00 AM',
      departureTime: '06:30 PM',
      berthNumber: 'T-01',
      status: 'Completed',
      cargoType: 'Crude Oil',
      timeline: [
        { stage: 'Vessel Arrival', time: '07:45 AM', status: 'completed' },
        { stage: 'Pilot Boarding', time: '08:00 AM', status: 'completed' },
        { stage: 'Berth Allocation', time: '08:15 AM', status: 'completed' },
        { stage: 'Mooring Complete', time: '08:30 AM', status: 'completed' },
        { stage: 'Discharge Started', time: '09:00 AM', status: 'completed' },
        { stage: 'Discharge Complete', time: '05:30 PM', status: 'completed' },
        { stage: 'Unmooring', time: '06:00 PM', status: 'completed' },
        { stage: 'Pilot Disembark', time: '06:15 PM', status: 'completed' },
        { stage: 'Vessel Departure', time: '06:30 PM', status: 'completed' }
      ]
    }
  ];

  // Calculate dynamic values from real data
  const berthStats = calculateBerthUtilization(vesselData);
  const avgTurnaround = calculateAverageTurnaroundTime(vesselData.map(v => ({ ...v, turnaroundTime: '12h 45m' })));
  const activeVessels = vesselData.filter(v => v.status !== 'Completed').length;
  const completedOperations = vesselData.filter(v => v.status === 'Completed').length;
  
  const handleViewDetails = (vessel: any) => {
    setSelectedVessel(vessel);
    showInfo('Vessel Details', `Viewing details for ${vessel.vesselName}`);
  };

  const columns = [
    { key: 'vesselName', label: 'Vessel Name' },
    { key: 'imoNumber', label: 'IMO Number' },
    { 
      key: 'captain', 
      label: 'Captain',
      render: (row: any) => row.captain?.name || row.captain
    },
    { key: 'flag', label: 'Flag' },
    { key: 'length', label: 'Length (m)' },
    { key: 'draft', label: 'Draft (m)' },
    { key: 'cargoQuantity', label: 'Cargo Quantity (MT)' },
    { key: 'berthUtilization', label: 'Berth Utilization' },
    { key: 'arrivalTime', label: 'Arrival Time' },
    { key: 'departureTime', label: 'Departure Time' },
    { key: 'berthNumber', label: 'Berth Number' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' :
          row.status === 'Loading' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Unloading' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { key: 'cargoType', label: 'Cargo Type' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
        >
          <Eye className="w-3 h-3" />
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
          value={activeVessels.toString()}
          subtitle="Currently at berth"
          icon={Ship}
          color="blue"
        />
        <StatCard
          title="Completed Operations"
          value={(completedOperations * 8).toString()}
          subtitle="Vessels departed today"
          icon={CheckCircle}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Berth Utilization"
          value={`${berthStats.utilization}%`}
          subtitle="Average utilization"
          icon={Anchor}
          trend={{ value: 5, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Avg Turnaround"
          value={avgTurnaround}
          subtitle="Average vessel time"
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Berth Operations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-gray-900">Vessel Operations</h3>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vessel Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Ship className="w-5 h-5 mr-2 text-blue-600" />
                Vessel Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Vessel Name:</span>
                  <span className="text-gray-900 font-semibold">{selectedVessel.vesselName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">IMO Number:</span>
                  <span className="text-gray-900">{selectedVessel.imoNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Flag:</span>
                  <span className="text-gray-900">{selectedVessel.flag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Length:</span>
                  <span className="text-gray-900">{selectedVessel.length}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Draft:</span>
                  <span className="text-gray-900">{selectedVessel.draft}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Berth Number:</span>
                  <span className="text-gray-900">{selectedVessel.berthNumber}</span>
                </div>
              </div>
            </div>
            
            {/* Captain & Crew Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Captain & Crew
              </h4>
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
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedVessel.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedVessel.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Berth Assignment Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Anchor className="w-5 h-5 mr-2 text-purple-600" />
                Berth Assignment
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Arrival Time:</span>
                  <span className="text-gray-900">{selectedVessel.arrivalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Departure Time:</span>
                  <span className="text-gray-900">{selectedVessel.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Berth Utilization:</span>
                  <span className="text-gray-900 font-semibold text-blue-600">{selectedVessel.berthUtilization}</span>
                </div>
              </div>
            </div>

            {/* Cargo Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Cargo Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Cargo Type:</span>
                  <span className="text-gray-900">{selectedVessel.cargoType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Quantity:</span>
                  <span className="text-gray-900">{selectedVessel.cargoQuantity} MT</span>
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
              {selectedVessel.timeline.map((stage: any, index: number) => (
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

export default BerthOperations;