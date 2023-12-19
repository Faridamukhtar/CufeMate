import React, {useState, useEffect, Image} from "react";
import './StudentClubForms.css';
import { getStudentClubForms, getStudentApplicants, updateApplicantStatus} from "../CustomHooks/StudentClubsHooks.js";

const SCData = {std_club_name:"CU Eco-Racing team", std_club_id:1, email:'CUERT@gmail.com'}; //get logged in student data


function ApplicationStatus(props)
{
    if (props?.status!==0)
    {
        return(
        <>
        <button className="applystat" 
        disabled={true}>
            {props.status==2? 'rejected':'accepted'}
        </button>
        </>)

    }
    else if (props?.status!==undefined)
    {
        return(
            <div className="AcceptanceButtons">
                <button className="applystat2" onClick={()=>props.setStatus(1)}>
                    Accept
                </button>
                <button className="applystat2" onClick={()=>props.setStatus(2)}>
                    Reject
                </button>
            </div>
        )
    }
}


function ApplicantsList(props)
{
    const [status, setStatus] = useState(props.applicant.stat)

    useEffect(()=>
    {
        const OnChangeStatus = async()=>
        {
             if (status!=props.applicant.stat)
             {
                await updateApplicantStatus(status, props.applicant.form_id, props.applicant.std_id);
             }
        }
 
        OnChangeStatus();
    },[status])

    return(
        <div className="SingleApplicantWrapper">
            <div className="ApplicantName">
                <h4>
                    {props.applicant.fname} {props.applicant.lname}
                </h4>
            </div>
            <div className="ApplicantClass">
                <h6>
                    Class of {props.applicant.class} - {props.applicant.major_id}
                </h6>
            </div>
            <div className="ApplicationStatus">
                <ApplicationStatus status={status} setStatus={setStatus}/>
            </div>

        </div>
    );
}


function DisplayApplicants(props)
{
    if (props?.Applicants[0]?.std_id>0)
    {
        const listItems = props.Applicants.map((applicant) => <li><ApplicantsList applicant ={applicant}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}

function Applicants(props)
{
    const [ApplicantsContent, setApplicantsContent] = useState([{fname:"", lname:"", major_id:'CCE', std_id:0, class:'2026'}]);
    
    useEffect(()=>
    {
       const onMount = async()=>
       {
        console.log(props.formid);
            if (props.formid>0)
            {
                const data = await getStudentApplicants(props.formid);
                if (data?.length>0)
                    setApplicantsContent(data);
            }

       }

       onMount();

    },[props.formid])


    return (
        
    <div className="ApplicationWrapper">
        <div className="ApplicantsLabel">
            <h4>
                Applicants
            </h4> 
        </div>
        <div className='DisplayApplicants'>
            <DisplayApplicants Applicants={ApplicantsContent}/>
        </div>
    </div>

    );
}


function StudentClubForm(props)
{

    function handleClickInfo()
    {
        props.setSelectedFormId(props.form_id);
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
        const listItems = props.formArray.map((form) => <li><StudentClubForm form_title={form.form_title} std_club_id={form.std_club_id} std_club_name={form.std_club_name} requirements={form.requirements} email= {form.email} form_id={form.form_id} about={form.about} logo={form.logo} setSelectedFormId={(formid)=>props.setSelectedFormId(formid)}/></li>);
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
    const [SelectedFormID, setSelectedFormId] = useState(0)

    useEffect(()=>
    {
       const onMount = async()=>
       {
            const data = await getStudentClubForms(SCData.std_club_id);
            if (data?.length>0)
                setFormsContent(data);
       }

       onMount();

    },[])


    return (
    <div className="OuterWrapper">
        <div className="formsWrapperOuter">
            <div className="formsWrapper">
                <div className="LatestformsTitle">
                    <h3>
                        Latest Forms
                    </h3>
                </div>
                <hr className="LineUnderform"/>
                <div className="forms">
                    <ul><Displayforms formArray={formsContent} setSelectedFormId={setSelectedFormId}/></ul>
                </div>
            </div>
        </div>
        <div className="ApplicantsWrapper">
        <Applicants formid={SelectedFormID}/>
        </div>
    </div>


    );
}

export default StudentClubForms;