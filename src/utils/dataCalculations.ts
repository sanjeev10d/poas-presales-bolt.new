// Utility functions for dynamic data calculations

export const calculateVehicleStats = (vehicleData: any[]) => {
  const totalVehicles = vehicleData.length;
  const inProgressVehicles = vehicleData.filter(v => v.status === 'In Progress' || v.status === 'Loading' || v.status === 'Unloading').length;
  const completedVehicles = vehicleData.filter(v => v.status === 'Completed').length;
  
  return {
    total: totalVehicles,
    inProgress: inProgressVehicles,
    completed: completedVehicles,
    completionRate: totalVehicles > 0 ? Math.round((completedVehicles / totalVehicles) * 100) : 0
  };
};

export const calculateAverageTurnaroundTime = (data: any[]) => {
  const completedItems = data.filter(item => 
    item.status === 'Completed' && 
    (item.turnaroundTime || item.wtr || item.dwellTime)
  );
  
  if (completedItems.length === 0) return '0h 0m';
  
  const totalMinutes = completedItems.reduce((sum, item) => {
    const timeStr = item.turnaroundTime || item.wtr || item.dwellTime;
    const minutes = parseTimeToMinutes(timeStr);
    return sum + minutes;
  }, 0);
  
  const avgMinutes = Math.round(totalMinutes / completedItems.length);
  const hours = Math.floor(avgMinutes / 60);
  const minutes = avgMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

export const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr || timeStr === '—') return 0;
  
  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);
  
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
  
  return hours * 60 + minutes;
};

export const calculateUtilization = (occupied: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
};

export const calculateWeightStats = (weighmentData: any[]) => {
  const totalWeighed = weighmentData.length;
  const deviations = weighmentData.filter(w => w.deviationAlert).length;
  const successRate = totalWeighed > 0 ? Math.round(((totalWeighed - deviations) / totalWeighed) * 100 * 10) / 10 : 100;
  
  return {
    totalWeighed,
    deviations,
    successRate
  };
};

export const calculateRouteCompliance = (geofencingData: any[]) => {
  const totalVehicles = geofencingData.length;
  const compliantVehicles = geofencingData.filter(v => !v.deviationFlag && !v.restrictedAreaEntry).length;
  const complianceRate = totalVehicles > 0 ? Math.round((compliantVehicles / totalVehicles) * 100 * 10) / 10 : 100;
  
  return {
    totalVehicles,
    compliantVehicles,
    deviations: totalVehicles - compliantVehicles,
    complianceRate
  };
};

export const calculateEquipmentStats = (equipmentData: any[]) => {
  const total = equipmentData.length;
  const inUse = equipmentData.filter(e => e.status === 'In Use').length;
  const available = equipmentData.filter(e => e.status === 'Available').length;
  const maintenance = equipmentData.filter(e => e.status === 'Under Repair' || e.status === 'Maintenance').length;
  const highRisk = equipmentData.filter(e => e.healthScore < 60).length;
  
  return {
    total,
    inUse,
    available,
    maintenance,
    highRisk
  };
};

export const calculateBerthUtilization = (vesselData: any[]) => {
  const totalBerths = 8; // Assuming 8 berths total
  const occupiedBerths = vesselData.filter(v => v.status !== 'Completed').length;
  const utilization = Math.round((occupiedBerths / totalBerths) * 100);
  
  return {
    totalBerths,
    occupiedBerths,
    utilization
  };
};