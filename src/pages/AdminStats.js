import React, { useState, useEffect} from "react";
import AdminBar from "../Components/adminBar.js";
import ReportTable from '../Components/ReportTable';
import PieChartComponent from '../Components/PieChart.js';
import BarChartComponent from '../Components/BarChartComponent.js'; 
import { useParams } from 'react-router-dom';
import './AdminStats.css';

const AdminStats = () => {
    const { admin_id } = useParams();//pass AdminID to the component
    const [tableData, setTableData] = useState(null);
    const [chartData, setChartData] = useState(''); //for pie
    const [barChartData, setBarChartData] = useState(null);
    const [year, setYear] = useState("");
    const [weeklyChartData, setWeeklyChartData] = useState(null);
    const [weeklyYear, setWeeklyYear] = useState("");
    const [weeklyMonth, setWeeklyMonth] = useState("");

    ///////////////////////// REP METRIC ////////////////////////////
    const fetchDataForWeeklyChart = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/stats/reps/activityMetric/${weeklyYear}/${weeklyMonth}`);
          const result = await response.json();
          console.log(result.data);
          setWeeklyChartData(result.data);
        } catch (error) {
          console.error('Error fetching data for weekly chart:', error);
        }
      };

    // Function to handle the button click
  const handleShowWeeklyPostCount = () => {
    // Validate year and month
    const isValidYear = /^\d+$/.test(weeklyYear) && parseInt(weeklyYear, 10) > 0;
    const isValidMonth = /^\d+$/.test(weeklyMonth) && parseInt(weeklyMonth, 10) > 0 && parseInt(weeklyMonth, 10) < 13;

    if (!isValidYear || !isValidMonth) {
      // Alert the user for invalid input
      alert("Please enter a valid positive integer for both year and month.");
      return;
    }

    // Fetch data if input is valid
    fetchDataForWeeklyChart();
  };

  // Transform data to include labels for the BarChartComponent
  const transformDataForRepChart = () => {
    if (!weeklyChartData) {
      return [];
    }

    return weeklyChartData.map((item) => ({
      label: `${item.fname} (${item.std_id})`,
      info: item.weekly_avg,
    }));
  };
  //////////////////////////////////////////////////////////////////////////////////////
    const fetchDataForTable = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/stats/reps/posts');
            const result = await response.json();
            console.log(result.data);
            setTableData(result.data);
        } catch (error) {
            console.error('Error fetching data for table:', error);
        }
    };

    ////////////////////////////// PIE ////////////////////////////////
    const fetchDataForPie = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/stats/studentsInMajors');
            const result = await response.json();
            console.log(result.data);
            setChartData(result.data);
        } catch (error) {
            console.error('Error fetching data for chart:', error);
        }
    };
//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// AVG CLUB RATING //////////////////////////////
    const fetchDataForBarChart = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/stats/clubs/avgRating/${year}`);
            const result = await response.json();
            console.log(result.data);
            setBarChartData(result.data);
        } catch (error) {
            console.error('Error fetching data for bar chart:', error);
        }
    };

    const handleShowClubRatings = () => {
        const isValidYear = /^\d+$/.test(year) && parseInt(year, 10) > 0;
    
        if (!isValidYear) {
            // Alert the user for invalid input
            alert("Please enter a valid positive integer for year.");
            return;
          }
      
          // Fetch data if input is valid
          fetchDataForBarChart();
    };
    const transformDataForClubChart = () => {
        if (!barChartData) {
          return [];
        }
    
        return barChartData.map((item) => ({
          label: `${item.std_club_name} (${item.std_club_id})`,
          info: item.avg_rate,
        }));
      };
//////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchDataForTable();
        fetchDataForPie();
    }, []);

    return (
        <div className="Layout">
            <div className="bar">
                <AdminBar props={admin_id}/>
            </div> 
            <div className="Dashboard">
            <div className="MainTitle">Statistics Window</div> 
                <div className="clubStats">
                    <div className="Titles">Clubs' Rating</div>
                        <input
                            type="text"
                            placeholder="Enter Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <button onClick={handleShowClubRatings}>
                            Show Club Ratings
                        </button>
                        {barChartData && <BarChartComponent data={transformDataForClubChart()} />}
                </div>
                <div className="studentStats">
                    <div className="StudentsInMajors"> 
                    <div className="Titles">Students' Distribution in Majors</div> 
                        {chartData && <PieChartComponent ChartData={chartData} />}
                    </div>
                    <div className="weeklyStats">
                    <div className="Titles">Weekly Post Count</div> 
                        <div>
                            <input
                            type="text"
                            placeholder="Enter Year"
                            value={weeklyYear}
                            onChange={(e) => setWeeklyYear(e.target.value)}
                            />
                            <input
                            type="text"
                            placeholder="Enter Month"
                            value={weeklyMonth}
                            onChange={(e) => setWeeklyMonth(e.target.value)}
                            />
                            <button onClick={handleShowWeeklyPostCount}>
                            Show Weekly Activity
                            </button>
                        </div>
                        {weeklyChartData && <BarChartComponent data={transformDataForRepChart()} />}
                    </div> 
                    <div className="Titles">Posts By Reps (Detailed Report)</div> 
                    {tableData && <ReportTable data={tableData} />} 
                </div> 
            </div>
        </div>   
    );
};

export default AdminStats;
