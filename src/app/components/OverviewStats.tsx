"use client";

import React from 'react';

interface OverviewStatsProps {
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  totalQuestions: number;
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ totalCorrect, totalIncorrect, totalUnattempted, totalQuestions }) => {
  const averageScore = ((totalCorrect / totalQuestions) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-green-100 p-4 text-center rounded-lg">
        <h3 className="text-xl font-bold text-green-600">Correct</h3>
        <p className="text-2xl font-bold">{totalCorrect}</p>
      </div>
      <div className="bg-red-100 p-4 text-center rounded-lg">
        <h3 className="text-xl font-bold text-red-600">Incorrect</h3>
        <p className="text-2xl font-bold">{totalIncorrect}</p>
      </div>
      <div className="bg-gray-100 p-4 text-center rounded-lg">
        <h3 className="text-xl font-bold text-gray-600">Unattempted</h3>
        <p className="text-2xl font-bold">{totalUnattempted}</p>
      </div>
      <div className="bg-blue-100 p-4 text-center rounded-lg">
        <h3 className="text-xl font-bold text-blue-600">Average Score</h3>
        <p className="text-2xl font-bold">{averageScore}%</p>
      </div>
    </div>
  );
};

export default OverviewStats;
