"use client";

import React, { useState, useEffect } from 'react';
import OverviewStats from './components/OverviewStats';
import DifficultyPieChart from './components/DifficultyPieChart';
import SkillsRadarChart from './components/SkillsRadarChart';
import PerformanceLineChart from './components/PerformanceLineChart';
import BubbleChartTimeVsCorrectness from './components/BubbleChartTimeVsCorrectness';
import TableComponent from './components/TableComponent';
import * as XLSX from 'xlsx';

export interface ReportData {
  Difficulty: string;
  Domain: string;
  Skill: string;
  Status: string;
  Score: number;
  TimeSpent: number;
  Section_Name: string;
}

export default function AssessmentReport() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Limit the table to 10 rows per page

  useEffect(() => {
    const loadExcelData = async () => {
      const response = await fetch('/data.xlsx'); // Fetch the Excel file from the public folder
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: ReportData[] = XLSX.utils.sheet_to_json(worksheet);
      setReportData(jsonData);
    };

    loadExcelData();
  }, []);

  // Paginated data for the table
  const paginatedData = reportData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Overview stats calculation
  const totalCorrect = reportData.filter(item => item.Status === 'correct').length;
  const totalIncorrect = reportData.filter(item => item.Status === 'incorrect').length;
  const totalUnattempted = reportData.filter(item => item.Status === 'left').length;
  const totalQuestions = reportData.length;

  // Difficulty distribution calculation
  const easy = reportData.filter(item => item.Difficulty === 'Easy').length;
  const medium = reportData.filter(item => item.Difficulty === 'Medium').length;
  const hard = reportData.filter(item => item.Difficulty === 'Hard').length;

  // Skill performance calculation (dummy data for now)
  const skillsPerformance = {
    'Skill 1': 80,
    'Skill 2': 60,
    'Skill 3': 90,
  };

  // Performance progress over time (dummy data for now)
  const performanceOverTime = [70, 80, 90];

  // Time spent vs correctness data (dummy data for now)
  const timeVsCorrectness = [
    { x: 15, y: 80, r: 10 },
    { x: 20, y: 60, r: 12 },
    { x: 25, y: 90, r: 8 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Interactive Student Assessment Report</h1>

      {/* Overview Stats */}
      <OverviewStats
        totalCorrect={totalCorrect}
        totalIncorrect={totalIncorrect}
        totalUnattempted={totalUnattempted}
        totalQuestions={totalQuestions}
      />

      {/* Charts: Pie and Radar beside each other */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <DifficultyPieChart easy={easy} medium={medium} hard={hard} />
        <SkillsRadarChart skills={skillsPerformance} />
      </div>

      {/* Charts: Line and Bubble below Pie and Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <PerformanceLineChart performanceOverTime={performanceOverTime} />
        <BubbleChartTimeVsCorrectness data={timeVsCorrectness} />
      </div>

      {/* Paginated Table */}
      <div className="mt-8">
        <TableComponent data={paginatedData} />

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= reportData.length}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
