import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ThemeStatsProps {
  title: string;
  players: Array<{
    id: string;
    name: string;
    isCurrentPlayer?: boolean;
  }>;
  themes: string[];
}

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEEAD',
  '#D4A5A5'
];

export const ThemeStats: React.FC<ThemeStatsProps> = ({
  title,
  players,
  themes
}) => {
  // Simuler des données de performance par thème pour la démonstration
  const generateData = () => {
    return themes.map(theme => {
      const data: any = { theme };
      players.forEach(player => {
        // Simuler un score entre 0 et 100 pour chaque thème
        data[player.name] = Math.floor(Math.random() * 60 + 40);
      });
      return data;
    });
  };

  const data = generateData();

  return (
    <div className="bg-surface/30 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#666" />
            <PolarAngleAxis
              dataKey="theme"
              stroke="#999"
              tick={{ fill: '#999' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#999"
              tick={{ fill: '#999' }}
            />
            {players.map((player, index) => (
              <Radar
                key={player.id}
                name={player.name}
                dataKey={player.name}
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.3}
                strokeWidth={player.isCurrentPlayer ? 2 : 1}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 