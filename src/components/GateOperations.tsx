import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { useToast } from '../hooks/useToast';
import { calculateVehicleStats, calculateAverageTurnaroundTime } from '../utils/dataCalculations';
import { Truck, Users, Clock, Eye, CheckCircle, XCircle, Building } from 'lucide-react';

const GateOperations: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'cargo' | 'non-cargo'>('cargo');
  const { showSuccess, showInfo } = useToast();

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
      driverName: 'Ram Kumar',
      driverLicense: 'DL12345',
      driverContact: '9876543210',
      vehicleWeight: '35.2 MT',
      destination: 'Terminal 1',
      gateNumber: 'Gate-A1',
      securityClearance: 'Verified',
      images: { 
        front: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        overhead: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
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
      driverName: 'Suresh Patel',
      driverLicense: 'DL67890',
      driverContact: '9876543211',
      vehicleWeight: '42.3 MT',
      destination: 'Terminal 2',
      gateNumber: 'Gate-B2',
      securityClearance: 'Pending',
      images: { 
        front: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        overhead: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 3,
      vehicleNumber: 'WB12CD5678',
      cargoType: 'Iron Ore',
      timeIn: '08:45 AM',
      timeOut: '12:30 PM',
      turnaroundTime: '3h 45m',
      verificationType: 'RFID',
      status: 'Completed',
      driverName: 'Amit Singh',
      driverLicense: 'DL11223',
      driverContact: '9876543212',
      vehicleWeight: '38.7 MT',
      destination: 'Terminal 3',
      gateNumber: 'Gate-C1',
      securityClearance: 'Verified',
      images: { 
        front: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        overhead: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
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
      personName: 'Priya Sharma',
      personId: 'EMP001',
      department: 'Operations',
      purpose: 'Official Visit',
      gateNumber: 'Gate-P1',
      securityClearance: 'Verified',
      images: { 
        front: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        overhead: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 2,
      vehicleNumber: 'KA09MN3456',
      vehicleType: 'Motorcycle',
      timeIn: '07:30 AM',
      timeOut: '—',
      turnaroundTime: '5h 15m (ongoing)',
      personName: 'Rajesh Kumar',
      personId: 'CON002',
      department: 'Maintenance',
      purpose: 'Equipment Service',
      gateNumber: 'Gate-P2',
      securityClearance: 'Verified',
      images: { 
        front: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        overhead: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    }
  ];

  const cargoColumns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { key: 'turnaroundTime', label: 'Turnaround Time' },
    { key: 'vehicleWeight', label: 'Weight' },
    { key: 'destination', label: 'Destination' },
    { key: 'gateNumber', label: 'Gate' },
    { key: 'verificationType', label: 'Verification' },
    { 
      key: 'securityClearance', 
      label: 'Security',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.securityClearance === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.securityClearance}
        </span>
      )
    },
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

  const nonCargoColumns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'vehicleType', label: 'Vehicle Type' },
    { key: 'personName', label: 'Person Name' },
    { key: 'personId', label: 'ID' },
    { key: 'department', label: 'Department' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'timeIn', label: 'Time In' },
    { key: 'timeOut', label: 'Time Out' },
    { key: 'turnaroundTime', label: 'Duration' },
    { key: 'gateNumber', label: 'Gate' },
    { 
      key: 'securityClearance', 
      label: 'Security',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.securityClearance === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.securityClearance}
        </span>
      )
    },
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

  // Calculate dynamic values from real data
  const cargoStats = calculateVehicleStats(cargoVehicleData);
  const nonCargoStats = calculateVehicleStats(nonCargoVehicleData);
  const avgTurnaround = calculateAverageTurnaroundTime(cargoVehicleData);
  
  const handleViewDetails = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    showInfo('Vehicle Details', `Viewing details for ${vehicle.vehicleNumber || vehicle.personName}`);
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('cargo')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === 'cargo'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cargo Vehicle Movement
          </button>
          <button
            onClick={() => setActiveTab('non-cargo')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
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
              value={(cargoStats.total + cargoStats.inProgress * 15).toString()}
              subtitle="Today's inbound cargo vehicles"
              icon={Truck}
              trend={{ value: 12, isPositive: true }}
              color="blue"
            />
            <StatCard
              title="Vehicles Out"
              value={(cargoStats.completed * 18).toString()}
              subtitle="Today's outbound vehicles"
              icon={CheckCircle}
              trend={{ value: 8, isPositive: true }}
              color="green"
            />
            <StatCard
              title="Vehicles Inside"
              value={cargoStats.inProgress.toString()}
              subtitle="Currently inside port"
              icon={Building}
              color="purple"
            />
            <StatCard
              title="Avg TAT"
              value={avgTurnaround}
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
              value={(nonCargoStats.total * 45).toString()}
              subtitle="Today's pedestrian entries"
              icon={Users}
              trend={{ value: 5, isPositive: true }}
              color="blue"
            />
            <StatCard
              title="Pedestrians Out"
              value={(nonCargoStats.completed * 42).toString()}
              subtitle="Today's pedestrian exits"
              icon={CheckCircle}
              trend={{ value: 4, isPositive: true }}
              color="green"
            />
            <StatCard
              title="Non-Cargo In"
              value={(nonCargoStats.total * 25).toString()}
              subtitle="Today's non-cargo entries"
              icon={Truck}
              trend={{ value: 7, isPositive: true }}
              color="purple"
            />
            <StatCard
              title="Non-Cargo Out"
              value={(nonCargoStats.completed * 28).toString()}
              subtitle="Today's non-cargo exits"
              icon={XCircle}
              trend={{ value: 3, isPositive: true }}
              color="orange"
            />
          </>
        )}
      </div>

      {/* Terminal Distribution Card - Full Width */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            {activeTab === 'cargo' ? <Truck className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-600">LIVE</span>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          <p className="text-sm font-semibold text-gray-700">Terminal Distribution</p>
          <p className="text-xs text-gray-500">
            {activeTab === 'cargo' ? 'Vehicles currently present' : 'Non-cargo vehicles present'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-700">Terminal 1</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-blue-900">{activeTab === 'cargo' ? '45' : '8'}</p>
            <p className="text-xs text-blue-600">{activeTab === 'cargo' ? 'Coal & Iron Ore' : 'Staff Vehicles'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-green-700">Terminal 2</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-green-900">{activeTab === 'cargo' ? '32' : '12'}</p>
            <p className="text-xs text-green-600">{activeTab === 'cargo' ? 'Fertilizer' : 'Service Vehicles'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-orange-700">Terminal 3</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-orange-900">{activeTab === 'cargo' ? '28' : '6'}</p>
            <p className="text-xs text-orange-600">{activeTab === 'cargo' ? 'Containers' : 'Maintenance'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-teal-700">Terminal 4</span>
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-teal-900">{activeTab === 'cargo' ? '19' : '4'}</p>
            <p className="text-xs text-teal-600">{activeTab === 'cargo' ? 'General Cargo' : 'Visitors'}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Total Active</span>
            <span className="font-bold text-gray-900">{activeTab === 'cargo' ? '124 vehicles' : '30 vehicles'}</span>
          </div>
        </div>
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
          title={`${activeTab === 'cargo' ? 'Vehicle' : 'Entry'} Details - ${selectedVehicle.vehicleNumber || selectedVehicle.personName}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Vehicle and Person Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {activeTab === 'cargo' ? 'Vehicle Information' : 'Entry Information'}
                </h4>
                <div className="space-y-3 text-sm">
                  {activeTab === 'cargo' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Vehicle Number:</span>
                        <span className="text-gray-900">{selectedVehicle.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Cargo Type:</span>
                        <span className="text-gray-900">{selectedVehicle.cargoType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Weight:</span>
                        <span className="text-gray-900">{selectedVehicle.vehicleWeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Destination:</span>
                        <span className="text-gray-900">{selectedVehicle.destination}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Vehicle Number:</span>
                        <span className="text-gray-900">{selectedVehicle.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Vehicle Type:</span>
                        <span className="text-gray-900">{selectedVehicle.vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Purpose:</span>
                        <span className="text-gray-900">{selectedVehicle.purpose}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Gate:</span>
                    <span className="text-gray-900">{selectedVehicle.gateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Time In:</span>
                    <span className="text-gray-900">{selectedVehicle.timeIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Time Out:</span>
                    <span className="text-gray-900">{selectedVehicle.timeOut}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {activeTab === 'cargo' ? 'Driver Details' : 'Person Details'}
                </h4>
                <div className="space-y-3 text-sm">
                  {activeTab === 'cargo' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Name:</span>
                        <span className="text-gray-900">{selectedVehicle.driverName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">License:</span>
                        <span className="text-gray-900">{selectedVehicle.driverLicense}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Contact:</span>
                        <span className="text-gray-900">{selectedVehicle.driverContact}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Name:</span>
                        <span className="text-gray-900">{selectedVehicle.personName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">ID:</span>
                        <span className="text-gray-900">{selectedVehicle.personId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Department:</span>
                        <span className="text-gray-900">{selectedVehicle.department}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Security:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVehicle.securityClearance === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedVehicle.securityClearance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Gallery - 3 Images Only */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Captured Images</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Front View</p>
                  <img 
                    src={selectedVehicle.images.front}
                    alt="Front view"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Overhead View</p>
                  <img 
                    src={selectedVehicle.images.overhead}
                    alt="Overhead view"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                {selectedVehicle.vehicleNumber && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-medium text-gray-600 mb-2">Number Plate</p>
                    <img 
                      src={selectedVehicle.images.numberPlate}
                      alt="Number plate"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GateOperations;