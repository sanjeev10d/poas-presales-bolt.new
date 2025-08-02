import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  Line,
  Bar,
  Doughnut,
} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'donut' | 'progress';
  data: any[];
  config?: {
    colors?: string[];
    height?: number;
    showGrid?: boolean;
    showLabels?: boolean;
    animate?: boolean;
    gradient?: boolean;
  };
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ type, data, config = {}, className = '' }) => {
  const {
    colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    height = 200,
    showGrid = true,
    showLabels = true,
    animate = true,
  } = config;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLabels,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors[0],
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
      },
    },
    scales: type !== 'donut' ? {
      x: {
        display: showGrid,
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#6B7280',
        },
      },
      y: {
        display: showGrid,
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#6B7280',
        },
      },
    } : undefined,
    animation: animate ? {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    } : false,
  };

  const renderLineChart = () => {
    const chartData = {
      labels: data.map(d => d.label),
      datasets: [
        {
          label: 'Vehicle Traffic',
          data: data.map(d => d.value),
          borderColor: colors[0],
          backgroundColor: type === 'area' ? `${colors[0]}20` : 'transparent',
          fill: type === 'area',
          tension: 0.4,
          pointBackgroundColor: colors[0],
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
      ],
    };

    return <Line data={chartData} options={chartOptions} />;
  };

  const renderBarChart = () => {
    const chartData = {
      labels: data.map(d => d.label),
      datasets: [
        {
          label: 'Values',
          data: data.map(d => d.value),
          backgroundColor: colors.map(color => `${color}80`),
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };

    return <Bar data={chartData} options={chartOptions} />;
  };

  const renderDonutChart = () => {
    const chartData = {
      labels: data.map(d => d.label),
      datasets: [
        {
          data: data.map(d => d.value),
          backgroundColor: colors.slice(0, data.length),
          borderColor: '#fff',
          borderWidth: 3,
          hoverBorderWidth: 4,
          cutout: '60%',
        },
      ],
    };

    const donutOptions = {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        legend: {
          ...chartOptions.plugins?.legend,
          position: 'right' as const,
        },
      },
    };

    return <Doughnut data={chartData} options={donutOptions} />;
  };

  const renderProgressChart = () => {
    const percentage = data[0]?.value || 0;
    
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-gray-800">{data[0]?.label}</span>
          <span className="text-lg font-bold text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-1000 relative ${animate ? 'animate-pulse' : ''}`}
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${colors[0]}, ${colors[0]}dd)`,
              boxShadow: `0 2px 4px ${colors[0]}40`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={className} style={{ height: type === 'progress' ? 'auto' : height }}>
      {type === 'line' || type === 'area' ? renderLineChart() :
       type === 'bar' ? renderBarChart() :
       type === 'donut' ? renderDonutChart() :
       type === 'progress' ? renderProgressChart() :
       renderLineChart()}
    </div>
  );
};

export default Chart;