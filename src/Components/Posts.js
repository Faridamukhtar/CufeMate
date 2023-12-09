import React, {useState, useEffect} from "react";
import './Posts.css';
import getposts from "../hooks/getposts";

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
    if (props?.postArray[0]?.post_id>0)
    {
        console.log('AAAAA');
        const listItems = props.postArray.map((post) => <li><Post Major={post.major_id} Content={post.content} Course={post.course_name} FAuthor={post.fname} LAuthor={post.lname}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}


//Fetch Posts
function PostSection()
{
    const [postsContent, setPostsContent]=useState([{fname:"",lname:"",post_date:"",content:"",post_id:0,course_name:""}]);
    
    useEffect(()=>
    {
        const setPosts= async () =>
        {
            const data = await getposts('', 'CCE', '');
            setPostsContent(data);
        }

        setPosts();

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