import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Settings, Activity, Wrench, AlertTriangle, Eye, Calendar, Flag } from 'lucide-react';

const ResourceManagement: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

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
      maintenanceHistory: [
        { date: '15-Jul-25', type: 'Routine Service', status: 'Completed' },
        { date: '20-Jun-25', type: 'Hydraulic Repair', status: 'Completed' }
      ],
      telemetry: {
        operationalHours: 142,
        loadCapacity: '45 MT',
        temperature: '68°C',
        fuelLevel: '85%'
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
      maintenanceHistory: [
        { date: '01-Aug-25', type: 'Emergency Repair', status: 'In Progress' },
        { date: '10-Jul-25', type: 'Routine Service', status: 'Completed' }
      ],
      telemetry: {
        operationalHours: 0,
        loadCapacity: '5 MT',
        temperature: 'N/A',
        fuelLevel: '45%'
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
      recommendedAction: 'Schedule Inspection'
    },
    {
      equipmentId: 'TRL-019',
      riskLevel: 'Medium',
      componentAtRisk: 'Brake System',
      daysToFailure: 6,
      recommendedAction: 'Preventive Check'
    }
  ];

  const columns = [
    { key: 'equipmentId', label: 'Equipment ID' },
    { key: 'type', label: 'Type' },
    { key: 'lastUsed', label: 'Last Used' },
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
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedEquipment(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
          {row.status !== 'In Use' && (
            <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200">
              <Calendar className="w-3 h-3" />
              <span>Schedule</span>
            </button>
          )}
          <button className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
            <Flag className="w-3 h-3" />
            <span>Flag</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Equipment"
          value="100"
          subtitle="Across all categories"
          icon={Settings}
          color="blue"
        />
        <StatCard
          title="Equipment In Use"
          value="50"
          subtitle="Currently operational"
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Under Maintenance"
          value="7"
          subtitle="Scheduled & emergency"
          icon={Wrench}
          color="orange"
        />
        <StatCard
          title="High Risk Equipment"
          value="3"
          subtitle="Requires immediate attention"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Equipment Category Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Equipment Category Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-sm font-medium text-slate-600">Equipment Type</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Total</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">In Use</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Available</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Maintenance</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Faulty</th>
              </tr>
            </thead>
            <tbody>
              {equipmentSummary.map((equipment, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 text-sm font-medium text-slate-900">{equipment.type}</td>
                  <td className="text-center py-3 text-sm text-slate-600">{equipment.total}</td>
                  <td className="text-center py-3 text-sm text-green-600 font-medium">{equipment.inUse}</td>
                  <td className="text-center py-3 text-sm text-blue-600">{equipment.available}</td>
                  <td className="text-center py-3 text-sm text-orange-600">{equipment.maintenance}</td>
                  <td className="text-center py-3 text-sm text-red-600">{equipment.faulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Predictive Maintenance Forecast</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-sm font-medium text-slate-600">Equipment ID</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Risk Level</th>
                <th className="text-left py-2 text-sm font-medium text-slate-600">Component at Risk</th>
                <th className="text-center py-2 text-sm font-medium text-slate-600">Days to Failure</th>
                <th className="text-left py-2 text-sm font-medium text-slate-600">Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {predictiveMaintenanceData.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-3 text-sm font-medium text-slate-900">{item.equipmentId}</td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      item.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-slate-600">{item.componentAtRisk}</td>
                  <td className="text-center py-3 text-sm text-slate-900 font-medium">{item.daysToFailure}</td>
                  <td className="py-3 text-sm text-slate-600">{item.recommendedAction}</td>
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
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Equipment Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Equipment ID:</span> {selectedEquipment.equipmentId}</p>
                  <p><span className="font-medium">Type:</span> {selectedEquipment.type}</p>
                  <p><span className="font-medium">Current Location:</span> {selectedEquipment.location}</p>
                  <p><span className="font-medium">Last Used:</span> {selectedEquipment.lastUsed}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedEquipment.status === 'In Use' ? 'bg-green-100 text-green-800' :
                      selectedEquipment.status === 'Available' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedEquipment.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Utilization:</span> {selectedEquipment.utilization}%</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Maintenance History</h4>
                <div className="space-y-2">
                  {selectedEquipment.maintenanceHistory.map((maintenance: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
                      <div>
                        <p className="font-medium">{maintenance.type}</p>
                        <p className="text-slate-600">{maintenance.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        maintenance.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {maintenance.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Sensor Telemetry</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Operational Hours Today:</span> {selectedEquipment.telemetry.operationalHours}</p>
                  <p><span className="font-medium">Load Capacity:</span> {selectedEquipment.telemetry.loadCapacity}</p>
                  <p><span className="font-medium">Temperature:</span> {selectedEquipment.telemetry.temperature}</p>
                  <p><span className="font-medium">Fuel/Battery Level:</span> {selectedEquipment.telemetry.fuelLevel}</p>
                  <p><span className="font-medium">Health Score:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedEquipment.healthScore >= 80 ? 'bg-green-100 text-green-800' :
                      selectedEquipment.healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedEquipment.healthScore}%
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Predictive Analysis</h4>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">AI-Generated Assessment</p>
                  <p className="text-sm text-blue-800 mt-1">
                    {selectedEquipment.healthScore >= 80 
                      ? "Equipment operating within normal parameters. Routine maintenance recommended as scheduled."
                      : selectedEquipment.healthScore >= 60
                      ? "Minor performance degradation detected. Consider preventive maintenance within the next week."
                      : "Significant issues detected. Immediate inspection and repair required to prevent failure."
                    }
                  </p>
                </div>
              </div>
              
              {selectedEquipment.issueReported && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">Current Issue</p>
                  <p className="text-sm text-red-700 mt-1">{selectedEquipment.issueReported}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ResourceManagement;