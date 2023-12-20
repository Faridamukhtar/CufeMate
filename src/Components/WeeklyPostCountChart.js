import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

const WeeklyPostCountChart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById("weeklyPostCountChartCanvas").getContext("2d");
        chartRef.current = new Bar(ctx, {
            data: {
                labels: data.map(item => `${item.fname} ${item.lname}`),
                datasets: [
                    {
                        label: "Weekly Average Post Count",
                        data: data.map(item => item.weekly_avg),
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: { title: { display: true, text: "Student Names" } },
                    y: { title: { display: true, text: "Weekly Average Post Count" } },
                },
            },
        });
    }, [data]);

    return (
        <div>
            <h2>Weekly Post Count</h2>
            <canvas id="weeklyPostCountChartCanvas"></canvas>
        </div>
    );
};

export default WeeklyPostCountChart;
