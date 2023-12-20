import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const WeeklyPostCountChart = ({ data }) => {
    // Extracting labels (student names) and data values (weekly averages) from the API response
    const labels = data.map(item => `${item.fname} ${item.lname}`);
    const values = data.map(item => item.weekly_avg);

    // Chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Weekly Average Post Count",
                data: values,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            x: { title: { display: true, text: "Student Names" } },
            y: { title: { display: true, text: "Weekly Average Post Count" } },
        },
    };

    return (
        <div>
            <h2>Weekly Post Count</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default WeeklyPostCountChart;
