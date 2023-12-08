import React, {} from "react";
import "./PreviousComplaints.css";


function PrevComplaint(props)
{
    return(
        <div className="ComplaintRect">
            <div className="Header">
                <div className="PendingRect">
                    <h6 className="PendingText">
                        Pending
                    </h6>
                </div>
                <div className="Date">
                    {props.Date}
                </div>
                <div>
                    <h5 className="ComplaintTitle">
                         {props.ComplaintTitle}
                    </h5>
                </div>
            </div>
        </div>
    );
}

//el mafroud andah func gowwa el div el fadi?
function PreviousComplaints(props)
{
    return (
        <div>
            <div className="Title">
                <h3>
                    View Previous Complaints
                </h3>
            </div>
        
            <div >
            
            </div>

        </div>
    );
    
}
export default PreviousComplaints;