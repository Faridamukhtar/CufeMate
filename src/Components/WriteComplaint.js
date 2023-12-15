import React,{useState} from "react";
import './WriteComplaint.css';
import ComplaintTitleText from "./ComplaintTitleText.js";
import ComplaintInputText from "./ComplaintInputText.js";

function WriteComplaint(props)

{    
    const [Tittle, setTitle] = useState('');
    const [Conttent, setContent] = useState('');
    const [CharCount, setCharCount]=useState('');

    const handleSubmit = async (Tittle, Conttent) => {
        try {
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/writecomplaint/${encodeURIComponent(Tittle)}/${encodeURIComponent(Conttent)}`;
      
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


    return (
  <div>
     <div className ="Title">
              <h3>
                Write your complaint here
              </h3>       
     </div>

     <div className = "ComplaintBox">
            <div>
                <ComplaintTitleText placeholderText=" Add title" setInputValue={setTitle} inputValue={Tittle} />
            </div>  
            <hr className="UpperLine"/>
            <div>   
                <ComplaintInputText placeholderText=" Add content" setInputValue={setContent} inputValue={Conttent} />
            </div>    
            <hr className= "LowerLine"/>
            <div className="CharacterCount">
                {CharCount.length}/500
            </div>
            <button className="SubmitButton" onClick={() => handleSubmit(Tittle, Conttent)}> <h5 className="SubmitText">Submit</h5></button>
        
           </div>        
       </div>
    );
}

export default WriteComplaint ;