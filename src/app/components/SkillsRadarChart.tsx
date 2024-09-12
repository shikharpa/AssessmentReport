"use client";

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

interface SkillsRadarChartProps {
  skills: { [key: string]: number }; // Skills with performance
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skills }) => {
  const data = {
    labels: Object.keys(skills),
    datasets: [
      {
        label: 'Performance',
        data: Object.values(skills),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-center text-xl font-semibold mb-4">Skill Performance</h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillsRadarChart;
