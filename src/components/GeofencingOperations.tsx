import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { MapPin, Route, AlertTriangle, CheckCircle, Play, Flag } from 'lucide-react';

const GeofencingOperations: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const geofencingData = [
    {
      id: 1,
      vehicleNumber: 'OR09AB2345',
      driverName: 'Ram Kumar',
      driverLicense: 'DL12345',
      assignedRoute: 'Gate → WB-3',
      currentLocation: 'Near Yard-2',
      lastKnownLocation: 'Near Yard-2',
      deviationFlag: true,
      restrictedAreaEntry: false,
      timestamp: '16:42, 01 Aug',
      routeEfficiency: 65,
      speedViolations: 2,
      idleTime: '15 mins',
      fuelConsumption: '12.5L',
      distanceCovered: '3.2 km',
      estimatedArrival: '17:15',
      complianceScore: 78,
      driver: {
        name: 'Ram Kumar',
        id: 'DRV001',
        complianceScore: 78,
        contact: '9876543210'
      },
      routeDetails: {
        plannedDistance: '2.5 km',
        actualDistance: '3.2 km',
        deviationPoints: 3,
        timeOutsideCorridor: '15 mins',
        plannedDuration: '25 mins',
        actualDuration: '42 mins'
      }
    },
    {
      id: 2,
      vehicleNumber: 'OD25AK9901',
      driverName: 'Suresh Patel',
      driverLicense: 'DL67890',
      assignedRoute: 'WB-4 → Berth 5',
      currentLocation: 'Within Route',
      lastKnownLocation: 'Within Route',
      deviationFlag: false,
      restrictedAreaEntry: false,
      timestamp: '16:38, 01 Aug',
      routeEfficiency: 95,
      speedViolations: 0,
      idleTime: '2 mins',
      fuelConsumption: '8.2L',
      distanceCovered: '1.8 km',
      estimatedArrival: '16:55',
      complianceScore: 92,
      driver: {
        name: 'Suresh Patel',
        id: 'DRV002',
        complianceScore: 92,
        contact: '9876543211'
      },
      routeDetails: {
        plannedDistance: '1.8 km',
        actualDistance: '1.8 km',
        deviationPoints: 0,
        timeOutsideCorridor: '0 mins',
        plannedDuration: '18 mins',
        actualDuration: '18 mins'
      }
    },
    {
      id: 3,
      vehicleNumber: 'OR05JK8870',
      driverName: 'Amit Singh',
      driverLicense: 'DL11223',
      assignedRoute: 'WB-2 → Yard-3',
      currentLocation: 'Zone-Red',
      lastKnownLocation: 'Zone-Red',
      deviationFlag: true,
      restrictedAreaEntry: true,
      timestamp: '16:34, 01 Aug',
      routeEfficiency: 35,
      speedViolations: 5,
      idleTime: '25 mins',
      fuelConsumption: '18.7L',
      distanceCovered: '4.8 km',
      estimatedArrival: '17:45',
      complianceScore: 45,
      driver: {
        name: 'Amit Singh',
        id: 'DRV003',
        complianceScore: 45,
        contact: '9876543212'
      },
      routeDetails: {
        plannedDistance: '3.1 km',
        actualDistance: '4.8 km',
        deviationPoints: 8,
        timeOutsideCorridor: '25 mins',
        plannedDuration: '30 mins',
        actualDuration: '68 mins'
      }
    }
  ];

  const columns = [
    { key: 'vehicleNumber', label: 'Vehicle No.' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'driverLicense', label: 'License' },
    { key: 'assignedRoute', label: 'Assigned Route' },
    { key: 'currentLocation', label: 'Current Location' },
    { key: 'distanceCovered', label: 'Distance' },
    { key: 'fuelConsumption', label: 'Fuel Used' },
    { key: 'speedViolations', label: 'Speed Violations' },
    { key: 'idleTime', label: 'Idle Time' },
    { key: 'estimatedArrival', label: 'ETA' },
    { key: 'complianceScore', label: 'Compliance Score' },
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
        <button
          onClick={() => setSelectedVehicle(row)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Play className="w-4 h-4" />
          <span>Replay</span>
        </button>
      )
    }
  ];

  // Calculate dynamic values
  const vehiclesOnRoute = geofencingData.length;
  const routeDeviations = geofencingData.filter(v => v.deviationFlag).length;
  const restrictedViolations = geofencingData.filter(v => v.restrictedAreaEntry).length;
  const totalCompliance = geofencingData.reduce((sum, v) => sum + v.complianceScore, 0);
  const avgCompliance = Math.round(totalCompliance / geofencingData.length * 10) / 10;

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
      type: 'Speed Violation',
      message: 'Vehicle OR05JK8870 exceeded speed limit in Terminal Area',
      timestamp: '16:28',
      severity: 'medium'
    },
    {
      type: 'Idle Warning',
      message: 'Vehicle OD11CX5001 stationary for over 15 minutes',
      timestamp: '16:25',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vehicles On Route"
          value={vehiclesOnRoute.toString()}
          subtitle="Currently tracked vehicles"
          icon={Route}
          color="blue"
        />
        <StatCard
          title="Route Deviations"
          value={routeDeviations.toString()}
          subtitle="Vehicles off assigned routes"
          icon={AlertTriangle}
          trend={{ value: 15, isPositive: false }}
          color="orange"
        />
        <StatCard
          title="Restricted Violations"
          value={restrictedViolations.toString()}
          subtitle="Unauthorized area entries"
          icon={MapPin}
          color="red"
        />
        <StatCard
          title="Route Compliance"
          value={`${avgCompliance}%`}
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
          <div className="space-y-6">
            {/* Vehicle & Route Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Route className="w-5 h-5 mr-2 text-blue-600" />
                  Vehicle & Route Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Vehicle Number:</span>
                    <span className="text-gray-900">{selectedVehicle.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Assigned Route:</span>
                    <span className="text-gray-900">{selectedVehicle.assignedRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Current Location:</span>
                    <span className="text-gray-900">{selectedVehicle.currentLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Distance Covered:</span>
                    <span className="text-gray-900">{selectedVehicle.distanceCovered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Fuel Consumption:</span>
                    <span className="text-gray-900">{selectedVehicle.fuelConsumption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">ETA:</span>
                    <span className="text-gray-900">{selectedVehicle.estimatedArrival}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Route Efficiency:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVehicle.routeEfficiency >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.routeEfficiency >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.routeEfficiency}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Driver Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-900">{selectedVehicle.driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Driver ID:</span>
                    <span className="text-gray-900">{selectedVehicle.driver.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">License:</span>
                    <span className="text-gray-900">{selectedVehicle.driverLicense}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Contact:</span>
                    <span className="text-gray-900">{selectedVehicle.driver.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Speed Violations:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVehicle.speedViolations === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.speedViolations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Idle Time:</span>
                    <span className="text-gray-900">{selectedVehicle.idleTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Compliance Score:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedVehicle.driver.complianceScore >= 80 ? 'bg-green-100 text-green-800' :
                      selectedVehicle.driver.complianceScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedVehicle.driver.complianceScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Map Playback */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Route Map Playback
              </h4>
              <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-lg font-medium text-slate-600">Interactive Route Map</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Green: Assigned Route | Red: Actual Path | Orange: Violations
                  </p>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Play Route
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      Reset View
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Route Deviation Analytics */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Route Deviation Analytics
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Planned Distance:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.plannedDistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Actual Distance:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.actualDistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Deviation Points:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.deviationPoints}</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Planned Duration:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.plannedDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Actual Duration:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.actualDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Time Outside Corridor:</span>
                    <span className="text-gray-900">{selectedVehicle.routeDetails.timeOutsideCorridor}</span>
                  </div>
                </div>
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
                  {selectedVehicle.speedViolations > 0 && (
                    <p>• {selectedVehicle.speedViolations} speed limit violations recorded</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GeofencingOperations;