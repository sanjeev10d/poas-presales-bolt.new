import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Train, Clock, AlertTriangle, CheckCircle, Eye, Wrench, RotateCcw } from 'lucide-react';

const RakeOperations: React.FC = () => {
  const [selectedRake, setSelectedRake] = useState<any>(null);

  const rakeData = [
    {
      id: 1,
      rakeRefNo: 'RK-2024-001',
      wagonCount: 58,
      timeIn: '08:30 AM',
      timeOut: '02:15 PM',
      loadedWagons: 58,
      emptyWagons: 0,
      wtr: '5h 45m',
      alerts: 'None',
      sourceTerminal: 'Jharsuguda',
      status: 'Completed',
      cargoType: 'Coal',
      timeline: [
        { stage: 'Rake In', time: '08:30 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '08:45 AM', status: 'completed' },
        { stage: 'Unloading Start', time: '09:00 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '01:30 PM', status: 'completed' },
        { stage: 'Rake Out Request', time: '02:00 PM', status: 'completed' },
        { stage: 'Dispatched', time: '02:15 PM', status: 'completed' }
      ]
    },
    {
      id: 2,
      rakeRefNo: 'RK-2024-002',
      wagonCount: 60,
      timeIn: '10:15 AM',
      timeOut: '—',
      loadedWagons: 55,
      emptyWagons: 5,
      wtr: '6h 12m (ongoing)',
      alerts: 'Load Discrepancy',
      sourceTerminal: 'Talcher',
      status: 'In Progress',
      cargoType: 'Coal',
      timeline: [
        { stage: 'Rake In', time: '10:15 AM', status: 'completed' },
        { stage: 'Top Point Arrival', time: '10:30 AM', status: 'completed' },
        { stage: 'Unloading Start', time: '10:45 AM', status: 'completed' },
        { stage: 'Unloading Complete', time: '—', status: 'in-progress' },
        { stage: 'Rake Out Request', time: '—', status: 'pending' },
        { stage: 'Dispatched', time: '—', status: 'pending' }
      ]
    }
  ];

  const columns = [
    { key: 'rakeRefNo', label: 'Rake Ref No.' },
    { key: 'wagonCount', label: 'Wagon Count' },
    { key: 'timeIn', label: 'In Time' },
    { key: 'timeOut', label: 'Out Time' },
    { key: 'loadedWagons', label: 'Loaded Wagons' },
    { key: 'emptyWagons', label: 'Empty Wagons' },
    { key: 'wtr', label: 'WTR' },
    { 
      key: 'alerts', 
      label: 'Alerts',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.alerts}
        </span>
      )
    },
    { key: 'sourceTerminal', label: 'Source Terminal' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedRake(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Eye className="w-3 h-3" />
            <span>View</span>
          </button>
          {row.status === 'In Progress' && (
            <>
              <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs hover:bg-orange-200">
                <Wrench className="w-3 h-3" />
                <span>Inspect</span>
              </button>
              <button className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                <RotateCcw className="w-3 h-3" />
                <span>Reprocess</span>
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
          title="Active Rakes"
          value="3"
          subtitle="Currently in progress"
          icon={Train}
          color="blue"
        />
        <StatCard
          title="Completed Rakes"
          value="12"
          subtitle="Dispatched today"
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Exception Alerts"
          value="2"
          subtitle="Requires attention"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Avg WTR"
          value="5h 42m"
          subtitle="Wagon turnaround time"
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
          color="orange"
        />
      </div>

      {/* Rake Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Rake Operations Audit Logs</h3>
        </div>
        <div className="p-6">
          <DataTable data={rakeData} columns={columns} />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRake && (
        <Modal
          isOpen={!!selectedRake}
          onClose={() => setSelectedRake(null)}
          title={`Rake Details - ${selectedRake.rakeRefNo}`}
          size="xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Rake Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Reference No:</span> {selectedRake.rakeRefNo}</p>
                  <p><span className="font-medium">Source Station:</span> {selectedRake.sourceTerminal}</p>
                  <p><span className="font-medium">Cargo Type:</span> {selectedRake.cargoType}</p>
                  <p><span className="font-medium">Total Wagons:</span> {selectedRake.wagonCount}</p>
                  <p><span className="font-medium">Arrival Time:</span> {selectedRake.timeIn}</p>
                  {selectedRake.timeOut !== '—' && (
                    <p><span className="font-medium">Dispatch Time:</span> {selectedRake.timeOut}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Wagon Images</h4>
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="https://images.pexels.com/photos/2331733/pexels-photo-2331733.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop"
                    alt="Wagon In"
                    className="w-full h-20 object-cover rounded"
                  />
                  <img 
                    src="https://images.pexels.com/photos/2331733/pexels-photo-2331733.jpeg?auto=compress&cs=tinysrgb&w=150&h=100&fit=crop"
                    alt="Wagon Out"
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Wagon Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Loaded Wagons:</span> {selectedRake.loadedWagons}</p>
                  <p><span className="font-medium">Empty Wagons:</span> {selectedRake.emptyWagons}</p>
                  <p><span className="font-medium">WTR Time:</span> {selectedRake.wtr}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedRake.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedRake.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Alerts:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedRake.alerts === 'None' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedRake.alerts}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-medium text-slate-900 mb-4">Operation Timeline</h4>
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {selectedRake.timeline.map((stage: any, index: number) => (
                <div key={index} className="flex items-center space-x-2 min-w-max">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    stage.status === 'completed' ? 'bg-green-500 text-white' :
                    stage.status === 'in-progress' ? 'bg-blue-500 text-white' :
                    'bg-slate-300 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-900">{stage.stage}</p>
                    <p className="text-xs text-slate-600">{stage.time}</p>
                  </div>
                  {index < selectedRake.timeline.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      stage.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RakeOperations;