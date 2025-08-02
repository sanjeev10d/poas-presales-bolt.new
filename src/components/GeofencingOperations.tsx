import React, { useState } from 'react';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { useToast } from '../hooks/useToast';
import { calculateRouteCompliance } from '../utils/dataCalculations';
import { MapPin, Route, AlertTriangle, CheckCircle, Play, Clock, User, Navigation } from 'lucide-react';

const GeofencingOperations: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const { showSuccess, showInfo } = useToast();

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
      currentSpeed: '15 km/h',
      estimatedArrival: '17:15',
      totalDistance: '3.2 km',
      completedDistance: '2.1 km',
      fuelConsumption: '12.5 L/100km',
      driver: {
        name: 'Ram Kumar',
        id: 'DRV001',
        complianceScore: 78,
        license: 'DL12345',
        contact: '9876543210',
        experience: '8 years'
      },
      routeDetails: {
        plannedDistance: '2.5 km',
        actualDistance: '3.2 km',
        deviationPoints: 3,
        timeOutsideCorridor: '15 mins',
        plannedDuration: '25 mins',
        actualDuration: '40 mins',
        maxSpeedViolations: 2,
        idleTime: '5 mins'
      },
      vehicleDetails: {
        type: 'Heavy Truck',
        capacity: '35 MT',
        currentLoad: '28 MT',
        fuelLevel: '75%',
        lastMaintenance: '15-Jul-25',
        gpsStatus: 'Active'
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
      routeEfficiency: 98,
      currentSpeed: '20 km/h',
      estimatedArrival: '16:55',
      totalDistance: '1.8 km',
      completedDistance: '1.5 km',
      fuelConsumption: '10.2 L/100km',
      driver: {
        name: 'Suresh Patel',
        id: 'DRV002',
        complianceScore: 92,
        license: 'DL67890',
        contact: '9876543211',
        experience: '12 years'
      },
      routeDetails: {
        plannedDistance: '1.8 km',
        actualDistance: '1.8 km',
        deviationPoints: 0,
        timeOutsideCorridor: '0 mins',
        plannedDuration: '15 mins',
        actualDuration: '15 mins',
        maxSpeedViolations: 0,
        idleTime: '2 mins'
      },
      vehicleDetails: {
        type: 'Medium Truck',
        capacity: '25 MT',
        currentLoad: '22 MT',
        fuelLevel: '85%',
        lastMaintenance: '20-Jul-2025',
        gpsStatus: 'Active'
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
      currentSpeed: '8 km/h',
      estimatedArrival: '17:45',
      totalDistance: '4.8 km',
      completedDistance: '3.2 km',
      fuelConsumption: '18.5 L/100km',
      driver: {
        name: 'Amit Singh',
        id: 'DRV003',
        complianceScore: 45,
        license: 'DL11223',
        contact: '9876543212',
        experience: '5 years'
      },
      routeDetails: {
        plannedDistance: '3.1 km',
        actualDistance: '4.8 km',
        deviationPoints: 8,
        timeOutsideCorridor: '25 mins',
        plannedDuration: '20 mins',
        actualDuration: '45 mins',
        maxSpeedViolations: 5,
        idleTime: '12 mins'
      },
      vehicleDetails: {
        type: 'Heavy Truck',
        capacity: '40 MT',
        currentLoad: '35 MT',
        fuelLevel: '45%',
        lastMaintenance: '05-Jul-2025',
        gpsStatus: 'Intermittent'
      }
    }
  ];

  const columns = [
    { key: 'vehicleNumber', label: 'Vehicle No.' },
    { key: 'assignedRoute', label: 'Assigned Route' },
    { 
      key: 'driver', 
      label: 'Driver',
      render: (row: any) => row.driver.name
    },
    { key: 'lastKnownLocation', label: 'Last Known Location' },
    { key: 'currentSpeed', label: 'Current Speed' },
    { key: 'estimatedArrival', label: 'ETA' },
    { key: 'completedDistance', label: 'Progress' },
    { key: 'fuelConsumption', label: 'Fuel Rate' },
    { 
      key: 'routeEfficiency', 
      label: 'Route Efficiency',
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                row.routeEfficiency >= 80 ? 'bg-green-500' :
                row.routeEfficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${row.routeEfficiency}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium min-w-max">{row.routeEfficiency}%</span>
        </div>
      )
    },
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
          onClick={() => handleRouteReplay(row)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Play className="w-4 h-4" />
          <span>Replay</span>
        </button>
      )
    }
  ];

  // Calculate dynamic values from real data
  const routeStats = calculateRouteCompliance(geofencingData);
  const restrictedViolations = geofencingData.filter(v => v.restrictedAreaEntry).length;
  
  const handleRouteReplay = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    showInfo('Route Replay', `Starting route replay for ${vehicle.vehicleNumber}`);
  };

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
          value={routeStats.totalVehicles.toString()}
          subtitle="Currently tracked vehicles"
          icon={Route}
          color="blue"
        />
        <StatCard
          title="Route Deviations"
          value={routeStats.deviations.toString()}
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
          value="95%"
          subtitle="Overall adherence rate"
          icon={CheckCircle}
          trend={{ value: 2, isPositive: true }}
          color="green"
        />
      </div>

      {/* Live Alerts Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
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
              <button className="text-xs text-slate-400 hover:text-slate-600 flex-shrink-0">Acknowledge</button>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Route className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Vehicle Number:</span>
                  <span className="text-gray-900 font-semibold">{selectedVehicle.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Vehicle Type:</span>
                  <span className="text-gray-900">{selectedVehicle.vehicleDetails.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Load Capacity:</span>
                  <span className="text-gray-900">{selectedVehicle.vehicleDetails.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Current Load:</span>
                  <span className="text-gray-900">{selectedVehicle.vehicleDetails.currentLoad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Fuel Level:</span>
                  <span className="text-gray-900">{selectedVehicle.vehicleDetails.fuelLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">GPS Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedVehicle.vehicleDetails.gpsStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedVehicle.vehicleDetails.gpsStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Last Maintenance:</span>
                  <span className="text-gray-900">{selectedVehicle.vehicleDetails.lastMaintenance}</span>
                </div>
              </div>
            </div>
            
            {/* Driver Details Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
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
                  <span className="text-gray-900">{selectedVehicle.driver.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Contact:</span>
                  <span className="text-gray-900">{selectedVehicle.driver.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Experience:</span>
                  <span className="text-gray-900">{selectedVehicle.driver.experience}</span>
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

            {/* Route Assignment Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-purple-600" />
                Route Assignment
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Assigned Route:</span>
                  <span className="text-gray-900">{selectedVehicle.assignedRoute}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Current Location:</span>
                  <span className="text-gray-900">{selectedVehicle.lastKnownLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Current Speed:</span>
                  <span className="text-gray-900">{selectedVehicle.currentSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Estimated Arrival:</span>
                  <span className="text-gray-900">{selectedVehicle.estimatedArrival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Progress:</span>
                  <span className="text-gray-900">{selectedVehicle.completedDistance} / {selectedVehicle.totalDistance}</span>
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

            {/* Performance Metrics Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Performance Metrics
              </h4>
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
                  <span className="font-medium text-gray-600">Fuel Consumption:</span>
                  <span className="text-gray-900">{selectedVehicle.fuelConsumption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Idle Time:</span>
                  <span className="text-gray-900">{selectedVehicle.routeDetails.idleTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Speed Violations:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedVehicle.routeDetails.maxSpeedViolations === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedVehicle.routeDetails.maxSpeedViolations}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Time Outside Corridor:</span>
                  <span className="text-gray-900">{selectedVehicle.routeDetails.timeOutsideCorridor}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Route Map Playback */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Route Map Playback
            </h4>
            <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-lg font-medium text-slate-600 mb-2">Interactive Route Map</p>
                <p className="text-sm text-slate-500 mb-4">
                  Green: Assigned Route | Red: Actual Path | Orange: Violations
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Planned Route</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Actual Path</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Deviation Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Deviation Analytics */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Route Deviation Analytics
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="font-medium text-gray-600 mb-1">Planned Distance</p>
                <p className="text-lg font-bold text-gray-900">{selectedVehicle.routeDetails.plannedDistance}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="font-medium text-gray-600 mb-1">Actual Distance</p>
                <p className="text-lg font-bold text-gray-900">{selectedVehicle.routeDetails.actualDistance}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="font-medium text-gray-600 mb-1">Deviation Points</p>
                <p className="text-lg font-bold text-red-600">{selectedVehicle.routeDetails.deviationPoints}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="font-medium text-gray-600 mb-1">Efficiency Score</p>
                <p className={`text-lg font-bold ${
                  selectedVehicle.routeEfficiency >= 80 ? 'text-green-600' :
                  selectedVehicle.routeEfficiency >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {selectedVehicle.routeEfficiency}%
                </p>
              </div>
            </div>
          </div>
          
          {(selectedVehicle.deviationFlag || selectedVehicle.restrictedAreaEntry) && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-red-800 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Violation Summary
              </p>
              <div className="space-y-1 text-xs text-red-700">
                {selectedVehicle.deviationFlag && (
                  <p>• Route deviation detected - exceeded corridor boundaries</p>
                )}
                {selectedVehicle.restrictedAreaEntry && (
                  <p>• Unauthorized entry into restricted zone</p>
                )}
                <p>• Immediate corrective action required to ensure compliance</p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default GeofencingOperations;