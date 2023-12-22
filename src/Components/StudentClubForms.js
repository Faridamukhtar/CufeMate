import React, {useState, useEffect, Image} from "react";
import './StudentClubForms.css';
import { getStudentClubForms, getStudentApplicants, updateApplicantStatus, SubmitFormChanges, DeleteForm, AddMember} from "../CustomHooks/StudentClubsHooks.js";

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
                if (status===1) 
                {
                    await AddMember(props.applicant.form_id, props.applicant.std_id);
                }
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
        return (
        <>
        <h5 className="NoApplic">
        No Applicants Yet
        </h5>
        </>
        );
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
                else
                {
                    setApplicantsContent([{}]);
                }
            }
            else
            {
                setApplicantsContent([{}]);
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



function WriteForm(props)
{
    const [forminfo, setformInfo] = useState({form_title:"", requirements:""});

    const handleSubmit= (event)=>
    {
        const formInfo = new FormData(event.target);
        setformInfo({form_title:formInfo.get('form_title'), requirements:formInfo.get('formreq')})
    }

    useEffect(()=>
    {
        if (props?.form_id!==0 && props?.form_id!==undefined)
        {
            setformInfo({form_title: props.form.form_title, requirements:props.form.requirements});
        }

    },[props?.form_id])

    useEffect(()=>
    {
        const submitform = async()=>
        {
            await SubmitFormChanges(props?.form_id, SCData.std_club_id, forminfo.requirements,forminfo.form_title);
        }

        const newForm = async()=>
        {
            await SubmitFormChanges(0, SCData.std_club_id, forminfo.requirements,forminfo.form_title);
        }
        

        if (forminfo?.form_title!=="")
        {
            submitform();
        }

    }, [forminfo])

    return(
        <>
        <form onSubmit={handleSubmit}>
        <label for="form_title"><h3>Form Title</h3></label>
        <input type="text" id="formtitle" name="form_title" defaultValue={forminfo.form_title} required={true}/>
        <label for="formreq"><h3>Form Extra Requirements</h3></label>
        <input type="text" id="formreq" name="formreq" defaultValue={forminfo.requirements} required={true}/> 
        <div className="flexform">
        <input type="submit" id="submitbuttonform"/>
        </div>	       
        </form>

        </>
    );
}



function StudentClubForm(props)
{

    const [edit, setedit]=useState(false);
    const [deleted, setdeleted]=useState(false);
    function handleClickInfo()
    {
        props.setSelectedFormId(props.form_id);
    }

    function deleteForm()
    {
        const del = async ()=>
        {
            await DeleteForm(props.form_id);
            setdeleted(true);
        }
        del();
    }

    return(
        <div className="ClubformWrapper" hidden={deleted}>
            <div className="form">
                <div className="noedit" hidden={edit}>
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
                    <div className="editFormSection" hidden={!edit}>
                        <WriteForm form_id={props.form_id} form={props}/>
                    </div >
                    <div className="flexform">
                        <button className="editForm" hidden={edit} onClick={()=>setedit(!edit)}>
                            Edit Form
                        </button>
                        <button className="editForm" hidden={edit} onClick={()=>deleteForm()}>
                            Delete Form
                        </button>
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
    const [SelectedFormID, setSelectedFormId] = useState(0);
    const [newform,setnew]=useState(false);

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
                    <button className="NewForm" onClick={()=>setnew(!newform)}>
                        +
                    </button>
                </div>
                <hr className="LineUnderform"/>
                <div className="forms">
                    <div className="ClubformWrapper" hidden={!newform} setnew={setnew}>
                        <div className="form">
                        <WriteForm form_id={0}/>     
                        </div>           
                    </div>
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