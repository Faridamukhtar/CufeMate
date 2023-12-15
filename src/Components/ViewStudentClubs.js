import React, {useState, useEffect} from "react";
import './ViewStudentClubs.css';
import { getStudentClubForms, Apply_To_Club, Withdraw_Application, ApplicantStatus } from "../CustomHooks/StudentClubsHooks.js";
import {InfoSVG} from "../svg/SvgFiles.js"

const studentData = {fname:"Ahmed", lname:"Mohamed", major_id:'CCE', std_id:1, class:'2026'}; //get logged in student data

function ChooseText(props)
{
    if (props?.applied===0)
    {
        return ('Withdraw Application')
    }
    if (props?.applied===1)
    {
        return ('Currently A Member')
    }
    if (props?.applied===2)
    {
        return ('Rejected')
    }
    return ('Apply');
}


function Apply(props)
{
    return (
        <button className="apply" 
        disabled={props.applied===2 || props.applied===1} 
        onClick={()=>props.setApplied((prev)=> 
            {
                if (prev===0) 
                {
                    return (-1);
                }
                return (0);
            })}
        >
            <h5>
                <ChooseText applied={props.applied}/>
            </h5>
        </button> 
        )
}

function StudentClubForm(props)
{
    const [applied, setApplied]=useState(-1);
    const [InsertedApply, setInsertedApply] = useState(-1);

    useEffect(()=>
    {
       const onMount = async()=>
       {    
            const data = await ApplicantStatus(props.form_id, studentData.std_id)
            if (data?.length>0 && data[0]?.stat!==undefined && data[0]?.stat!==null)
            {
                setApplied(data[0]?.stat);
                setInsertedApply(data[0]?.stat);
            }
            else
            {
                setApplied(-1);
                setInsertedApply(-1);
            }
       }

       onMount();

},[]);

useEffect(()=>
{
       const apply = async()=>
       {
        console.log('Inserted:', InsertedApply)
        console.log('Final Apply', applied);
            if (InsertedApply!==applied)
            {
                if (applied==0)
                {
                    await Apply_To_Club(props.form_id, studentData.std_id);
                    setInsertedApply(0);
                }
                if (applied ==-1)
                {
                    await Withdraw_Application(props.form_id, studentData.std_id);
                    setInsertedApply(-1);
                }
            }
        }

        apply();

},[applied]);



    return(
        <div className="form">
            <div className="ClubName">
                <div className="club">
                    <h6>
                        {props.std_club_name}
                    </h6> 
                    <div className="InfoSVG">
                        <InfoSVG/>
                    </div>
                </div>
            </div>
            <div className="formHeader">
                <div className="TitleForm">
                    <h2>
                        {props.form_title}
                    </h2>                
                </div>
            </div>
            <div class='Content'>
                <h5>
                    Extra Requirements: {props.requirements}
                </h5> 
                <h5>
                    To be sent on email: {props.email}
                </h5> 
                <Apply applied={applied} setApplied={setApplied}/>
            </div>
        </div>
    );
}

function StudentClubOptions(props)
{
    if (props.options[0]?.std_club_id>0)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.std_club_id}>
                    {option.std_club_name}
                </option>)
        });

        return(
            <>
                <option value=" ">
                    All Clubs' Announcements
                </option>
                {OptionsSelection}
            </>
        );
    }
    else{ 
        return (
            <>
            No Options Available
            </>);
    }

}

function Displayforms(props)
{
    if (props?.formArray[0]?.form_id>0)
    {
        const listItems = props.formArray.map((form) => <li><StudentClubForm form_title={form.form_title} std_club_name={form.std_club_name} requirements={form.requirements} email= {form.email} form_id={form.form_id}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}

//Fetch Posts
function FormsSection()
{
    const [formsContent, setFormsContent] = useState([{std_club_id:0, std_club_name:"", email:"", about:"", logo:"",form_id:0, form_title:'', requirements:'', form_date:''}])
    const [chosenStudentClub, setChosenStudentClub] = useState(" ");
    const [StudentClubs, setStudentClubs] = useState([{std_club_id:0, std_club_name:""}]);

    useEffect(()=>
    {
       const onMount = async()=>
       {
            const data = await getStudentClubForms(chosenStudentClub);
            let studentclubs=[{std_club_id:0, std_club_name:""}];
            data.forEach((option)=>
            {
                studentclubs = ([...studentclubs,{std_club_id:option.std_club_id, std_club_name:option.std_club_name}]);
                console.log('studentclubs',studentclubs);
            })
            studentclubs.shift();
            setStudentClubs(studentclubs);
            setFormsContent(data);
       }

       onMount();

    },[])

    useEffect(()=>
    {
       const onChangeSelection = async()=>
       {
            const data = await getStudentClubForms(chosenStudentClub);
            setFormsContent(data);
       }
       
       onChangeSelection();

    },[chosenStudentClub])


    function Filters()
    {   
        return (
        <div className="FiltersClub">
            <select className="FilterClub"
                defaultValue=" "
                value={chosenStudentClub}
                onChange={(e)=>setChosenStudentClub(e.target.value)}>
                <StudentClubOptions options={StudentClubs}/>
            </select>
        </div>
        );
    }


    return (
        <div className="formsWrapper">
            <div className="LatestformsTitle">
                <h3>
                    Latest Student Club Announcements
                </h3>
            </div>
            <hr className="LineUnderform"/>
            <div className="filtersClub">
                <Filters options={StudentClubs}/>
            </div>
            <div className="forms">
                <ul><Displayforms formArray={formsContent}/></ul>
            </div>
        </div>
    );
}

export default FormsSection;