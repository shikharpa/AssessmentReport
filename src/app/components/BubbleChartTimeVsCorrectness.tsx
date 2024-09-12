"use client";

import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface BubbleChartProps {
  data: { x: number; y: number; r: number }[]; // Time spent vs correctness data
}

const BubbleChartTimeVsCorrectness: React.FC<BubbleChartProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Time vs Correctness',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Spent (Minutes)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Correctness (%)',
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-center text-xl font-semibold mb-4">Time Spent vs Correctness</h3>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChartTimeVsCorrectness;
