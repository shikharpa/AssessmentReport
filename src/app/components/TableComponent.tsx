"use client";

import React from 'react';
import { ReportData } from '../page';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register required elements for the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TableProps {
  data: ReportData[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  // Grouping data by unique combinations of Section, Domain, and Skill
  const groupedData: { [key: string]: ReportData[] } = {};

  data.forEach((item) => {
    const key = `${item.Section_Name}-${item.Domain}-${item.Skill}`;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  // For each unique combination, render a table row and chart
  return (
    <table className="table-auto w-full border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-300 p-4">Section</th>
          <th className="border border-gray-300 p-4">Domain</th>
          <th className="border border-gray-300 p-4">Skill</th>
          <th className="border border-gray-300 p-4">Performance</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedData).map((key, index) => {
          const sectionSkillData = groupedData[key];

          // Aggregating correct, incorrect, and left answers by difficulty
          let easyCorrect = 0,
            mediumCorrect = 0,
            hardCorrect = 0,
            easyIncorrect = 0,
            mediumIncorrect = 0,
            hardIncorrect = 0,
            easyLeft = 0,
            mediumLeft = 0,
            hardLeft = 0;

          sectionSkillData.forEach((item) => {
            if (item.Status === 'correct') {
              if (item.Difficulty === 'Easy') easyCorrect++;
              if (item.Difficulty === 'Medium') mediumCorrect++;
              if (item.Difficulty === 'Hard') hardCorrect++;
            } else if (item.Status === 'incorrect') {
              if (item.Difficulty === 'Easy') easyIncorrect++;
              if (item.Difficulty === 'Medium') mediumIncorrect++;
              if (item.Difficulty === 'Hard') hardIncorrect++;
            } else {
              if (item.Difficulty === 'Easy') easyLeft++;
              if (item.Difficulty === 'Medium') mediumLeft++;
              if (item.Difficulty === 'Hard') hardLeft++;
            }
          });

          // Preparing the data for 3 bars: correct, incorrect, left
          const performanceData = {
            labels: ['Correct', 'Incorrect', 'Left'],
            datasets: [
              {
                label: 'Easy',
                data: [easyCorrect, easyIncorrect, easyLeft],
                backgroundColor: ['green'],
              },
              {
                label: 'Medium',
                data: [mediumCorrect, mediumIncorrect, mediumLeft],
                backgroundColor: ['orange'],
              },
              {
                label: 'Hard',
                data: [hardCorrect, hardIncorrect, hardLeft],
                backgroundColor: ['red'],
              },
            ],
          };

          // Options for horizontal bar layout with percentages
          const options = {
            indexAxis: 'y' as const,
            plugins: {
              tooltip: { enabled: true },
              legend: { display: false },
            },
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
              },
              y: {
                stacked: true,
              },
            },
          };

          return (
            <tr key={index}>
              <td className="border border-gray-300 p-4">{sectionSkillData[0].Section_Name}</td>
              <td className="border border-gray-300 p-4">{sectionSkillData[0].Domain}</td>
              <td className="border border-gray-300 p-4">{sectionSkillData[0].Skill}</td>
              <td className="border border-gray-300 p-4">
                <Bar data={performanceData} options={options} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
