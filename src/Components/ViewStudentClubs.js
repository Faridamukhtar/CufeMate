import React, {useState, useEffect} from "react";
import './Posts.css';
import {getposts,fetchStudentCourses, fetchMajorAuthors} from "../CustomHooks/PostsHooks.js";

function StudentClubForm(props)
{
    return(
        <div className="form">
            <div className="formHeader">
                <div className="Title">
                    <h2>
                        {props.Course}
                    </h2>                
                </div>
                <div className="Categories">
                    <div className="Course">
                        <h6>
                            {props.Course}
                        </h6> 
                    </div>
                    <div className="Author">
                        <h6>
                            {props.FAuthor} {props.LAuthor}
                        </h6> 
                    </div>
                </div>
            </div>
            <div class='Content'>
                <h5>
                    {props.Content}
                </h5>   
            </div>
        </div>
    );
}



//TO DO: create button: Write if Rep, Request to Write if student, then add it to posts
function WriteType(props)
{
    return (
        <button className="apply">
            <h5>
                {props.applied? 'Applied' : 'Apply Now'}
            </h5>
        </button>
        )
}

function StudentClubOptions(props)
{
    if (props.options)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.std_club_id}>
                    {option.std_club_name}
                </option>)
        });

        return(
            <>
                <option value="">
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
        const listItems = props.formArray.map((post) => <li><Post Major={post.major_id} Content={post.content} Course={post.course_name} FAuthor={post.fname} LAuthor={post.lname}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}

//Fetch Posts
function PostSection(props)
{

    return (
        <div className="formsWrapper">
            <div className="LatestformsTitle">
                <h3>
                    Latest forms
                </h3>
                <WriteType Type={props.DashboardType}/>
            </div>
            <hr className="LineUnderform"/>
            <div className="filters">
                <Filters courses={StudentCourses} authors={Authors}/>
            </div>
            <div className="forms">
                <ul><Displayforms formArray={formsContent}/></ul>
            </div>
        </div>
    );
}

export default PostSection;