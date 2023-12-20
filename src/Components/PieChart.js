// PieChart.js
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';



const PieChartComponent = ({ ChartData }) => {
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(randomColor);
    }
    return colors;
  };
  const colors = generateRandomColors(ChartData.length);
  // Create the data array based on ChartData
  const data = ChartData.map((item, index) => ({
    name: item.major_name,
    value: parseInt(item.std_count)
    // You can customize other properties as needed
  }));
  console.log("ana fl chart w di el props w b3daha el data");
  console.log(ChartData);
  console.log(data);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
