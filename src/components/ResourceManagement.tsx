import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { useToast } from '../hooks/useToast';
import { calculateEquipmentStats } from '../utils/dataCalculations';
import { Settings, Activity, Wrench, AlertTriangle, Eye } from 'lucide-react';

const ResourceManagement: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const { showSuccess, showInfo } = useToast();

  const equipmentData = [
    {
      id: 1,
      equipmentId: 'CRN-032',
      type: 'Gantry Crane',
      lastUsed: '13:45',
      status: 'In Use',
      healthScore: 92,
      nextServiceDue: '03-Aug-25',
      issueReported: null,
      location: 'Berth 3',
      utilization: 78,
      operatorName: 'Suresh Kumar',
      shiftDuration: '8h',
      fuelConsumption: '45L/hr',
      loadCapacity: '45 MT',
      currentLoad: '32 MT',
      operationalHours: '142h',
      lastMaintenance: '15-Jul-2025',
      warrantyStatus: 'Active',
      maintenanceHistory: [
        { date: '15-Jul-2025', type: 'Routine Service', status: 'Completed', cost: '₹25,000' },
        { date: '20-Jun-2025', type: 'Hydraulic Repair', status: 'Completed', cost: '₹45,000' }
      ],
      telemetry: {
        operationalHours: 142,
        loadCapacity: '45 MT',
        temperature: '68°C',
        fuelLevel: '85%',
        hydraulicPressure: '210 bar',
        engineRPM: '1850 RPM'
      }
    },
    {
      id: 2,
      equipmentId: 'FLT-005',
      type: 'Forklift',
      lastUsed: '11:30',
      status: 'Under Repair',
      healthScore: 45,
      nextServiceDue: '06-Aug-25',
      issueReported: 'Hydraulic Leak',
      location: 'Yard 5',
      utilization: 0,
      operatorName: 'Rajesh Patel',
      shiftDuration: '0h',
      fuelConsumption: '0L/hr',
      loadCapacity: '5 MT',
      currentLoad: '0 MT',
      operationalHours: '0h',
      lastMaintenance: '10-Jul-2025',
      warrantyStatus: 'Expired',
      maintenanceHistory: [
        { date: '01-Aug-2025', type: 'Emergency Repair', status: 'In Progress', cost: '₹15,000' },
        { date: '10-Jul-2025', type: 'Routine Service', status: 'Completed', cost: '₹8,000' }
      ],
      telemetry: {
        operationalHours: 0,
        loadCapacity: '5 MT',
        temperature: 'N/A',
        fuelLevel: '45%',
        hydraulicPressure: 'N/A',
        engineRPM: 'N/A'
      }
    }
  ];

  const equipmentSummary = [
    { type: 'Cranes', total: 25, inUse: 12, available: 10, maintenance: 2, faulty: 1 },
    { type: 'Reach Stackers', total: 10, inUse: 6, available: 3, maintenance: 1, faulty: 0 },
    { type: 'Container Trailers', total: 40, inUse: 20, available: 15, maintenance: 3, faulty: 2 },
    { type: 'Forklifts', total: 15, inUse: 8, available: 5, maintenance: 1, faulty: 1 },
    { type: 'Tug Masters', total: 10, inUse: 4, available: 5, maintenance: 1, faulty: 0 }
  ];

  const predictiveMaintenanceData = [
    {
      equipmentId: 'CRN-021',
      riskLevel: 'High',
      componentAtRisk: 'Hydraulic Arm',
      daysToFailure: 3,
      recommendedAction: 'Schedule Inspection',
      confidenceLevel: '89%'
    },
    {
      equipmentId: 'TRL-019',
      riskLevel: 'Medium',
      componentAtRisk: 'Brake System',
      daysToFailure: 6,
      recommendedAction: 'Preventive Check',
      confidenceLevel: '76%'
    }
  ];

  // Calculate dynamic values from real data
  const equipmentStats = calculateEquipmentStats(equipmentData);
  
  const handleViewDetails = (equipment: any) => {
    setSelectedEquipment(equipment);
    showInfo('Equipment Details', `Viewing details for ${equipment.equipmentId}`);
  };

  const columns = [
    { key: 'equipmentId', label: 'Equipment ID' },
    { key: 'type', label: 'Type' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'location', label: 'Location' },
    { key: 'lastUsed', label: 'Last Used' },
    { key: 'operationalHours', label: 'Op. Hours' },
    { key: 'currentLoad', label: 'Current Load' },
    { key: 'fuelConsumption', label: 'Fuel Rate' },
    { key: 'lastMaintenance', label: 'Last Service' },
    { key: 'warrantyStatus', label: 'Warranty' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'In Use' ? 'bg-green-100 text-green-800' :
          row.status === 'Available' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Under Repair' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'healthScore', 
      label: 'Health Score',
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                row.healthScore >= 80 ? 'bg-green-500' :
                row.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${row.healthScore}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium min-w-max">{row.healthScore}%</span>
        </div>
      )
    },
    { key: 'nextServiceDue', label: 'Next Service' },
    { key: 'issueReported', label: 'Issue', render: (row: any) => row.issueReported || '—' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => handleViewDetails(row)}
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
          title="Total Equipment"
          value={equipmentStats.total.toString()}
          subtitle="Across all categories"
          icon={Settings}
          color="blue"
        />
        <StatCard
          title="Equipment In Use"
          value={equipmentStats.inUse.toString()}
          subtitle="Currently operational"
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Under Maintenance"
          value={equipmentStats.maintenance.toString()}
          subtitle="Scheduled & emergency"
          icon={Wrench}
          color="orange"
        />
        <StatCard
          title="High Risk Equipment"
          value={equipmentStats.highRisk.toString()}
          subtitle="Requires immediate attention"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Equipment Category Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Equipment Category Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 text-xs sm:text-sm font-medium text-slate-600">Equipment Type</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Total</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">In Use</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Available</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Maintenance</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Faulty</th>
              </tr>
            </thead>
            <tbody>
              {equipmentSummary.map((equipment, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-2 text-xs sm:text-sm font-medium text-slate-900">{equipment.type}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-slate-600">{equipment.total}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-green-600 font-medium">{equipment.inUse}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-blue-600">{equipment.available}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-orange-600">{equipment.maintenance}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-red-600">{equipment.faulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Predictive Maintenance Forecast</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 text-xs sm:text-sm font-medium text-slate-600">Equipment ID</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Risk Level</th>
                <th className="text-left py-2 px-2 text-xs sm:text-sm font-medium text-slate-600">Component at Risk</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Days to Failure</th>
                <th className="text-center py-2 px-1 text-xs sm:text-sm font-medium text-slate-600">Confidence</th>
                <th className="text-left py-2 px-2 text-xs sm:text-sm font-medium text-slate-600">Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {predictiveMaintenanceData.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 px-2 text-xs sm:text-sm font-medium text-slate-900">{item.equipmentId}</td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      item.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-xs sm:text-sm text-slate-600">{item.componentAtRisk}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-slate-900 font-medium">{item.daysToFailure}</td>
                  <td className="text-center py-3 px-1 text-xs sm:text-sm text-slate-600">{item.confidenceLevel}</td>
                  <td className="py-3 px-2 text-xs sm:text-sm text-slate-600">{item.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment Health & Service Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Equipment Health & Service Logs</h3>
        </div>
        <div className="p-6">
          <DataTable data={equipmentData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEquipment && (
        <Modal
          isOpen={!!selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          title={`Equipment Details - ${selectedEquipment.equipmentId}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Equipment Information Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Equipment Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Equipment ID:</span>
                    <span className="text-gray-900">{selectedEquipment.equipmentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Type:</span>
                    <span className="text-gray-900">{selectedEquipment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Current Location:</span>
                    <span className="text-gray-900">{selectedEquipment.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operator:</span>
                    <span className="text-gray-900">{selectedEquipment.operatorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Last Used:</span>
                    <span className="text-gray-900">{selectedEquipment.lastUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Shift Duration:</span>
                    <span className="text-gray-900">{selectedEquipment.shiftDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedEquipment.status === 'In Use' ? 'bg-green-100 text-green-800' :
                      selectedEquipment.status === 'Available' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedEquipment.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Utilization:</span>
                    <span className="text-gray-900">{selectedEquipment.utilization}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Operational Metrics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Load Capacity:</span>
                    <span className="text-gray-900">{selectedEquipment.loadCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Current Load:</span>
                    <span className="text-gray-900">{selectedEquipment.currentLoad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operational Hours:</span>
                    <span className="text-gray-900">{selectedEquipment.operationalHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Fuel Consumption:</span>
                    <span className="text-gray-900">{selectedEquipment.fuelConsumption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Last Maintenance:</span>
                    <span className="text-gray-900">{selectedEquipment.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Warranty Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedEquipment.warrantyStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedEquipment.warrantyStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Health Score:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedEquipment.healthScore >= 80 ? 'bg-green-100 text-green-800' :
                      selectedEquipment.healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedEquipment.healthScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sensor Telemetry */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Real-time Sensor Telemetry</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-medium text-gray-600">Temperature</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEquipment.telemetry.temperature}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-medium text-gray-600">Fuel Level</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEquipment.telemetry.fuelLevel}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-medium text-gray-600">Hydraulic Pressure</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEquipment.telemetry.hydraulicPressure}</p>
                </div>
              </div>
            </div>
            
            {/* Maintenance History */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Maintenance History</h4>
              <div className="space-y-3">
                {selectedEquipment.maintenanceHistory.map((maintenance: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{maintenance.type}</p>
                      <p className="text-sm text-gray-600">{maintenance.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        maintenance.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {maintenance.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{maintenance.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictive Analysis */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">AI-Powered Predictive Analysis</h4>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900">Equipment Assessment</p>
                <p className="text-sm text-blue-800 mt-1">
                  Equipment operating within normal parameters. Routine maintenance recommended as scheduled.
                </p>
              </div>
            </div>
            
            {selectedEquipment.issueReported && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Current Issue</p>
                <p className="text-sm text-red-700 mt-1">{selectedEquipment.issueReported}</p>
                <p className="text-xs text-red-600 mt-2">Immediate attention required to restore operational status.</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ResourceManagement;