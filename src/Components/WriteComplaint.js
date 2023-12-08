import React,{} from "react";
import './WriteComplaint.css';

function WriteComplaint(props)
{
    return (
  <div>
     <div className ="Title">
              <h3>
                Write your complaint here
              </h3>       
     </div>

     <div className = "ComplaintBox">
            <div>
                <h3 className="ComplaintTitle">
                    Add Title:
                </h3>
            </div>
            <hr className="UpperLine"/>
            <div className ="ComplaintContent">   

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
