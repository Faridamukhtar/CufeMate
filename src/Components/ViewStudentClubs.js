import React, {useState, useEffect, Image} from "react";
import './ViewStudentClubs.css';
import { getStudentClubForms, Apply_To_Club, Withdraw_Application, ApplicantStatus, Rate_Club, getRateStatus } from "../CustomHooks/StudentClubsHooks.js";
import {InfoSVG, StarSVGFilled, StarSVGUnfilled} from "../svg/SvgFiles.js"

const studentData = {fname:"Ahmed", lname:"Mohamed", major_id:'CCEC', std_id:123, class:2026}; //get logged in student data
function Stars(props) {
    return (
      <>
        <div className="rating1" onClick={() => props.setRatingN(1)}>
          {props.RatingN >= 1 ? <StarSVGFilled /> : <StarSVGUnfilled />}
        </div>
        <div className="rating2" onClick={() => props.setRatingN(2)}>
          {props.RatingN >= 2 ? <StarSVGFilled /> : <StarSVGUnfilled />}
        </div>
        <div className="rating3" onClick={() => props.setRatingN(3)}>
          {props.RatingN >= 3 ? <StarSVGFilled /> : <StarSVGUnfilled />}
        </div>
        <div className="rating4" onClick={() => props.setRatingN(4)}>
          {props.RatingN >= 4 ? <StarSVGFilled /> : <StarSVGUnfilled />}
        </div>
        <div className="rating5" onClick={() => props.setRatingN(5)}>
          {props.RatingN === 5 ? <StarSVGFilled /> : <StarSVGUnfilled />}
        </div>
      </>
    );
  }

function StudentClubDetails(props)
{
    const [RatingN, setRatingN]=useState(0);


    useEffect(()=>
    {
        const setRating = async()=>
        {
         console.log('Rating:', RatingN);
         await Rate_Club(RatingN, studentData.std_id, props.std_club_id)
        }
        if (RatingN!==0)
        {
            setRating();
        }

    },[RatingN])

    useEffect(()=>
    {
       const onMount = async()=>
       {    
            const data = await getRateStatus(studentData.std_id, props.std_club_id);
            if (data!==undefined && data!==null)
            {
                setRatingN(parseInt(data))
            }
            else
            {
                setRatingN(0);
            }
       }

       onMount();

    },[]);

    console.log(props.logo);
    return (
    <div className="StudentClubDetails">
        <div className="SClogoWrapper">
            <div className="SClogo">
                <img 
                    src={props.logo}
                />
            </div>
        </div>
        <div className="SCcontent">
            <div className="SCName">
                <h4>
                {props.std_club_name}
                </h4>

            </div>
            <div className="SCDescription">
                <h5>
                    {props.about}
                </h5>
            </div>
            <div className="Rating">
                <h5>
                    Rating:
                </h5>
                <Stars setRatingN={setRatingN} RatingN={RatingN}/>
            </div>
        </div>
    </div>
    )
}


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
    if (props?.applied===-1)
    {
        return ('Apply');
    }
    return ('');
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
    const [applied, setApplied]=useState(-2);
    const [InsertedApply, setInsertedApply] = useState(-1);
    const [InfoHidden, SetInfoHidden] = useState(true);


    function handleClickInfo()
    {
        SetInfoHidden(!InfoHidden);
    }

    useEffect(()=>
    {
       const onMount = async()=>
       {    
            const data = await ApplicantStatus(props.form_id, studentData.std_id)
            if (data!==undefined && data!==null)
            {
                setApplied(parseInt(data));
                setInsertedApply(parseInt(data));
            }
            else
            {
                setApplied(-1);
                setInsertedApply(-1);
            }
       }

       onMount();

},[props]);

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
        <div className="ClubformWrapper">
            <div className="form">
                <div className="ClubName">
                    <div className="club">
                        <h6>
                            {props.std_club_name}
                        </h6> 
                        <div className="InfoSVG" onClick={handleClickInfo}>
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
                <div class='ContentWrap'>
                    <div class='ContentClub'>
                        <h5>
                            Extra Requirements: {props.requirements}
                        </h5> 
                        <h5>
                            To be sent on email: {props.email}
                        </h5> 
                    </div>
                    <Apply applied={applied} setApplied={setApplied}/>
                </div>
            </div>
                <div className="studentClubDetails" hidden={InfoHidden}>
                    <StudentClubDetails std_club_name={props.std_club_name} about={props.about} logo={props.logo} std_club_id={props.std_club_id}/>
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
        const listItems = props.formArray.map((form) => <li><StudentClubForm form_title={form.form_title} std_club_id={form.std_club_id} std_club_name={form.std_club_name} requirements={form.requirements} email= {form.email} form_id={form.form_id} about={form.about} logo={form.logo} chosenStudentClub={props.chosenStudentClub}/></li>);
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
                if (!studentclubs.find((club) => club.std_club_id === option.std_club_id)) {
                  studentclubs= ([...studentclubs,{std_club_id:option.std_club_id, std_club_name:option.std_club_name}]);
                }
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
        <div className="formsWrapperViewSC">
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
                <ul><Displayforms formArray={formsContent} chosenStudentClub={chosenStudentClub}/></ul>
            </div>
        </div>
    );
}

export default FormsSection;