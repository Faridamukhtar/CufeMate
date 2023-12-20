import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//Data Y values to be represented
//YaxisName is the name of of chart 
//Label are values of x axis to be represented 
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