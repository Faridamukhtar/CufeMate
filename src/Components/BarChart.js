import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
    // Extracting labels and data values from the API response
    const labels = data.map(item => item.student_club_name);
    const values = data.map(item => item.avg_rate);

    // Chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Average Ratings",
                data: values,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            x: { title: { display: true, text: "Club Names" } },
            y: { title: { display: true, text: "Average Rating" } },
        },
    };

    return (
        <div>
            <h2>Club Ratings</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
