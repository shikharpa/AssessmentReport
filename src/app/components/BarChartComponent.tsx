"use client";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { ReportData } from '../page';

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarChartProps {
  data: ReportData[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  // Grouping data by Section_Name, Domain, and Skill
  const groupedData: { [key: string]: { easyCorrect: number, mediumCorrect: number, hardCorrect: number, easyIncorrect: number, mediumIncorrect: number, hardIncorrect: number, totalMarks: number } } = {};

  data.forEach(item => {
    const key = `${item.Section_Name} - ${item.Domain} - ${item.Skill}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        easyCorrect: 0,
        mediumCorrect: 0,
        hardCorrect: 0,
        easyIncorrect: 0,
        mediumIncorrect: 0,
        hardIncorrect: 0,
        totalMarks: 0
      };
    }

    // Update total marks
    groupedData[key].totalMarks += item.Score;

    // Update counts for correct/incorrect by difficulty
    if (item.Status === 'correct') {
      if (item.Difficulty === 'Easy') {
        groupedData[key].easyCorrect += 1;
      } else if (item.Difficulty === 'Medium') {
        groupedData[key].mediumCorrect += 1;
      } else if (item.Difficulty === 'Hard') {
        groupedData[key].hardCorrect += 1;
      }
    } else if (item.Status === 'incorrect') {
      if (item.Difficulty === 'Easy') {
        groupedData[key].easyIncorrect += 1;
      } else if (item.Difficulty === 'Medium') {
        groupedData[key].mediumIncorrect += 1;
      } else if (item.Difficulty === 'Hard') {
        groupedData[key].hardIncorrect += 1;
      }
    }
  });

  // Prepare data for chart
  const labels = Object.keys(groupedData);
  const easyCorrect = labels.map(key => groupedData[key].easyCorrect);
  const mediumCorrect = labels.map(key => groupedData[key].mediumCorrect);
  const hardCorrect = labels.map(key => groupedData[key].hardCorrect);
  const easyIncorrect = labels.map(key => groupedData[key].easyIncorrect);
  const mediumIncorrect = labels.map(key => groupedData[key].mediumIncorrect);
  const hardIncorrect = labels.map(key => groupedData[key].hardIncorrect);
  const totalMarks = labels.map(key => groupedData[key].totalMarks);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Easy Correct',
        data: easyCorrect,
        backgroundColor: 'green',
      },
      {
        label: 'Medium Correct',
        data: mediumCorrect,
        backgroundColor: 'blue',
      },
      {
        label: 'Hard Correct',
        data: hardCorrect,
        backgroundColor: 'purple',
      },
      {
        label: 'Easy Incorrect',
        data: easyIncorrect,
        backgroundColor: 'red',
      },
      {
        label: 'Medium Incorrect',
        data: mediumIncorrect,
        backgroundColor: 'orange',
      },
      {
        label: 'Hard Incorrect',
        data: hardIncorrect,
        backgroundColor: 'pink',
      }
    ]
  };

  return (
    <div>
      <Bar data={chartData} options={{ indexAxis: 'y' }} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total Marks Per Skill</h2>
        <ul>
          {labels.map((label, index) => (
            <li key={index} className="mb-2">
              <strong>{label}:</strong> {totalMarks[index]} total marks
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarChartComponent;
