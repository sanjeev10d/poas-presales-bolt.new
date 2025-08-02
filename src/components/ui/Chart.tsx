import React from 'react';

interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'donut' | 'progress';
  data: any[];
  config?: {
    colors?: string[];
    height?: number;
    showGrid?: boolean;
    showLabels?: boolean;
    animate?: boolean;
  };
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ type, data, config = {}, className = '' }) => {
  const {
    colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    height = 200,
    showGrid = true,
    showLabels = true,
    animate = true
  } = config;

  const renderLineChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / maxValue) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className={`relative ${className}`} style={{ height }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {showGrid && (
            <g className="opacity-20">
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.2" />
              ))}
            </g>
          )}
          <polyline
            fill="none"
            stroke={colors[0]}
            strokeWidth="2"
            points={points}
            className={animate ? 'animate-pulse' : ''}
          />
          <polyline
            fill={`url(#gradient-${type})`}
            stroke="none"
            points={`${points} 100,100 0,100`}
            opacity="0.2"
          />
          <defs>
            <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {showLabels && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
            {data.map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <div className="flex items-end justify-between h-full space-x-2">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t-lg transition-all duration-1000 ${animate ? 'animate-pulse' : ''}`}
                style={{ 
                  height: `${(d.value / maxValue) * 80}%`,
                  backgroundColor: colors[i % colors.length]
                }}
              />
              {showLabels && (
                <span className="text-xs text-gray-500 mt-2">{d.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDonutChart = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;
    
    return (
      <div className={`relative ${className}`} style={{ height, width: height }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {data.map((d, i) => {
            const percentage = (d.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            
            const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 35 * Math.cos(((startAngle + angle) * Math.PI) / 180);
            const y2 = 50 + 35 * Math.sin(((startAngle + angle) * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={i}
                d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={colors[i % colors.length]}
                className={animate ? 'animate-pulse' : ''}
              />
            );
          })}
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressChart = () => {
    const percentage = data[0]?.value || 0;
    
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{data[0]?.label}</span>
          <span className="text-sm font-bold text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${animate ? 'animate-pulse' : ''}`}
            style={{ 
              width: `${percentage}%`,
              backgroundColor: colors[0]
            }}
          />
        </div>
      </div>
    );
  };

  switch (type) {
    case 'line':
    case 'area':
      return renderLineChart();
    case 'bar':
      return renderBarChart();
    case 'donut':
      return renderDonutChart();
    case 'progress':
      return renderProgressChart();
    default:
      return renderLineChart();
  }
};

export default Chart;