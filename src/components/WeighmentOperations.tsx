import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Scale, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const WeighmentOperations: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const weighmentData = [
    {
      id: 1,
      vehicleNumber: 'OR09AB2345',
      weighbridge: 'WB-1',
      tareWeight: '12.5 MT',
      grossWeight: '35.2 MT',
      netWeight: '22.7 MT',
      deviationAlert: false,
      thresholdViolation: false,
      logStatus: 'Success',
      challanGenerated: true,
      timestamp: '10:15 AM',
      driverName: 'Ram Kumar',
      driverLicense: 'DL12345',
      cargoType: 'Coal',
      destination: 'Terminal 1',
      operatorName: 'Rajesh Kumar',
      images: {
        vehicle: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 2,
      vehicleNumber: 'OD25AK9901',
      weighbridge: 'WB-2',
      tareWeight: '11.8 MT',
      grossWeight: '42.3 MT',
      netWeight: '30.5 MT',
      deviationAlert: true,
      thresholdViolation: true,
      logStatus: 'On Hold',
      challanGenerated: false,
      timestamp: '10:45 AM',
      driverName: 'Suresh Patel',
      driverLicense: 'DL67890',
      cargoType: 'Fertilizer',
      destination: 'Terminal 2',
      operatorName: 'Priya Sharma',
      images: {
        vehicle: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 3,
      vehicleNumber: 'WB12CD5678',
      weighbridge: 'WB-3',
      tareWeight: '13.2 MT',
      grossWeight: '38.7 MT',
      netWeight: '25.5 MT',
      deviationAlert: false,
      thresholdViolation: false,
      logStatus: 'Success',
      challanGenerated: true,
      timestamp: '11:20 AM',
      driverName: 'Amit Singh',
      driverLicense: 'DL11223',
      cargoType: 'Iron Ore',
      destination: 'Terminal 3',
      operatorName: 'Sunita Devi',
      images: {
        vehicle: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numberPlate: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    }
  ];

  const weighbridgeQueue = [
    {
      id: 'WB-1',
      status: 'In Use',
      operator: 'Rajesh Kumar',
      queue: [
        { vehicleNumber: 'OR05JK8870', waitTime: '15m', status: 'In Progress' },
        { vehicleNumber: 'OD11CX5001', waitTime: '8m', status: 'Waiting' }
      ]
    },
    {
      id: 'WB-2',
      status: 'Available',
      operator: 'Priya Sharma',
      queue: []
    },
    {
      id: 'WB-3',
      status: 'In Use',
      operator: 'Sunita Devi',
      queue: [
        { vehicleNumber: 'KA09MN3456', waitTime: '5m', status: 'Waiting' }
      ]
    }
  ];

  const columns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'weighbridge', label: 'Weighbridge' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'cargoType', label: 'Cargo Type' },
    { key: 'tareWeight', label: 'Tare Weight' },
    { key: 'grossWeight', label: 'Gross Weight' },
    { key: 'netWeight', label: 'Net Weight' },
    { key: 'destination', label: 'Destination' },
    { key: 'operatorName', label: 'Operator' },
    { key: 'timestamp', label: 'Time' },
    { 
      key: 'deviationAlert', 
      label: 'Deviation',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.deviationAlert ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {row.deviationAlert ? 'Yes' : 'No'}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <button
          onClick={() => setSelectedRecord(row)}
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
          title="Vehicles Weighed"
          value="156"
          subtitle="Today's completed weighments"
          icon={Scale}
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Deviation Alerts"
          value="5"
          subtitle="Route/timing deviations"
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: false }}
          color="orange"
        />
        <StatCard
          title="Success Rate"
          value="94.2%"
          subtitle="Successful weighments"
          icon={CheckCircle}
          trend={{ value: 2, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Avg Queue Time"
          value="12m"
          subtitle="Average waiting time"
          icon={Clock}
          trend={{ value: 15, isPositive: false }}
          color="purple"
        />
      </div>

      {/* Weighbridge Queue Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Weighbridge Queue Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weighbridgeQueue.map((wb) => (
            <div key={wb.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{wb.id}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  wb.status === 'In Use' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {wb.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Operator: {wb.operator}</p>
              
              {wb.queue.length > 0 ? (
                <div className="space-y-2">
                  {wb.queue.map((vehicle, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm font-medium">{vehicle.vehicleNumber}</span>
                      <div className="text-xs text-slate-600">
                        <span className={vehicle.status === 'In Progress' ? 'text-blue-600 font-medium' : ''}>
                          {vehicle.status}
                        </span>
                        <span className="ml-2">{vehicle.waitTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No vehicles in queue</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weighment Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Weighment Audit Logs</h3>
        </div>
        <div className="p-6">
          <DataTable data={weighmentData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Weighment Details - ${selectedRecord.vehicleNumber}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Vehicle and Driver Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Vehicle Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Vehicle Number:</span>
                    <span className="text-gray-900">{selectedRecord.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cargo Type:</span>
                    <span className="text-gray-900">{selectedRecord.cargoType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Destination:</span>
                    <span className="text-gray-900">{selectedRecord.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Weighbridge:</span>
                    <span className="text-gray-900">{selectedRecord.weighbridge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Operator:</span>
                    <span className="text-gray-900">{selectedRecord.operatorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Timestamp:</span>
                    <span className="text-gray-900">{selectedRecord.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Weighment Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Tare Weight:</span>
                    <span className="text-gray-900">{selectedRecord.tareWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Gross Weight:</span>
                    <span className="text-gray-900">{selectedRecord.grossWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Net Weight:</span>
                    <span className="text-gray-900 font-semibold">{selectedRecord.netWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Driver Name:</span>
                    <span className="text-gray-900">{selectedRecord.driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Driver License:</span>
                    <span className="text-gray-900">{selectedRecord.driverLicense}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Challan Generated:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedRecord.challanGenerated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedRecord.challanGenerated ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Images Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Captured Images</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">Vehicle Image</p>
                  <img 
                    src={selectedRecord.images.vehicle}
                    alt="Vehicle at weighbridge"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-3">Number Plate</p>
                  <img 
                    src={selectedRecord.images.numberPlate}
                    alt="Number plate"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WeighmentOperations;