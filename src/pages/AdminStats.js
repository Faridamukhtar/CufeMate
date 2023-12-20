import React, { useState, useEffect} from "react";
import AdminBar from "../Components/adminBar.js";
import ReportTable from '../Components/ReportTable';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart'; 
import WeeklyPostCountChart from "../Components/WeeklyPostCountChart.js";

const AdminStats = () => {

    const [tableData, setTableData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [year, setYear] = useState("");
    const [weeklyChartData, setWeeklyChartData] = useState(null);
    const [weeklyYear, setWeeklyYear] = useState("");
    const [weeklyMonth, setWeeklyMonth] = useState("");

    const fetchDataForWeeklyChart = async () => {
        try {
            const response = await fetch(`/api/stats/reps/activityMetric/${weeklyYear}/${weeklyMonth}`);
            const result = await response.json();
            setWeeklyChartData(result);
        } catch (error) {
            console.error('Error fetching data for weekly chart:', error);
        }
    };

    const handleWeeklyYearChange = (event) => {
        const enteredYear = event.target.value;
        const isInteger = /^\d+$/.test(enteredYear);
        if (isInteger || enteredYear >0) {
            setWeeklyYear(enteredYear);
        } else {
            // Inform the user to enter an integer
            alert("Please enter a valid integer for the year.");
        }
    };

    const handleWeeklyMonthChange = (event) => {
        const enteredMonth = event.target.value;
        const isInteger = /^\d+$/.test(enteredMonth);
        if (isInteger && enteredMonth>0 && enteredMonth<13) {
            setWeeklyMonth(enteredMonth);
        } else {
            // Inform the user to enter an integer
            alert("Please enter a valid integer for the Month.");
        }
    };

    const handleShowWeeklyPostCount = () => {
        fetchDataForWeeklyChart();
    };
  
    const fetchDataForTable = async () => {
        try {
            const response = await fetch('/api/stats/reps/posts');
            const result = await response.json();
            setTableData(result.rows);
        } catch (error) {
            console.error('Error fetching data for table:', error);
        }
    };

    const fetchDataForPie = async () => {
        try {
            const response = await fetch('/api/stats/studentsInMajors');
            const result = await response.json();
            setChartData(result.rows);
        } catch (error) {
            console.error('Error fetching data for chart:', error);
        }
    };

    const fetchDataForBarChart = async () => {
        try {
            const response = await fetch(`/api/stats/clubs/avgRating/${year}`);
            const result = await response.json();
            setBarChartData(result);
        } catch (error) {
            console.error('Error fetching data for bar chart:', error);
        }
    };

    const handleYearChange = (event) => {
        const enteredYear = event.target.value;
        const isInteger = /^\d+$/.test(enteredYear);
    
        if (isInteger && enteredYear >0) {
            setYear(enteredYear);
        } else {
            // Inform the user to enter an integer
            alert("Please enter a valid integer for the year.");
        }
    };

    const handleShowClubRatings = () => {
        fetchDataForBarChart();
    };

    useEffect(() => {
        fetchDataForTable();
        fetchDataForPie();
    }, []);

    return (
        <div className="Layout">
            <AdminBar/>
            <div className="Dashboard">
                <div className="clubStats">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Year"
                            value={year}
                            onChange={handleYearChange}
                        />
                        <button onClick={handleShowClubRatings}>
                            Show Club Ratings
                        </button>
                        {barChartData && <BarChart data={barChartData} />}
                    </div>
                </div>
                <div className="studentStats">
                    <button onClick={fetchDataForTable}>Show Reps Posts</button>
                    {tableData && <ReportTable data={tableData} />}  
                    <div className="StudentsInMajors"> 
                    <button onClick={fetchDataForPie}>Show Students' Distribution in Majors</button>
                    {chartData && <PieChart data={chartData} />}
                    </div>
                    <div className="weeklyStats">
                        <input
                            type="text"
                            placeholder="Enter Year"
                            value={weeklyYear}
                            onChange={handleWeeklyYearChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Month"
                            value={weeklyMonth}
                            onChange={handleWeeklyMonthChange}
                        />
                        <button onClick={handleShowWeeklyPostCount}>
                            Show Weekly Post Count
                        </button>
                        {weeklyChartData && <WeeklyPostCountChart data={weeklyChartData} />}
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
