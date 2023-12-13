import React, {useState, useEffect} from "react";
import './ViewStudentClubs.css';
import { getStudentClubForms } from "../CustomHooks/StudentClubsHooks.js";
import {InfoSVG} from "../svg/SvgFiles.js"

function Apply(props)
{
    return (
        <button className="apply">
            <h5>
                {props?.applied ? 'Withdraw Application' : 'Apply'}
            </h5>
        </button> 
        )
}

function StudentClubForm(props)
{
    return(
        <div className="form">
            <div className="ClubName">
                <div className="club">
                    <h6>
                        {props.std_club_name}
                    </h6> 
                    <InfoSVG/>
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
                <Apply applied={props.applied}/>
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
        const listItems = props.formArray.map((form) => <li><StudentClubForm form_title={form.form_title} std_club_name={form.std_club_name} requirements={form.requirements} email= {form.email}/></li>);
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
    const [applied, setApplied]=useState(false); //USE STORED PROCEDURE

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

       return ()=>
       {
            setChosenStudentClub(" ");
       }

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
                <ul><Displayforms formArray={formsContent} applied={applied}/></ul>
            </div>
        </div>
    );
}

export default FormsSection;