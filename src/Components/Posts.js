import React, {useState, useEffect} from "react";
import './Posts.css';
import {getposts,fetchStudentCourses, fetchMajorAuthors} from "../CustomHooks/PostsHooks.js";
import ChooseHeader from "./Header.js";

const studentData = {fname:"Ahmed", major_id:'CCE', std_id:1, class:'2026'}; //get logged in student data

function Post(props)
{
    return(
        <div className="Post">
            <div className="PostHeader">
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



function WriteType(props)
{
    if (props.Type=='student')
    {
        return (
            <button className="WritePost">
                <h5>
                Request To Write Post
                </h5>
            </button>
        )
    }
    else
    {
        return (
            <button className="WritePost">
                <h5>
                Write Post
                </h5>            
            </button>
        )
    }
}


function CourseOptions(props)
{
    if (props.options)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.course_name}>
                    {option.course_name}
                </option>);
        });
        return (
            <>
            <option value="">
                All Courses
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

function AuthorOptions(props)
{
    if (props.options)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.fname}>
                    {option.fname} {option.lname}
                </option>)
        });

        return(
            <>
                <option value="">
                    All Authors
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

function DisplayPosts(props)
{
    if (props?.postArray[0]?.post_id>0)
    {
        const listItems = props.postArray.map((post) => <li><Post Major={post.major_id} Content={post.content} Course={post.course_name} FAuthor={post.fname} LAuthor={post.lname}/></li>);
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
    const [postsContent, setPostsContent]=useState([{fname:"",lname:"",post_date:"",content:"",post_id:0,course_name:""}]);
    const [StudentCourses, setStudentCourses]=useState([{course_name:"", course_id:""}]);
    const [Authors, setAuthors]=useState([{fname:"", lname:"", std_id:""}]);
    const [ChosenAuthor, setChosenAuthor] = useState('');
    const [ChosenCourse, setChosenCourse] = useState('');

    useEffect(()=>
    {
        const FilterByCourseandAuthor = async (Course,Author) =>
        { 
            const data = await getposts(`${Author}`, `${studentData.major_id}` , `${Course}`, `${studentData.std_id}`);
            setPostsContent(data);
        }

        FilterByCourseandAuthor(ChosenCourse, ChosenAuthor);
        
    },[ChosenCourse,ChosenAuthor]);

    useEffect(()=>
    {
        fetchStudentCourses(studentData.std_id).then((courses)=>
        {
            console.log('courses', courses);
            setStudentCourses(courses);
        })

        fetchMajorAuthors(studentData.major_id).then((authors)=>
        {
            console.log('authors', authors);
            setAuthors(authors);
        })

    },[]);

    function Filters(props)
    {   
        return (
        <div className="Filters">
            <select className="Filter"
            defaultValue=""
            value={ChosenCourse}
            onChange={(e)=>setChosenCourse(e.target.value)}>
                <CourseOptions options={props.courses}/>
            </select>
            <select className="Filter" 
            defaultValue=""
            value={ChosenAuthor}
            onChange={(e)=>setChosenAuthor(e.target.value)}>
                <AuthorOptions options={props.authors}/>
            </select>
        </div>
        );
    }

    return (
        <div className="PostsWrapper">
            <div className="LatestPostsTitle">
                <h3>
                    Latest Posts
                </h3>
                <WriteType Type={props.studentType}/>
            </div>
            <hr className="LineUnderPost"/>
            <div className="filters">
                <Filters courses={StudentCourses} authors={Authors}/>
            </div>
            <div className="Posts">
                <ul><DisplayPosts postArray={postsContent}/></ul>
            </div>
        </div>
    );
}

export default PostSection;