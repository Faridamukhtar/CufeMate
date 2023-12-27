import React, {useState, useEffect} from "react";
import "./RepsViewComplaints.css";

  

const getComplaints = async (major_id, classs,title="" , content="", id="", date="") => 
{
    try 
    {
      // Construct the URL with actual values for email and password
        const url = `http://localhost:8080/api/repsviewcomplaints/${encodeURIComponent(major_id)}/${encodeURIComponent(classs)}`;
  
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
    //const [StdRepID, setStdRepID] = useState('');

    const handleRead = async (std_id, complaint_id) =>
     {
        try
         {
          //StdRepID=170;
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/markread/${encodeURIComponent(std_id)}/${encodeURIComponent(complaint_id)}`;
      
          // Make a GET request to the constructed URL
              const response = await fetch(url); 
              const result = await response.json();
              // Handle the login result as needed
              console.log(result);
              alert("the complaint was read and it's no longer pending ");
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
            <button className="Readbutton" onClick={() => handleRead(props.studentData.std_id,props.id)}> <h5 className="ReadButtontext">Read</h5></button>
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
        const listItems = props.compArray.map ( (complaint) =>{return (<li><Complaint title={complaint.title} content={complaint.content} id={complaint.complaint_id} date={complaint.complaint_date}  studentData={props.studentData}/></li>)});
        return listItems;
    }
    else
    {
        return " ";
    }

}


function Complaints(props) 
{  
  const [ComplaintsData, setComplaintsData]=useState([{title:"" , content:"", id:"" , date:""}]);
    
    useEffect(()=>
    {
        const setComplaints= async () =>
        {
            const data = await getComplaints(props.studentData.major_id, props.studentData.class,'', '', '', '');
            console.log(data);
            setComplaintsData(data);
        }

        setComplaints();

    },[]);
 

  return (
     <div>
        <ul>
        <DisplayComplaints compArray={ComplaintsData} studentData={props.studentData}/>
        </ul>
        
     </div>
  );
}


export default Complaints;

