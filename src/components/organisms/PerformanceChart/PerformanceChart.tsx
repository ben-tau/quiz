import React, { memo, useMemo } from 'react';
import { useAccessibility } from '../../../hooks/useAccessibility';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    score: number;
    avgScore: number;
  }>;
  className?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = memo(({
  data,
  className
}) => {
  const { prefersReducedMotion } = useAccessibility();

  const chartData = useMemo(() => data, [data]);

  const tooltipStyle = useMemo(() => ({
    backgroundColor: '#1E293B',
    borderColor: '#3B82F6',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    color: '#F8FAFC'
  }), []);

  return (
    <div 
      className={className}
      role="region"
      aria-label="Graphique d'évolution des performances"
    >
      <div className="bg-gray-800/60 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#888"
              tick={{ fill: '#888' }}
              tickMargin={10}
            />
            <YAxis 
              stroke="#888"
              tick={{ fill: '#888' }}
              tickMargin={10}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '1rem' }}
              formatter={(value) => <span style={{ color: '#F8FAFC' }}>{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              name="Score" 
              stroke="#3B82F6" 
              activeDot={{ r: 8 }}
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
            <Line 
              type="monotone" 
              dataKey="avgScore" 
              name="Score moyen" 
              stroke="#EC4899" 
              strokeDasharray="5 5"
              animationDuration={prefersReducedMotion ? 0 : 300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

PerformanceChart.displayName = 'PerformanceChart'; 