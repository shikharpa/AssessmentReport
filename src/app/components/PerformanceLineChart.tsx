"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface PerformanceLineChartProps {
  performanceOverTime: number[]; // Array of scores over time
}

const PerformanceLineChart: React.FC<PerformanceLineChartProps> = ({ performanceOverTime }) => {
  const data = {
    labels: performanceOverTime.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        label: 'Score',
        data: performanceOverTime,
        fill: false,
        borderColor: '#42a5f5',
        tension: 0.1,
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
    <div className="max-w-md mx-auto">
      <h3 className="text-center text-xl font-semibold mb-4">Performance Progress Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceLineChart;
