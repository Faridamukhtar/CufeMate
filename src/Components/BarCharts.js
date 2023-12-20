import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/*const BarChart = ({ data , XLabel, YLabel , labels , Name }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Remove any existing chart before rendering
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, 
        datasets: [{
          label: Name,
          data: data,
          backgroundColor: 'rgba(80, 48, 229, 0.7)', // Bar color
          borderColor: 'rgba(75, 192, 192, 1)', // Border color
          borderWidth: 1, // Border width
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.4, // Set the aspectRatio to control the height
        scales: {
          x: {
            title: {
              display: true,
              text: XLabel,
            },
          },
          y: {
            title: {
              display: true,
              text: YLabel,
            },
            beginAtZero: true,
          },
        },
      },
      
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}  />;
};

export default BarChart;
*/

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//Data Y values to be represented
// XName is the name of x axis
//YName is the name of Y axis 
//Label are values of x axis to be represented 
//barchartname is the name of bar
const BarChartExample  = ({ yaxisName, xaxisName, xValues, yValues }) => (
    <BarChart width={500} height={300} data={xValues.map((value, index) => ({ [xaxisName]: value, [yaxisName]: yValues[index] }))} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey={xaxisName} />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey={yaxisName} fill="#8884d8" />
    </BarChart>
   );


export default BarChartExample;