import React, { useState , useEffect ,useRef  } from 'react';
import ChooseHeader from "./Header.js";
import BarChart from "./BarCharts";
import ClubMemberTable from "./ClubMemberTable.js"
import TextInput from './TextInput';
import './Clubstat.css';


const BarStats = ({ startYear }) => {
    const [data, setMemberData] = useState([]); // Stores X values
    const [labels, setLabels] = useState([]); // Stores Y values
     startYear = parseInt(startYear, 10); //convert to number

    const fetchClubMembers = async (id, year) => {
      const url = `http://localhost:8080/api/GetClubMembersperyear/?id=${id}&year=${year}`;
      const response = await fetch(url);
      const result = await response.json();
      const count = result.length > 0 ? result[0].count : 0;
      return count;
    };
  
    const getData = async (id, startYear, currentYear) => {
      try {
        const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => i + startYear); //loop get years
        const dataPromises = years.map(year => fetchClubMembers(id, year)); //get the actual data for each year
        const dataResults = await Promise.all(dataPromises);
  
        setMemberData(dataResults);
        setLabels(years);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      getData(12, startYear, 2023);
    }, [startYear]); // To run whenever startYear changes
  
    return (
      <div>
        <BarChart yaxisName='# of members per year' xaxisName='Year' xValues={labels} yValues={data} />
      </div>
    );
  };

//Table 
const  MembersTable=()=>
{   
    const [getMembers, setGetMembers] = useState([]);
      /////////////////////////////////////TO BE REMOVED WHEN ACTUAL LINKING OCCUR//////////////////////
      let std_clb_id = 12;

    useEffect(() => {
        const fetchMembers = async (std_clb_id) => {
            try {
                let url = `http://localhost:8080/api/GetClubMembers/?id=${std_clb_id}`;
                const response = await fetch(url);
                console.log(url);
                const data = await response.json();
                setGetMembers(data);
                console.log(data);
                // Update outputArray after setting the state
                const outputArray = data.map((item) => ({
                    id: item.std_id,
                    first_name: item.fname,
                    last_name: item.lname
            }));
            setMembers(outputArray);
            } catch (error) {
                 console.error('Error fetching Members:', error);
            }
         };

        fetchMembers(std_clb_id);
    }, []);

    const [members, setMembers] = useState([]);
    console.log('Output',members)

    const handleRemoveMemberfromclub = async (id,std_clb_id) => {
        const yr = new Date().getFullYear();
        const url = `http://localhost:8080/api/RemoveMember/?id=${id}&std_club_id=${std_clb_id}&year=${yr}`;
        console.log(url)
        const response = await fetch(url);
    }

    
      const handleRemoveMember = (id) => {
        const updatedMembers = members.filter((member) => member.id !== id);
        setMembers(updatedMembers);
        handleRemoveMemberfromclub(id,std_clb_id)
      };
    
      const tableTitles = ['first_name','last_name']; //Lazm yba nfs el maktob gamb el id fy el use state fo2

    return (
            <div>
            <ClubMemberTable titles={tableTitles} members={members} onRemoveMember={handleRemoveMember} />
            </div>
    );
}

function PageBody(props)
{
    const [startYear, setstartYear] = useState(2020);
    const [startYear2, setstartYear2] = useState(2020);

        const handleClick = () => {
            // Attempt to parse the input as an integer
            const parsedValue = parseInt(startYear2, 10);
        
            // Check if the parsed value is a valid integer
            if (!isNaN(parsedValue)) {
                setstartYear(parsedValue.toString()); // Set the state as a string
            }
             else {
              alert("Please enter a valid integer.");
            }
          };
          const handleChange = (e) => {
            setstartYear2(e.target.value);
          };

      return (
        <div className="Wrapper">
            
            <div style={{display:'flex' , justifyContent:'space-between'}}>
              <div>
                <div style={{ marginLeft:'10%'}}>
                <p className='Title2'>
                    Please enter The Start Year
                </p>
                <div style={{display:'flex' , justifyContent:'space-between'}}>
                <input
                      type={'text'}
                      value={startYear2}
                      onChange={handleChange}
                      placeholder={'Starting year'}
                      className='TextBox'
                    />

                    <div className="button-container2">
                      <button className="button-clicked2" onClick={handleClick}>
                      <span className="label-clicked2">Get Statistics </span>
                      </button>
                    </div>
                 </div>
                </div>
                <BarStats startYear={startYear} />

              </div>
            <MembersTable />
            </div>
        </div>
    );
}



function Clubstat(props)
{
    return (
        <div className="SettingsWrapper">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType='StudentClub'/>
            </div>
            <div className="DashboardBody">
               <PageBody DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default Clubstat;