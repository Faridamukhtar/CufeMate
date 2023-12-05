import React, {} from "react";
import './Posts.css';

function Post(props)
{
    return(
        <div className="Post">
            <div className="categories">
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