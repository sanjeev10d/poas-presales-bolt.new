import React from 'react';
import SyncfusionChart from './SyncfusionChart';

// Port Operations specific chart configurations
export const PortOperationsCharts = {
  // Vehicle Traffic Trends - Area Chart
  VehicleTrafficChart: ({ data }: { data: any[] }) => (
    <SyncfusionChart
      type="area"
      data={data}
      config={{
        title: "Vehicle Traffic Trends",
        subtitle: "Daily vehicle movements over the past week",
        colors: ['#3B82F6', '#10B981'],
        height: 300,
        showGrid: true,
        showLegend: false,
        showTooltip: true,
        enableAnimation: true,
        theme: 'Material',
        xField: 'label',
        yField: 'value'
      }}
      className="vehicle-traffic-chart"
    />
  ),

  // Cargo Distribution - Pie Chart
  CargoDistributionChart: ({ data }: { data: any[] }) => (
    <SyncfusionChart
      type="pie"
      data={data}
      config={{
        title: "Cargo Distribution",
        subtitle: "By cargo type",
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        height: 300,
        showLegend: true,
        showTooltip: true,
        showDataLabels: true,
        enableAnimation: true,
        theme: 'Material',
        xField: 'label',
        yField: 'value'
      }}
      className="cargo-distribution-chart"
    />
  ),

  // Equipment Utilization - Column Chart
  EquipmentUtilizationChart: ({ data }: { data: any[] }) => (
    <SyncfusionChart
      type="column"
      data={data}
      config={{
        title: "Equipment Utilization",
        subtitle: "Current utilization across equipment types",
        colors: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
        height: 350,
        showGrid: true,
        showLegend: false,
        showTooltip: true,
        showDataLabels: true,
        enableAnimation: true,
        theme: 'Material',
        xField: 'equipment',
        yField: 'utilization'
      }}
      className="equipment-utilization-chart"
    />
  ),

  // Performance Trends - Line Chart
  PerformanceTrendsChart: ({ data }: { data: any[] }) => (
    <SyncfusionChart
      type="line"
      data={data}
      config={{
        title: "Performance Trends",
        subtitle: "Key performance indicators over time",
        colors: ['#10B981', '#3B82F6', '#F59E0B'],
        height: 300,
        showGrid: true,
        showLegend: true,
        showTooltip: true,
        enableAnimation: true,
        theme: 'Material',
        xField: 'period',
        yField: 'value'
      }}
      className="performance-trends-chart"
    />
  )
};

// Chart wrapper with enhanced styling
export const ChartContainer: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}> = ({ children, title, subtitle, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${className}`}>
    {(title || subtitle) && (
      <div className="mb-6">
        {title && (
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    )}
    <div className="chart-content">
      {children}
    </div>
  </div>
);

export default SyncfusionChart;