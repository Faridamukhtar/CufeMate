import React from 'react';
import { Pie } from 'react-chartjs-2';

const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(randomColor);
    }
    return colors;
  };

  
const PieChart = ({ data }) => {
    const colors = generateRandomColors(data.length);

  return (
    <Pie
        data={{
            labels: data.map((row) => row.major_name),
            datasets: [
            {
                data: data.map((row) => row.count),
                backgroundColor: colors,
            },
            ],
        }}
    />
  );
};

export default PieChart;


