import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ui/ToastContainer';

interface Alert {
  id: string;
  type: 'route_deviation' | 'restricted_zone' | 'speed_violation' | 'idle_warning' | 'equipment_failure' | 'berth_delay' | 'weighment_error';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  module: string;
  vehicleId?: string;
  equipmentId?: string;
}

const alertTemplates = [
  {
    type: 'route_deviation',
    messages: [
      'Vehicle {vehicle} deviated from assigned route by 200m',
      'Vehicle {vehicle} took unauthorized detour near Terminal 2',
      'Vehicle {vehicle} exceeded route corridor boundaries'
    ],
    severity: 'medium',
    module: 'geofencing'
  },
  {
    type: 'restricted_zone',
    messages: [
      'Vehicle {vehicle} entered restricted Zone-Red',
      'Unauthorized vehicle {vehicle} detected in security area',
      'Vehicle {vehicle} violated restricted zone boundaries'
    ],
    severity: 'high',
    module: 'geofencing'
  },
  {
    type: 'speed_violation',
    messages: [
      'Vehicle {vehicle} exceeded speed limit in Terminal Area',
      'Speed violation detected for vehicle {vehicle}',
      'Vehicle {vehicle} traveling at unsafe speed near berth'
    ],
    severity: 'medium',
    module: 'geofencing'
  },
  {
    type: 'idle_warning',
    messages: [
      'Vehicle {vehicle} stationary for over 15 minutes',
      'Extended idle time detected for vehicle {vehicle}',
      'Vehicle {vehicle} not moving for 20+ minutes'
    ],
    severity: 'low',
    module: 'gate'
  },
  {
    type: 'equipment_failure',
    messages: [
      'Equipment {equipment} showing critical fault indicators',
      'Hydraulic system failure detected in {equipment}',
      'Equipment {equipment} requires immediate maintenance'
    ],
    severity: 'high',
    module: 'resources'
  },
  {
    type: 'berth_delay',
    messages: [
      'Vessel at Berth-3 experiencing unloading delays',
      'Berth allocation exceeded scheduled time',
      'Vessel departure delayed beyond planned schedule'
    ],
    severity: 'medium',
    module: 'berth'
  },
  {
    type: 'weighment_error',
    messages: [
      'Weighbridge WB-2 calibration error detected',
      'Weight discrepancy alert for vehicle {vehicle}',
      'Weighment system showing inconsistent readings'
    ],
    severity: 'medium',
    module: 'weighment'
  }
];

const vehicleIds = ['OR09AB2345', 'OD25AK9901', 'OR05JK8870', 'WB12CD5678', 'KA09MN3456'];
const equipmentIds = ['CRN-032', 'FLT-005', 'CRN-021', 'TRL-019', 'WB-1', 'WB-2', 'WB-3'];

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { showToast } = useToast();

  const generateRandomAlert = useCallback(() => {
    const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
    const messageTemplate = template.messages[Math.floor(Math.random() * template.messages.length)];
    
    let message = messageTemplate;
    let vehicleId, equipmentId;
    
    if (message.includes('{vehicle}')) {
      vehicleId = vehicleIds[Math.floor(Math.random() * vehicleIds.length)];
      message = message.replace('{vehicle}', vehicleId);
    }
    
    if (message.includes('{equipment}')) {
      equipmentId = equipmentIds[Math.floor(Math.random() * equipmentIds.length)];
      message = message.replace('{equipment}', equipmentId);
    }

    const alert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      type: template.type as any,
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      severity: template.severity as any,
      module: template.module,
      vehicleId,
      equipmentId
    };

    setAlerts(prev => [alert, ...prev.slice(0, 19)]); // Keep only last 20 alerts

    // Show toast notification
    showToast({
      type: alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info',
      title: `${alert.module.charAt(0).toUpperCase() + alert.module.slice(1)} Alert`,
      message: alert.message,
      duration: alert.severity === 'high' ? 8000 : 5000
    });

    return alert;
  }, [showToast]);

  useEffect(() => {
    // Generate initial alerts
    const initialAlerts = Array.from({ length: 5 }, () => generateRandomAlert());
    setAlerts(initialAlerts);

    // Set up random alert generation
    const generateAlert = () => {
      generateRandomAlert();
      
      // Schedule next alert (random interval between 30 seconds to 3 minutes)
      const nextInterval = Math.random() * (180000 - 30000) + 30000;
      setTimeout(generateAlert, nextInterval);
    };

    // Start the alert generation cycle
    const initialDelay = Math.random() * 60000 + 30000; // 30s to 1.5min initial delay
    setTimeout(generateAlert, initialDelay);
  }, [generateRandomAlert]);

  return { alerts, generateRandomAlert };
};