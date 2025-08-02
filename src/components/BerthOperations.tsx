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
            {/* OCR Ship Identification */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Ship className="w-5 h-5 mr-2 text-blue-600" />
                OCR Ship Identification System
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">Live Ship Detection</p>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                      alt="Ship with OCR detection"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* OCR Detection Overlay */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                      DETECTED: {selectedVessel.vesselName}
                    </div>
                    {/* Detection Zone Highlight */}
                    <div className="absolute bottom-6 left-6 right-6 h-12 border-2 border-green-400 bg-green-400 bg-opacity-20 rounded flex items-center justify-center">
                      <span className="text-green-800 text-xs font-bold bg-green-100 px-2 py-1 rounded">
                        OCR DETECTION ZONE
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Confidence: 96.4%</span>
                    <span className="text-green-600 font-medium">✓ VERIFIED</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">Ship Name Close-up</p>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                      alt="Ship name close-up"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* Ship Name Highlight Box */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-yellow-400 bg-opacity-30 border-2 border-yellow-500 rounded-lg px-8 py-4">
                        <span className="text-xl font-bold text-gray-900 bg-white px-3 py-1 rounded shadow-lg">
                          {selectedVessel.vesselName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-500">Auto-captured at {selectedVessel.arrivalTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Ship Identification */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">IMO Number Detection</p>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&fit=crop"
                      alt="IMO number detection"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-400 bg-opacity-30 border-2 border-blue-500 rounded px-4 py-2">
                        <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded">
                          {selectedVessel.imoNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">Flag Detection</p>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&fit=crop"
                      alt="Flag detection"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-purple-400 bg-opacity-30 border-2 border-purple-500 rounded px-4 py-2">
                        <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded">
                          {selectedVessel.flag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* OCR System Status */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800">OCR System Active</span>
                  </div>
                  <div className="text-xs text-green-600">
                    Last scan: {selectedVessel.arrivalTime} | Accuracy: 96.4%
                  </div>
                </div>
              </div>
            </div>

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
          
          {/* Vessel Operation Timeline */}
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
        </Modal>
      )}
    </div>
  );
};

export default BerthOperations;