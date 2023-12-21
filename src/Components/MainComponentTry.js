// MainComponent.js -> PieChart test
//import React, { useState, useEffect } from 'react';
//import PieChartComponent from './PieChart.js';
//const MainComponent = () => {
  /*const [chartData, setChartData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('http://localhost:8080/api/stats/studentsInMajors');
        const result = await response.json();
        console.log(result.data);
        setChartData(result.data);
      } catch (error) {
        console.error('Error fetching data for chart:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Students' Distribution in Majors</h1>
      {chartData && <PieChartComponent ChartData={chartData} />}
    </div>
  );*/
//};
//export default MainComponent;

// MainComponent.js ->BarChart test for Rep Metric
/*import React, { useState, useEffect } from 'react';
import BarChartComponent from './BarChartComponent';

const MainComponent = () => {
  // State variables
  const [weeklyChartData, setWeeklyChartData] = useState(null);
  const [weeklyYear, setWeeklyYear] = useState("");
  const [weeklyMonth, setWeeklyMonth] = useState("");

  // Function to fetch data for the weekly chart
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
  const transformDataForChart = () => {
    if (!weeklyChartData) {
      return [];
    }

    return weeklyChartData.map((item) => ({
      label: `${item.fname} (${item.std_id})`,
      info: item.weekly_avg,
    }));
  };

  return (
    <div>
      <h1>Weekly Post Count</h1>
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
          Show Weekly Post Count
        </button>
      </div>
      {weeklyChartData && <BarChartComponent data={transformDataForChart()} />}
    </div>
  );
};

export default MainComponent;*/

// MainComponent.js ->BarChart test for ClubRating
import React, { useState, useEffect } from 'react';
import BarChartComponent from './BarChartComponent';

const MainComponent = () => {
  // State variables
  const [barChartData, setBarChartData] = useState(null);
  const [year, setYear] = useState("");

  // Function to fetch data for the weekly chart
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

  // Function to handle the button click
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
  // Transform data to include labels for the BarChartComponent
  const transformDataForClubChart = () => {
    if (!barChartData) {
      return [];
    }

    return barChartData.map((item) => ({
      label: `${item.std_club_name} (${item.std_club_id})`,
      info: item.avg_rate,
    }));
  };
  
  return (
    <div className="clubStats">
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
  );
};

export default MainComponent;
