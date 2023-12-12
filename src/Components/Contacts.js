import React, {useState, useEffect} from "react";
import "./Contacts.css";

  

const getContacts = async (fname="", lname="", email="") => 
{
    try 
    {
        //const major='CCEC';
        //const classs='2025';
      // Construct the URL with actual values for email and password
      const url = `http://localhost:8080/api/repscontacts/${encodeURIComponent(major)}/${encodeURIComponent(classs)}`;
  
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
       <div className="Container">
        <div className="Name">
            <h5>
                {props.fname} {props.lname}
            </h5>
        </div>
        <div className="Email">
            {props.email}
        </div>
       </div>
    );
};


function DisplayContacts(props)
{
    if (props?.compArray[0])
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


function Contacts() 
{  
  const [ContactsData, setContactsData]=useState([{fname:"",lname:"",email:""}]);
    
    useEffect(()=>
    {
        const setContacts= async () =>
        {
            const data = await getContacts('', '', '');
            console.log(data);
            setContactsData(data);
        }

        setContacts();

    },[]);
 

  return (
     <div>
        <div className="Title">
           <h3>Contacts</h3>
        </div>
        <ul>
        <DisplayContacts contArray={ContactsData}/>
        </ul>
        
     </div>
  );
}


export default Contacts;