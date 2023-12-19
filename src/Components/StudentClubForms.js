import React, {useState, useEffect, Image} from "react";
import './StudentClubForms.css';
import { getStudentClubForms, Apply_To_Club, Withdraw_Application, ApplicantStatus, Rate_Club, getRateStatus } from "../CustomHooks/StudentClubsHooks.js";
import {InfoSVG, StarSVGFilled, StarSVGUnfilled} from "../svg/SvgFiles.js"

const SCData = {std_club_name:"CU Eco-Racing team", std_club_id:1, email:'CUERT@gmail.com'}; //get logged in student data

function StudentClubForm(props)
{

    function handleClickInfo()
    {

    }

    return(
        <div className="ClubformWrapper">
            <div className="form">
                <div className="ClubName">
                    <div className="club" onClick={handleClickInfo}>
                        <h6>
                            View Applicants
                        </h6> 
                    </div>
                </div>
                <div className="formHeader">
                    <div className="TitleForm">
                        <h2>
                            {props.form_title}
                        </h2>                
                    </div>
                </div>
                <div class='ContentWrap'>
                    <div class='ContentClub'>
                        <h5>
                            Extra Requirements: {props.requirements}
                        </h5> 
                        <h5>
                            To be sent on email: {props.email}
                        </h5> 
                    </div>
                </div>
            </div>
        </div>
    );
}

function Displayforms(props)
{
    if (props?.formArray[0]?.form_id>0)
    {
        const listItems = props.formArray.map((form) => <li><StudentClubForm form_title={form.form_title} std_club_id={form.std_club_id} std_club_name={form.std_club_name} requirements={form.requirements} email= {form.email} form_id={form.form_id} about={form.about} logo={form.logo}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}

//Fetch Posts
function StudentClubForms()
{
    const [formsContent, setFormsContent] = useState([{std_club_id:0, std_club_name:"", email:"", about:"", logo:"",form_id:0, form_title:'', requirements:'', form_date:''}])

    useEffect(()=>
    {
       const onMount = async()=>
       {
            const data = await getStudentClubForms(SCData.std_club_id);
            if (data!==null && data!==undefined)
                setFormsContent(data);
       }

       onMount();

    },[])


    return (
    <div className="formsWrapper2">
        <div className="formsWrapper22">
            <div className="LatestformsTitle">
                <h3>
                    Latest Forms
                </h3>
            </div>
            <hr className="LineUnderform"/>
            <div className="forms">
                <ul><Displayforms formArray={formsContent}/></ul>
            </div>
        </div>
    </div>

    );
}

export default StudentClubForms;