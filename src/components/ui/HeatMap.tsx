import React from 'react';

interface HeatMapProps {
  data: Array<{
    x: string;
    y: string;
    value: number;
    label?: string;
  }>;
  colorScale?: string[];
  className?: string;
  interactive?: boolean;
}

const HeatMap: React.FC<HeatMapProps> = ({ 
  data, 
  colorScale = ['#f3f4f6', '#ddd6fe', '#a78bfa', '#8b5cf6', '#7c3aed'],
  className = '',
  interactive = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  
  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    const index = Math.floor(normalized * (colorScale.length - 1));
    return colorScale[Math.min(index, colorScale.length - 1)];
  };

  const xLabels = [...new Set(data.map(d => d.x))];
  const yLabels = [...new Set(data.map(d => d.y))];

  return (
    <div className={`${className}`}>
      <div className="grid gap-2" style={{ gridTemplateColumns: `auto repeat(${xLabels.length}, 1fr)` }}>
        {/* Header row */}
        <div></div>
        {xLabels.map(label => (
          <div key={label} className="text-sm font-semibold text-gray-700 text-center p-2">
            {label}
          </div>
        ))}
        
        {/* Data rows */}
        {yLabels.map(yLabel => (
          <React.Fragment key={yLabel}>
            <div className="text-sm font-semibold text-gray-700 flex items-center pr-3">
              {yLabel}
            </div>
            {xLabels.map(xLabel => {
              const dataPoint = data.find(d => d.x === xLabel && d.y === yLabel);
              const value = dataPoint?.value || 0;
              
              return (
                <div
                  key={`${xLabel}-${yLabel}`}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    interactive ? 'hover:scale-110 hover:shadow-lg cursor-pointer hover:z-10 relative' : ''
                  } ${value > 0 ? 'shadow-sm' : ''}`}
                  style={{ 
                    backgroundColor: getColor(value),
                    boxShadow: value > 0 ? `0 2px 4px ${getColor(value)}40` : 'none'
                  }}
                  title={dataPoint?.label || `${xLabel} - ${yLabel}: ${value}`}
                >
                  {value > 0 && (
                    <span className={`${value > maxValue * 0.5 ? 'text-white' : 'text-gray-800'} drop-shadow-sm`}>
                      {value}
                    </span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center mt-6 space-x-3">
        <span className="text-sm font-medium text-gray-600">Low</span>
        <div className="flex space-x-1 px-2">
          {colorScale.map((color, i) => (
            <div
              key={i}
              className="w-6 h-4 rounded shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-600">High</span>
      </div>
      
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          Range: {minValue} - {maxValue} | Click cells for detailed view
        </span>
      </div>
    </div>
  );
};

export default HeatMap;