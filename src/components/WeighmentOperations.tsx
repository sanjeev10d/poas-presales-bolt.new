import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Scale, AlertTriangle, CheckCircle, Clock, Eye, RefreshCw, Flag } from 'lucide-react';

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
      syncStatus: 'Synced',
      logStatus: 'Success',
      challanGenerated: true,
      timestamp: '10:15 AM',
      driver: { name: 'Ram Kumar', license: 'DL12345' }
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
      syncStatus: 'Retried',
      logStatus: 'On Hold',
      challanGenerated: false,
      timestamp: '10:45 AM',
      driver: { name: 'Suresh Patel', license: 'DL67890' }
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
    }
  ];

  const columns = [
    { key: 'vehicleNumber', label: 'Vehicle Number' },
    { key: 'weighbridge', label: 'Weighbridge' },
    { key: 'tareWeight', label: 'Tare Weight' },
    { key: 'grossWeight', label: 'Gross Weight' },
    { key: 'netWeight', label: 'Net Weight' },
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
      key: 'syncStatus', 
      label: 'Sync Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.syncStatus === 'Synced' ? 'bg-green-100 text-green-800' : 
          row.syncStatus === 'Retried' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {row.syncStatus}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedRecord(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
          {row.syncStatus !== 'Synced' && (
            <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200">
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
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
          title="Sync Success"
          value="94.2%"
          subtitle="Data synchronization rate"
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
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Vehicle Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Number:</span> {selectedRecord.vehicleNumber}</p>
                  <p><span className="font-medium">Assigned Weighbridge:</span> {selectedRecord.weighbridge}</p>
                  <p><span className="font-medium">Timestamp:</span> {selectedRecord.timestamp}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Vehicle Image</h4>
                <img 
                  src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                  alt="Vehicle at weighbridge"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Driver Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedRecord.driver.name}</p>
                  <p><span className="font-medium">License:</span> {selectedRecord.driver.license}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Weighment Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Tare Weight:</span> {selectedRecord.tareWeight}</p>
                  <p><span className="font-medium">Gross Weight:</span> {selectedRecord.grossWeight}</p>
                  <p><span className="font-medium">Net Weight:</span> {selectedRecord.netWeight}</p>
                  <p><span className="font-medium">Sync Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedRecord.syncStatus === 'Synced' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedRecord.syncStatus}
                    </span>
                  </p>
                  <p><span className="font-medium">Challan Generated:</span> 
                    <span className={`ml-2 ${selectedRecord.challanGenerated ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedRecord.challanGenerated ? 'Yes' : 'No'}
                    </span>
                  </p>
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