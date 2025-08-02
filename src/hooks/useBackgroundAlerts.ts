import { useEffect, useCallback } from 'react';
import { useToast } from './useToast';

interface AlertEvent {
  type: 'route_deviation' | 'weight_discrepancy' | 'vessel_arrival' | 'equipment_alert' | 'geofence_violation' | 'rake_delay';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  module: string;
}

const alertTemplates: AlertEvent[] = [
  {
    type: 'route_deviation',
    title: 'Route Deviation Alert',
    message: 'Vehicle OR12XY7890 has deviated from assigned route by 250m',
    severity: 'warning',
    module: 'geofencing'
  },
  {
    type: 'weight_discrepancy',
    title: 'Weight Discrepancy',
    message: 'Vehicle WB23CD4567 shows 15% variance from expected weight',
    severity: 'warning',
    module: 'weighment'
  },
  {
    type: 'vessel_arrival',
    title: 'Vessel Arrival',
    message: 'MV COASTAL STAR approaching berth B-03, ETA 45 minutes',
    severity: 'info',
    module: 'berth'
  },
  {
    type: 'equipment_alert',
    title: 'Equipment Maintenance',
    message: 'Crane CRN-045 requires immediate inspection - hydraulic pressure low',
    severity: 'error',
    module: 'resources'
  },
  {
    type: 'geofence_violation',
    title: 'Restricted Zone Entry',
    message: 'Vehicle KA09MN2468 entered restricted Zone-Alpha without authorization',
    severity: 'error',
    module: 'geofencing'
  },
  {
    type: 'rake_delay',
    title: 'Rake Operation Delay',
    message: 'Rake RK-2024-045 experiencing 30-minute delay due to track congestion',
    severity: 'warning',
    module: 'rake'
  }
];

export const useBackgroundAlerts = (isEnabled: boolean = true) => {
  const { showInfo, showWarning, showError } = useToast();

  const generateRandomAlert = useCallback(() => {
    const randomAlert = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
    
    // Add timestamp to make each alert unique
    const timestamp = new Date().toLocaleTimeString('en-IN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const alertWithTimestamp = {
      ...randomAlert,
      message: `${randomAlert.message} (${timestamp})`
    };

    // Show toast based on severity
    switch (alertWithTimestamp.severity) {
      case 'info':
        showInfo(alertWithTimestamp.title, alertWithTimestamp.message);
        break;
      case 'warning':
        showWarning(alertWithTimestamp.title, alertWithTimestamp.message);
        break;
      case 'error':
        showError(alertWithTimestamp.title, alertWithTimestamp.message);
        break;
    }

    // Log to console for audit purposes
    console.log(`[${new Date().toISOString()}] ${alertWithTimestamp.module.toUpperCase()} ALERT:`, {
      type: alertWithTimestamp.type,
      title: alertWithTimestamp.title,
      message: alertWithTimestamp.message,
      severity: alertWithTimestamp.severity,
      module: alertWithTimestamp.module
    });

  }, [showInfo, showWarning, showError]);

  useEffect(() => {
    if (!isEnabled) return;

    // Generate alerts at random intervals between 15-45 seconds
    const scheduleNextAlert = () => {
      const delay = Math.random() * 30000 + 15000; // 15-45 seconds
      return setTimeout(() => {
        generateRandomAlert();
        scheduleNextAlert();
      }, delay);
    };

    const timeoutId = scheduleNextAlert();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isEnabled, generateRandomAlert]);
};