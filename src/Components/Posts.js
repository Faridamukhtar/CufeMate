import React, {} from "react";
import './Posts.css';


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

//Fetch Posts
function Posts(props)
{
    
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

            </div>
        </div>
    );
}


export default Posts;