import React, {} from "react";
import './Posts.css';


function Post(props)
{
    return(
        <div className="Post">
            <h5 className="CourseName">
                Course
            </h5>
        </div>
    );
}

function Posts()
{
    return (
        <div className="PostsWrapper">
            <div className="LatestPostsTitle">
                <h3>
                    Latest Posts
                </h3>
            </div>
            <hr className="postHR"/>
            <div className="Posts">

            </div>
        </div>
    );
}


export default Posts;