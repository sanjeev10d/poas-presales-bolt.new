import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Warehouse, PieChart, Clock, AlertTriangle, Eye } from 'lucide-react';

const YardOperations: React.FC = () => {
  const [selectedAllocation, setSelectedAllocation] = useState<any>(null);

  const allocationData = [
    {
      id: 1,
      allocationId: 'AL-Y001',
      yardNumber: 'YD-5',
      cargoType: 'Coal',
      allocatedSpace: '3,000 m²',
      occupiedSpace: '2,150 m²',
      assignedVehicle: 'Rake #232',
      allocationTime: '11:20 AM',
      status: 'Active',
      utilization: 72,
      operatorName: 'Rajesh Kumar',
      dwellTime: '4h 15m',
      stackHeight: '8.5m',
      moistureLevel: '12%',
      temperatureReading: '28°C',
      lastInspection: '10:45 AM',
      yardDetails: {
        yardType: 'Open',
        surfaceType: 'Paved',
        capacity: '5,000 MT',
        coordinates: '20.2648°N, 86.6993°E',
        drainageStatus: 'Good',
        accessRoad: 'Primary'
      },
      cargoDetails: {
        weight: '2,800 MT',
        volume: '2,150 m³',
        packaging: 'Bulk',
        hazardTag: 'None',
        qualityGrade: 'Grade A',
        sourceLocation: 'Jharsuguda'
      }
    },
    {
      id: 2,
      allocationId: 'AL-Y002',
      yardNumber: 'YD-3',
      cargoType: 'Fertilizer',
      allocatedSpace: '2,500 m²',
      occupiedSpace: '2,800 m²',
      assignedVehicle: 'Truck #AB123',
      allocationTime: '09:45 AM',
      status: 'Overstacked',
      utilization: 112,
      operatorName: 'Priya Sharma',
      dwellTime: '6h 30m',
      stackHeight: '12.2m',
      moistureLevel: '8%',
      temperatureReading: '32°C',
      lastInspection: '09:30 AM',
      yardDetails: {
        yardType: 'Covered',
        surfaceType: 'Concrete',
        capacity: '3,500 MT',
        coordinates: '20.2655°N, 86.6985°E',
        drainageStatus: 'Excellent',
        accessRoad: 'Secondary'
      },
      cargoDetails: {
        weight: '3,200 MT',
        volume: '2,800 m³',
        packaging: 'Bagged',
        hazardTag: 'Chemical',
        qualityGrade: 'Grade B',
        sourceLocation: 'Talcher'
      }
    }
  ];

  const cargoDistribution = [
    { type: 'Coal', percentage: 45, color: 'bg-slate-600' },
    { type: 'Fertilizer', percentage: 25, color: 'bg-green-500' },
    { type: 'Iron Ore', percentage: 20, color: 'bg-orange-500' },
    { type: 'Limestone', percentage: 10, color: 'bg-blue-500' }
  ];

  const columns = [
    { key: 'allocationId', label: 'Allocation ID' },
    { key: 'yardNumber', label: 'Yard Number' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'allocatedSpace', label: 'Allocated Space' },
    { key: 'occupiedSpace', label: 'Occupied Space' },
    { key: 'assignedVehicle', label: 'Assigned Vehicle' },
    { key: 'allocationTime', label: 'Allocation Time' },
    { key: 'dwellTime', label: 'Dwell Time' },
    { key: 'stackHeight', label: 'Stack Height' },
    { key: 'moistureLevel', label: 'Moisture %' },
    { key: 'temperatureReading', label: 'Temperature' },
    { key: 'lastInspection', label: 'Last Inspection' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' :
          row.status === 'Overstacked' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
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
          onClick={() => setSelectedAllocation(row)}
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
          title="Total Yards"
          value="24"
          subtitle="Available yard spaces"
          icon={Warehouse}
          color="blue"
        />
        <StatCard
          title="Occupied Yards"
          value="18"
          subtitle="Currently in use"
          icon={PieChart}
          color="green"
        />
        <StatCard
          title="Utilization Rate"
          value="72%"
          subtitle="Overall yard utilization"
          icon={PieChart}
          trend={{ value: 5, isPositive: true }}
          color="teal"
        />
        <StatCard
          title="Avg Dwell Time"
          value="4h 15m"
          subtitle="Average cargo stay duration"
          icon={Clock}
          trend={{ value: 12, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Cargo Distribution and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Cargo Type Distribution</h3>
          <div className="space-y-4">
            {cargoDistribution.map((cargo, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${cargo.color}`}></div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">{cargo.type}</span>
                  <span className="text-sm text-slate-600">{cargo.percentage}%</span>
                </div>
                <div className="w-16 sm:w-24 bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${cargo.color}`}
                    style={{ width: `${cargo.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Yard Alerts & Exceptions</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Overstacking Alert</p>
                <p className="text-xs text-slate-600">YD-3 exceeded allocated space by 12%</p>
                <p className="text-xs text-slate-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">High Dwell Time</p>
                <p className="text-xs text-slate-600">YD-7 cargo staying beyond expected duration</p>
                <p className="text-xs text-slate-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yard Allocation Audit */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Yard Allocation Audit Logs</h3>
        </div>
        <div className="p-6">
          <DataTable data={allocationData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAllocation && (
        <Modal
          isOpen={!!selectedAllocation}
          onClose={() => setSelectedAllocation(null)}
          title={`Yard Allocation - ${selectedAllocation.allocationId}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Yard and Allocation Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Yard Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Yard ID:</span>
                    <span className="text-gray-900">{selectedAllocation.yardNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Yard Type:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.yardType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Surface Type:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.surfaceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Capacity:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Coordinates:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.coordinates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Drainage Status:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.drainageStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Access Road:</span>
                    <span className="text-gray-900">{selectedAllocation.yardDetails.accessRoad}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Allocation Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Allocation ID:</span>
                    <span className="text-gray-900">{selectedAllocation.allocationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Allocation Time:</span>
                    <span className="text-gray-900">{selectedAllocation.allocationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Assigned Vehicle:</span>
                    <span className="text-gray-900">{selectedAllocation.assignedVehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operator:</span>
                    <span className="text-gray-900">{selectedAllocation.operatorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Allocated Space:</span>
                    <span className="text-gray-900">{selectedAllocation.allocatedSpace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Occupied Space:</span>
                    <span className="text-gray-900">{selectedAllocation.occupiedSpace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Utilization:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedAllocation.utilization > 100 ? 'bg-red-100 text-red-800' :
                      selectedAllocation.utilization > 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedAllocation.utilization}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Details and Environmental Conditions */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Cargo Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Type:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Weight:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoDetails.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Volume:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoDetails.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Packaging:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoDetails.packaging}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Quality Grade:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoDetails.qualityGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Source Location:</span>
                    <span className="text-gray-900">{selectedAllocation.cargoDetails.sourceLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Hazard Classification:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedAllocation.cargoDetails.hazardTag === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedAllocation.cargoDetails.hazardTag}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Environmental Conditions</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Dwell Time:</span>
                    <span className="text-gray-900">{selectedAllocation.dwellTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Stack Height:</span>
                    <span className="text-gray-900">{selectedAllocation.stackHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Moisture Level:</span>
                    <span className="text-gray-900">{selectedAllocation.moistureLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Temperature:</span>
                    <span className="text-gray-900">{selectedAllocation.temperatureReading}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Last Inspection:</span>
                    <span className="text-gray-900">{selectedAllocation.lastInspection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedAllocation.status === 'Active' ? 'bg-green-100 text-green-800' :
                      selectedAllocation.status === 'Overstacked' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedAllocation.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stack Image */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Yard Stack View</h4>
              <img 
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                alt="Yard stack view"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {selectedAllocation.status === 'Overstacked' && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Overstacking Warning</p>
                <p className="text-xs text-red-600 mt-1">
                  Occupied space exceeds allocated limit. Immediate action required to prevent safety hazards and operational inefficiencies.
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default YardOperations;