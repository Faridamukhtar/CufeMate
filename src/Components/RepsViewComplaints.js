import React, {useState, useEffect} from "react";
import "./RepsViewComplaints.css";

  

const getComplaints = async (title="" , content="", id="", date="") => 
{
    try 
    {
      // Construct the URL with actual values for email and password
        const url = `http://localhost:8080/api/repsviewcomplaints/`;
  
      // Make a GET request to the constructed URL
          const response = await fetch(url); 
          const ComplaintsData = await response.json();
   
         // Render the array of components
          return ComplaintsData;
          console.log(ComplaintsData);
        } 
        catch (error) 
        {
          console.error('Error during login:', error);
        }
        console.log("submit clicked");
  };


function Complaint(props)
{
    const [StdRepID, setStdRepID] = useState('');

    const handleRead = async (StdRepID, complaint_id) =>
     {
        try
         {
          StdRepID=170;
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/markread/${encodeURIComponent(StdRepID)}/${encodeURIComponent(complaint_id)}`;
      
          // Make a GET request to the constructed URL
              const response = await fetch(url); 
              const result = await response.json();
              // Handle the login result as needed
              console.log(result);
            } 
            catch (error) {
              console.error('Error during login:', error);
            }
            console.log("submit clicked");
      };




   return(
       <div className="Container">
           <div>
               <h5 className="Title">
                   {props.title} 
               </h5>
           </div>
           <div className="DateRect">
              <h4 className="Date">
                {props.date}
              </h4>
            </div>
           <div>
            <button className="Readbutton" onClick={() => handleRead(StdRepID,props.id)}> <h5 className="ReadButtontext">Read</h5></button>
           </div>       
           <div className="ComplaintContent">
               <h6>
                   {props.content}
               </h6>
           </div>
       </div>
    );
};


function DisplayComplaints(props)
{
    if (props?.compArray[0])
    {
        console.log('AAAAA');
        const listItems = props.compArray.map ( (complaint) =>{return (<li><Complaint title={complaint.title} content={complaint.content} id={complaint.complaint_id} date={complaint.complaint_date} /></li>)});
        return listItems;
    }
    else
    {
        return " ";
    }

}


function Complaints() 
{  
  const [ComplaintsData, setComplaintsData]=useState([{title:"" , content:"", id:"" , date:""}]);
    
    useEffect(()=>
    {
        const setComplaints= async () =>
        {
            const data = await getComplaints('', '', '', '');
            console.log(data);
            setComplaintsData(data);
        }

        setComplaints();

    },[]);
 

  return (
     <div>
        <ul>
        <DisplayComplaints compArray={ComplaintsData}/>
        </ul>
        
     </div>
  );
}


export default Complaints;

