import React, {useState, useEffect} from "react";
import "./Contacts.css";
import { useParams } from "react-router-dom";

  

const getContacts = async ( classs,major_id, fname="", lname="", email="") => 
{
    try 
    {
       // const major='CCEC';
      //  const classs='2026';
      // Construct the URL with actual values for email and password
        const url = `http://localhost:8080/api/repscontacts/${encodeURIComponent(major_id)}/${encodeURIComponent(classs)}`;
  
      // Make a GET request to the constructed URL
          const response = await fetch(url); 
          const ContactsData = await response.json();
   
         // Render the array of components
          return ContactsData;
          console.log(ContactsData);
        } 
        catch (error) 
        {
          console.error('Error during login:', error);
        }
        console.log("submit clicked");
  };


function Contact(props)
{
   return(
       <div className="ContactsContainer">
        <div>
            <h5 className="Name">
                {props.fname} {props.lname}
            </h5>
        </div>
        <div>
            <h6 className="Email">
                {props.email}
            </h6>
        </div>
       </div>
    );
};


function DisplayContacts(props)
{
    if (props?.contArray[0])
    {
        console.log('AAAAA');
        const listItems = props.contArray.map ( (student) =>{return (<li><Contact fname={student.fname} lname={student.lname} email={student.email} /></li>)});
        return listItems;
    }
    else
    {
        return " ";
    }

}


function Contacts(props) 
{  
  const [ContactsData, setContactsData]=useState([{fname:"",lname:"",email:""}]);
  console.log(props.studentData.class);
  console.log(props.studentData.major_id);
    
    useEffect(()=>
    {
        const setContacts= async () =>
        {
            const data = await getContacts( props.studentData.class,props.studentData.major_id,'', '', '');
            console.log(data);
            setContactsData(data);
        }

        setContacts();

    },[]);
 

  return (
     <div>
        <ul>
        <DisplayContacts contArray={ContactsData}/>
        </ul>
        
     </div>
  );
}


export default Contacts;