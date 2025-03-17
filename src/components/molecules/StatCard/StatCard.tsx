import React from 'react';
import { Icon } from '../../atoms/Icon';
import { twMerge } from 'tailwind-merge';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className
}) => {
  return (
    <div className={twMerge(
      "bg-gray-800/60 rounded-lg p-4 flex flex-col",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center">
          <Icon name={icon} className="text-blue-400" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{value}</span>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <Icon 
              name={trend.isPositive ? 'trending-up' : 'trending-down'} 
              className="mr-1 w-4 h-4" 
            />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}; 