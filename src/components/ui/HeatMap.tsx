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
}

const HeatMap: React.FC<HeatMapProps> = ({ 
  data, 
  colorScale = ['#f3f4f6', '#ddd6fe', '#a78bfa', '#8b5cf6', '#7c3aed'],
  className = '' 
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
      <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${xLabels.length}, 1fr)` }}>
        {/* Header row */}
        <div></div>
        {xLabels.map(label => (
          <div key={label} className="text-xs font-medium text-gray-600 text-center p-2">
            {label}
          </div>
        ))}
        
        {/* Data rows */}
        {yLabels.map(yLabel => (
          <React.Fragment key={yLabel}>
            <div className="text-xs font-medium text-gray-600 flex items-center pr-2">
              {yLabel}
            </div>
            {xLabels.map(xLabel => {
              const dataPoint = data.find(d => d.x === xLabel && d.y === yLabel);
              const value = dataPoint?.value || 0;
              
              return (
                <div
                  key={`${xLabel}-${yLabel}`}
                  className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: getColor(value) }}
                  title={dataPoint?.label || `${xLabel} - ${yLabel}: ${value}`}
                >
                  {value > 0 && (
                    <span className={value > maxValue * 0.5 ? 'text-white' : 'text-gray-700'}>
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
      <div className="flex items-center justify-center mt-4 space-x-2">
        <span className="text-xs text-gray-500">Low</span>
        <div className="flex space-x-1">
          {colorScale.map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">High</span>
      </div>
    </div>
  );
};

export default HeatMap;