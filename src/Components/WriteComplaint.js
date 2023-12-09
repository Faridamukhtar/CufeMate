import React,{useState} from "react";
import './WriteComplaint.css';
import ComplaintTitleText from "./ComplaintTitleText.js";
import ComplaintInputText from "./ComplaintInputText.js";

function WriteComplaint(props)

{
    const [Tittle, setTitle] = useState('');
    const [Conttent, setContent] = useState('');
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
                0:500
            </div>
            <div className="SubmitButton"> 
        
                <div className="SubmitText"> 
                    <h6>
                       Submit
                   </h6>
                </div>
           </div>        
       </div>
   </div>
    );
}

export default WriteComplaint ;
