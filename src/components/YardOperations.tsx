import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Warehouse, PieChart, Clock, AlertTriangle, Eye, RotateCcw, Flag } from 'lucide-react';

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
      yardDetails: {
        yardType: 'Open',
        surfaceType: 'Paved',
        capacity: '5,000 MT',
        coordinates: '20.2648°N, 86.6993°E'
      },
      cargoDetails: {
        weight: '2,800 MT',
        volume: '2,150 m³',
        packaging: 'Bulk',
        hazardTag: 'None'
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
      yardDetails: {
        yardType: 'Covered',
        surfaceType: 'Concrete',
        capacity: '3,500 MT',
        coordinates: '20.2655°N, 86.6985°E'
      },
      cargoDetails: {
        weight: '3,200 MT',
        volume: '2,800 m³',
        packaging: 'Bagged',
        hazardTag: 'Chemical'
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
    { key: 'allocatedSpace', label: 'Allocated Space' },
    { key: 'occupiedSpace', label: 'Occupied Space' },
    { key: 'assignedVehicle', label: 'Assigned Vehicle' },
    { key: 'allocationTime', label: 'Allocation Time' },
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
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedAllocation(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
          {row.status === 'Overstacked' && (
            <>
              <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200">
                <RotateCcw className="w-3 h-3" />
                <span>Reallocate</span>
              </button>
              <button className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                <Flag className="w-3 h-3" />
                <span>Flag</span>
              </button>
            </>
          )}
        </div>
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
          value="78%"
          subtitle="Overall yard utilization"
          icon={PieChart}
          trend={{ value: 5, isPositive: true }}
          color="teal"
        />
        <StatCard
          title="Avg Dwell Time"
          value="4h 32m"
          subtitle="Average cargo stay duration"
          icon={Clock}
          trend={{ value: 12, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Cargo Distribution and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Cargo Type Distribution</h3>
          <div className="space-y-4">
            {cargoDistribution.map((cargo, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${cargo.color}`}></div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">{cargo.type}</span>
                  <span className="text-sm text-slate-600">{cargo.percentage}%</span>
                </div>
                <div className="w-24 bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${cargo.color}`}
                    style={{ width: `${cargo.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
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
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Yard Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Yard ID:</span> {selectedAllocation.yardNumber}</p>
                  <p><span className="font-medium">Yard Type:</span> {selectedAllocation.yardDetails.yardType}</p>
                  <p><span className="font-medium">Surface Type:</span> {selectedAllocation.yardDetails.surfaceType}</p>
                  <p><span className="font-medium">Capacity:</span> {selectedAllocation.yardDetails.capacity}</p>
                  <p><span className="font-medium">Coordinates:</span> {selectedAllocation.yardDetails.coordinates}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Stack Image</h4>
                <img 
                  src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                  alt="Yard stack view"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Allocation Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Allocation ID:</span> {selectedAllocation.allocationId}</p>
                  <p><span className="font-medium">Allocation Time:</span> {selectedAllocation.allocationTime}</p>
                  <p><span className="font-medium">Assigned Vehicle:</span> {selectedAllocation.assignedVehicle}</p>
                  <p><span className="font-medium">Allocated Space:</span> {selectedAllocation.allocatedSpace}</p>
                  <p><span className="font-medium">Occupied Space:</span> {selectedAllocation.occupiedSpace}</p>
                  <p><span className="font-medium">Utilization:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedAllocation.utilization > 100 ? 'bg-red-100 text-red-800' :
                      selectedAllocation.utilization > 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedAllocation.utilization}%
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Cargo Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Cargo Type:</span> {selectedAllocation.cargoType}</p>
                  <p><span className="font-medium">Weight:</span> {selectedAllocation.cargoDetails.weight}</p>
                  <p><span className="font-medium">Volume:</span> {selectedAllocation.cargoDetails.volume}</p>
                  <p><span className="font-medium">Packaging:</span> {selectedAllocation.cargoDetails.packaging}</p>
                  <p><span className="font-medium">Hazard Classification:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedAllocation.cargoDetails.hazardTag === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedAllocation.cargoDetails.hazardTag}
                    </span>
                  </p>
                </div>
              </div>
              
              {selectedAllocation.status === 'Overstacked' && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">Overstacking Warning</p>
                  <p className="text-xs text-red-600 mt-1">
                    Occupied space exceeds allocated limit. Immediate action required.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default YardOperations;