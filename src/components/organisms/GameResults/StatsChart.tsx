import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface StatsChartProps {
  title: string;
  players: Array<{
    id: string;
    name: string;
    score: number;
    correctAnswers: number;
    totalAnswers: number;
    isCurrentPlayer?: boolean;
  }>;
  type: 'score' | 'accuracy';
}

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEEAD',
  '#D4A5A5'
];

export const StatsChart: React.FC<StatsChartProps> = ({
  title,
  players,
  type
}) => {
  // Simuler des données d'évolution pour la démonstration
  const generateData = () => {
    const rounds = Array.from({ length: 10 }, (_, i) => i + 1);
    return rounds.map(round => {
      const data: any = { round };
      players.forEach((player, index) => {
        if (type === 'score') {
          // Simuler une progression de score
          data[player.name] = Math.floor(
            (player.score / 10) * round +
            Math.random() * 20 - 10
          );
        } else {
          // Simuler une progression de précision
          const accuracy = (player.correctAnswers / player.totalAnswers) * 100;
          data[player.name] = Math.floor(
            (accuracy / 10) * round +
            Math.random() * 5 - 2.5
          );
        }
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#666" />
            <XAxis
              dataKey="round"
              stroke="#999"
              label={{ value: 'Question', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              stroke="#999"
              label={{
                value: type === 'score' ? 'Score' : 'Précision (%)',
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
            <Legend />
            {players.map((player, index) => (
              <Line
                key={player.id}
                type="monotone"
                dataKey={player.name}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={player.isCurrentPlayer ? 2 : 1}
                dot={{ r: player.isCurrentPlayer ? 4 : 3 }}
                activeDot={{ r: player.isCurrentPlayer ? 8 : 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 