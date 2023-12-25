import React, {useState, useEffect} from "react";
import "./PreviousComplaints.css";

  

const getComplaints = async (std_id,title="",complaint_date="", stat="") => 
{
    try 
    {
       //const std_id=5;
      // Construct the URL with actual values for email and password
      const url = `http://localhost:8080/api/previouscomplaints/${encodeURIComponent(std_id)}`;
  
      // Make a GET request to the constructed URL
          const response = await fetch(url); 
          const ComplaintData = await response.json();
   
         // Render the array of components
          return ComplaintData;
          console.log(ComplaintData);
        } 
        catch (error) 
        {
          console.error('Error during login:', error);
        }
        console.log("submit clicked");
  };


function Complaint(props)
{
  const ChooseBoxColor= props.stat==='0'? 'PendingRect':'ReadRect';
  const ChooseBoxTextColor=props.stat==='0'? 'PendingText':'ReadText';
  const StatusText=props.stat==='0'? 'Pending':'Read';
   return(
        <div className="ComplaintRect">
              <div className={ChooseBoxColor}>
                 <div>
                     <h3 className={ChooseBoxTextColor}>
                          {StatusText}
                     </h3>
                 </div>
               </div>
               <div className="DateRect">
                    <h4 className="Date">
                       {props.date}
                    </h4>
               </div>
               <div>
                    <h5 className="ComplaintTitle">
                         {props.title}
                   </h5>
               </div>
       </div>
    );
};


function DisplayComplaints(props)
{
    if (props?.compArray[0])
    {
        console.log('AAAAA');
        const listItems = props.compArray.map ( (complaint) =>{return (<li><Complaint title={complaint.title} date={complaint.complaint_date} stat={complaint.stat} /></li>)});
        return listItems;
    }
    else
    {
        return " ";
    }

}


function PreviousComplaints(props) 
{  
  const [ComplaintsData, setComplaintsData]=useState([{title:"",complaint_date:"",stat:""}]);
    
    useEffect(()=>
    {
        const setComplaints= async () =>
        {
            const data = await getComplaints(props.studentData.std_id,'', '', '');
            console.log(data);
            setComplaintsData(data);
        }

        setComplaints();

    },[]);
 

  return (
     <div>
        <div className="Title">
           <h3>View Previous Complaints</h3>
        </div>
        <ul>
        <DisplayComplaints compArray={ComplaintsData}/>
        </ul>
        
     </div>
  );
}


export default PreviousComplaints;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




