import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    period?: string;
  };
  color?: 'blue' | 'green' | 'purple' | 'teal' | 'orange' | 'red';
  onClick?: () => void;
  chart?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
  green: 'from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200',
  purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 border-purple-200',
  teal: 'from-teal-500 to-teal-600 text-teal-600 bg-teal-50 border-teal-200',
  orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50 border-orange-200',
  red: 'from-red-500 to-red-600 text-red-600 bg-red-50 border-red-200'
};

const sizeClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = 'blue',
  onClick,
  chart,
  size = 'md'
}) => {
  const [gradientColor, textColor, lightBgColor, borderColor] = colorClasses[color].split(' ');

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${sizeClasses[size]} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className={`w-12 h-12 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend?.period && (
            <span className="text-xs text-gray-500">{trend.period}</span>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>

      {chart && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {chart}
        </div>
      )}
    </div>
  );
};

export default MetricCard;