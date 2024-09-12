"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface DifficultyPieChartProps {
  easy: number;
  medium: number;
  hard: number;
}

const DifficultyPieChart: React.FC<DifficultyPieChartProps> = ({ easy, medium, hard }) => {
  const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [easy, medium, hard],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        hoverBackgroundColor: ['#81c784', '#ffb74d', '#e57373'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="max-w-xs mx-auto">
      <h3 className="text-center text-xl font-semibold mb-4">Question Difficulty Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DifficultyPieChart;
