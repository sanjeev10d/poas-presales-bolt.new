import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Truck, Users, Clock, Eye, CheckCircle, XCircle } from 'lucide-react';

const GateOperations: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'cargo' | 'non-cargo'>('cargo');

  const cargoVehicleData = [
    {
      id: 1,
      vehicleNumber: 'OR09AB2345',
      cargoType: 'Coal',
      timeIn: '09:15 AM',
      timeOut: '11:30 AM',
      turnaroundTime: '2h 15m',
      verificationType: 'ANPR',
      status: 'Completed',
      driver: { name: 'Ram Kumar', license: 'DL12345', contact: '9876543210' },
      images: { front: '/api/placeholder/300/200', top: '/api/placeholder/300/200' }
    },
    {
      id: 2,
      vehicleNumber: 'OD25AK9901',
      cargoType: 'Fertilizer',
      timeIn: '10:20 AM',
      timeOut: '—',
      turnaroundTime: '3h 42m (ongoing)',
      verificationType: 'QR Code',
      status: 'In Progress',
      driver: { name: 'Suresh Patel', license: 'DL67890', contact: '9876543211' },
      images: { front: '/api/placeholder/300/200', top: '/api/placeholder/300/200' }
    }
  ];

  const nonCargoVehicleData = [
    {
      id: 1,
      vehicleNumber: 'OR05JK8870',
      vehicleType: 'Car',
      timeIn: '08:45 AM',
      timeOut: '09:15 AM',
      turnaroundTime: '30m',
      person: { name: 'Priya Sharma', id: 'EMP001', department: 'Operations' }
    }
  ];

  const cargoColumns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { key: 'turnaroundTime', label: 'Turnaround Time' },
    { key: 'verificationType', label: 'Verification' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => setSelectedVehicle(row)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      )
    }
  ];

  const nonCargoColumns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'vehicleType', label: 'Vehicle Type' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { key: 'turnaroundTime', label: 'Turnaround Time' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => setSelectedVehicle(row)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('cargo')}
            className={`py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === 'cargo'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cargo Vehicle Movement
          </button>
          <button
            onClick={() => setActiveTab('non-cargo')}
            className={`py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === 'non-cargo'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pedestrian & Non-Cargo Movement
          </button>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === 'cargo' ? (
          <>
            <StatCard
              title="Vehicles In"
              value="89"
              subtitle="Today's inbound cargo vehicles"
              icon={Truck}
              trend={{ value: 12, isPositive: true }}
              color="blue"
            />
            <StatCard
              title="Vehicles Out"
              value="76"
              subtitle="Today's outbound vehicles"
              icon={CheckCircle}
              trend={{ value: 8, isPositive: true }}
              color="green"
            />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600">LIVE</span>
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm font-semibold text-gray-700">Terminal Distribution</p>
                <p className="text-xs text-gray-500">Vehicles currently present</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-700">Terminal 1</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">45</p>
                  <p className="text-xs text-blue-600">Coal & Iron Ore</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-green-700">Terminal 2</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-green-900">32</p>
                  <p className="text-xs text-green-600">Fertilizer</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-orange-700">Terminal 3</span>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">28</p>
                  <p className="text-xs text-orange-600">Containers</p>
                </div>
                
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-teal-700">Terminal 4</span>
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-teal-900">19</p>
                  <p className="text-xs text-teal-600">General Cargo</p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Total Active</span>
                  <span className="font-bold text-gray-900">124 vehicles</span>
                </div>
              </div>
            </div>
            <StatCard
              title="Avg TAT"
              value="2h 32m"
              subtitle="Average turnaround time"
              icon={Clock}
              trend={{ value: 15, isPositive: false }}
              color="orange"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Pedestrians In"
              value="234"
              subtitle="Today's pedestrian entries"
              icon={Users}
              trend={{ value: 5, isPositive: true }}
              color="blue"
            />
            <StatCard
              title="Non-Cargo Out"
              value="187"
              subtitle="Today's non-cargo exits"
              icon={CheckCircle}
              trend={{ value: 3, isPositive: true }}
              color="green"
            />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600">LIVE</span>
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm font-semibold text-gray-700">Terminal Distribution</p>
                <p className="text-xs text-gray-500">Non-cargo vehicles present</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-blue-700">Terminal 1</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">8</p>
                  <p className="text-xs text-blue-600">Staff Vehicles</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-green-700">Terminal 2</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-green-900">12</p>
                  <p className="text-xs text-green-600">Service Vehicles</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-orange-700">Terminal 3</span>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">6</p>
                  <p className="text-xs text-orange-600">Maintenance</p>
                </div>
                
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-teal-700">Terminal 4</span>
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  </div>
                  <p className="text-2xl font-bold text-teal-900">4</p>
                  <p className="text-xs text-teal-600">Visitors</p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Total Active</span>
                  <span className="font-bold text-gray-900">30 vehicles</span>
                </div>
              </div>
            </div>
            <StatCard
              title="Avg TAT"
              value="42m"
              subtitle="Average turnaround time"
              icon={Clock}
              trend={{ value: 8, isPositive: true }}
              color="teal"
            />
          </>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {activeTab === 'cargo' ? 'Cargo Vehicle' : 'Pedestrian & Non-Cargo'} Audit Trail
          </h3>
        </div>
        <div className="p-8">
          <DataTable
            data={activeTab === 'cargo' ? cargoVehicleData : nonCargoVehicleData}
            columns={activeTab === 'cargo' ? cargoColumns : nonCargoColumns}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVehicle && (
        <Modal
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          title={`Vehicle Details - ${selectedVehicle.vehicleNumber}`}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Vehicle Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-gray-700">Number:</span> <span className="text-gray-900">{selectedVehicle.vehicleNumber}</span></p>
                  <p><span className="font-semibold text-gray-700">Type:</span> <span className="text-gray-900">{selectedVehicle.cargoType || selectedVehicle.vehicleType}</span></p>
                  <p><span className="font-semibold text-gray-700">Time In:</span> <span className="text-gray-900">{selectedVehicle.timeIn}</span></p>
                  <p><span className="font-semibold text-gray-700">Time Out:</span> <span className="text-gray-900">{selectedVehicle.timeOut}</span></p>
                  <p><span className="font-semibold text-gray-700">TAT:</span> <span className="text-gray-900">{selectedVehicle.turnaroundTime}</span></p>
                </div>
              </div>
              
              {selectedVehicle.images && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Front View</h4>
                  <img 
                    src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                    alt="Vehicle front view"
                    className="w-full h-32 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {selectedVehicle.driver ? 'Driver' : 'Person'} Details
                </h4>
                <div className="space-y-2 text-sm">
                  {selectedVehicle.driver && (
                    <>
                      <p><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{selectedVehicle.driver.name}</span></p>
                      <p><span className="font-semibold text-gray-700">License:</span> <span className="text-gray-900">{selectedVehicle.driver.license}</span></p>
                      <p><span className="font-semibold text-gray-700">Contact:</span> <span className="text-gray-900">{selectedVehicle.driver.contact}</span></p>
                    </>
                  )}
                  {selectedVehicle.person && (
                    <>
                      <p><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{selectedVehicle.person.name}</span></p>
                      <p><span className="font-semibold text-gray-700">ID:</span> <span className="text-gray-900">{selectedVehicle.person.id}</span></p>
                      <p><span className="font-semibold text-gray-700">Department:</span> <span className="text-gray-900">{selectedVehicle.person.department}</span></p>
                    </>
                  )}
                </div>
              </div>
              
              {selectedVehicle.images && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Top View</h4>
                  <img 
                    src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                    alt="Vehicle top view"
                    className="w-full h-32 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GateOperations;