import React, {useState, useEffect} from "react";
import './Posts.css';
import getposts from "../hooks/getposts";

function Post(props)
{
    return(
        <div className="Post">
            <div className="Categories">
                <h5 className="Major">
                    {props.Major}
                </h5>
                <h5 className="Course">
                    {props.Course}
                </h5>           
            </div>
        </div>
    );
}

//TO DO: create button: Write if Rep, Request to Write if student, then add it to posts
function WriteType(props)
{

}

//TO DO: create filters
function Filters()
{

}


function DisplayPosts(props)
{
    if (props.postArray.post_id>0)
    {
        const listItems = props.postArray.map((post) => <li><Post Major={post.major} Content={post.content} Course={post.course} FAuthor={post.Fname} LAuthor={post.Lname}/></li>);
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
    const [postsContent, setPostsContent]=useState({fname:"",lname:"",post_date:"",content:"",post_id:0,course_name:""});
    
    useEffect(()=>
    {
        getposts('', 'CCE', '', setPostsContent);
    },[]);

    return (
        <div className="PostsWrapper">
            <div className="LatestPostsTitle">
                <h3>
                    Latest Posts
                </h3>
            </div>
            <hr className="LineUnderPost"/>
            <div className="filters">

            </div>
            <div className="Posts">
                <ul><DisplayPosts postArray={postsContent}/></ul>
            </div>
        </div>
    );
}


export default PostSection;