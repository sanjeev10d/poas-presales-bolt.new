import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { MapPin, Route, AlertTriangle, CheckCircle, Eye, Play, Flag } from 'lucide-react';

const GeofencingOperations: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const geofencingData = [
    {
      id: 1,
      vehicleNumber: 'OR09AB2345',
      assignedRoute: 'Gate → WB-3',
      lastKnownLocation: 'Near Yard-2',
      deviationFlag: true,
      restrictedAreaEntry: false,
      timestamp: '16:42, 01 Aug',
      routeEfficiency: 65,
      driver: {
        name: 'Ram Kumar',
        id: 'DRV001',
        complianceScore: 78
      },
      routeDetails: {
        plannedDistance: '2.5 km',
        actualDistance: '3.2 km',
        deviationPoints: 3,
        timeOutsideCorridor: '15 mins'
      }
    },
    {
      id: 2,
      vehicleNumber: 'OD25AK9901',
      assignedRoute: 'WB-4 → Berth 5',
      lastKnownLocation: 'Within Route',
      deviationFlag: false,
      restrictedAreaEntry: false,
      timestamp: '16:38, 01 Aug',
      routeEfficiency: 95,
      driver: {
        name: 'Suresh Patel',
        id: 'DRV002',
        complianceScore: 92
      },
      routeDetails: {
        plannedDistance: '1.8 km',
        actualDistance: '1.8 km',
        deviationPoints: 0,
        timeOutsideCorridor: '0 mins'
      }
    },
    {
      id: 3,
      vehicleNumber: 'OR05JK8870',
      assignedRoute: 'WB-2 → Yard-3',
      lastKnownLocation: 'Zone-Red',
      deviationFlag: true,
      restrictedAreaEntry: true,
      timestamp: '16:34, 01 Aug',
      routeEfficiency: 35,
      driver: {
        name: 'Amit Singh',
        id: 'DRV003',
        complianceScore: 45
      },
      routeDetails: {
        plannedDistance: '3.1 km',
        actualDistance: '4.8 km',
        deviationPoints: 8,
        timeOutsideCorridor: '25 mins'
      }
    }
  ];

  const columns = [
    { key: 'vehicleNumber', label: 'Vehicle No.' },
    { key: 'assignedRoute', label: 'Assigned Route' },
    { key: 'lastKnownLocation', label: 'Last Known Location' },
    { 
      key: 'deviationFlag', 
      label: 'Deviation',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.deviationFlag ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {row.deviationFlag ? 'Yes' : 'No'}
        </span>
      )
    },
    { 
      key: 'restrictedAreaEntry', 
      label: 'Restricted Entry',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.restrictedAreaEntry ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {row.restrictedAreaEntry ? 'Yes' : 'No'}
        </span>
      )
    },
    { key: 'timestamp', label: 'Timestamp' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedVehicle(row)}
            className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
          >
            <Play className="w-3 h-3" />
            <span>Replay</span>
          </button>
          {(row.deviationFlag || row.restrictedAreaEntry) && (
            <button className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
              <Flag className="w-3 h-3" />
              <span>Alert</span>
            </button>
          )}
        </div>
      )
    }
  ];

  const recentAlerts = [
    {
      type: 'Route Deviation',
      message: 'Vehicle OR09AB2345 deviated from Route-17 by 300m',
      timestamp: '16:42',
      severity: 'medium'
    },
    {
      type: 'Restricted Zone Violation',
      message: 'Vehicle OR05JK8870 entered Zone-Red',
      timestamp: '16:34',
      severity: 'high'
    },
    {
      type: 'Idle Warning',
      message: 'Vehicle OD11CX5001 stationary for over 15 minutes',
      timestamp: '16:28',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vehicles On Route"
          value="145"
          subtitle="Currently tracked vehicles"
          icon={Route}
          color="blue"
        />
        <StatCard
          title="Route Deviations"
          value="8"
          subtitle="Vehicles off assigned routes"
          icon={AlertTriangle}
          trend={{ value: 15, isPositive: false }}
          color="orange"
        />
        <StatCard
          title="Restricted Violations"
          value="3"
          subtitle="Unauthorized area entries"
          icon={MapPin}
          color="red"
        />
        <StatCard
          title="Route Compliance"
          value="94.5%"
          subtitle="Overall adherence rate"
          icon={CheckCircle}
          trend={{ value: 2, isPositive: true }}
          color="green"
        />
      </div>

      {/* Live Alerts Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Alerts & Notifications</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                alert.severity === 'high' ? 'text-red-500' :
                alert.severity === 'medium' ? 'text-yellow-500' :
                'text-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{alert.type}</p>
                <p className="text-xs text-slate-600">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
              </div>
              <button className="text-xs text-slate-400 hover:text-slate-600">Acknowledge</button>
            </div>
          ))}
        </div>
      </div>

      {/* Geofencing Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Route Compliance & Geofencing Audit</h3>
        </div>
        <div className="p-6">
          <DataTable data={geofencingData} columns={columns} />
        </div>
      </div>

      {/* Route Replay Modal */}
      {selectedVehicle && (
        <Modal
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          title={`Route Replay - ${selectedVehicle.vehicleNumber}`}
          size="xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Vehicle & Route Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Vehicle Number:</span> {selectedVehicle.vehicleNumber}</p>
                  <p><span className="font-medium">Assigned Route:</span> {selectedVehicle.assignedRoute}</p>
                  <p><span className="font-medium">Last Location:</span> {selectedVehicle.lastKnownLocation}</p>
                  <p><span className="font-medium">Route Efficiency:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedVehicle.routeEfficiency >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.routeEfficiency >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.routeEfficiency}%
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Route Map Playback</h4>
                <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Interactive Route Map</p>
                    <p className="text-xs text-slate-500">
                      Green: Assigned Route | Red: Actual Path | Orange: Violations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Driver Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedVehicle.driver.name}</p>
                  <p><span className="font-medium">Driver ID:</span> {selectedVehicle.driver.id}</p>
                  <p><span className="font-medium">Compliance Score:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      selectedVehicle.driver.complianceScore >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.driver.complianceScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.driver.complianceScore}%
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Route Deviation Analytics</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Planned Distance:</span> {selectedVehicle.routeDetails.plannedDistance}</p>
                  <p><span className="font-medium">Actual Distance:</span> {selectedVehicle.routeDetails.actualDistance}</p>
                  <p><span className="font-medium">Deviation Points:</span> {selectedVehicle.routeDetails.deviationPoints}</p>
                  <p><span className="font-medium">Time Outside Corridor:</span> {selectedVehicle.routeDetails.timeOutsideCorridor}</p>
                </div>
              </div>
              
              {(selectedVehicle.deviationFlag || selectedVehicle.restrictedAreaEntry) && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">Violation Summary</p>
                  <div className="mt-2 space-y-1 text-xs text-red-700">
                    {selectedVehicle.deviationFlag && (
                      <p>• Route deviation detected - exceeded corridor boundaries</p>
                    )}
                    {selectedVehicle.restrictedAreaEntry && (
                      <p>• Unauthorized entry into restricted zone</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GeofencingOperations;