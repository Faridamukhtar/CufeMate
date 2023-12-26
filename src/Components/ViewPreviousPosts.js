import React, {useState, useEffect} from "react";
import "./ViewPreviousPosts.css";

  

const getPosts = async (std_id,post_date="", content="", Course="") => 
{
    try 
    {
       //const std_id=5;
      // Construct the URL with actual values for email and password
      const url = `http://localhost:8080/api/previousposts/${encodeURIComponent(std_id)}`;
  
      // Make a GET request to the constructed URL
          const response = await fetch(url); 
          const PostData = await response.json();
   
         // Render the array of components
          return PostData;
          console.log(PostData);
        } 
        catch (error) 
        {
          console.error('Error during login:', error);
        }
        console.log("submit clicked");
  };


function Post(props)
{
  
   return(
        <div className="PostRect">
            <div className="CourseRect">
              <div>
               <h3 className="CourseText">
                {props.course}
               </h3>
               </div>
            <div>
            <div className="DateRect">
              <h4 className="Date">
                {props.post_date}
              </h4>
            </div>
            <div className="Content">
               {props.content}
            </div>
               </div>
           </div>
       </div>
    );
};


function DisplayPosts(props)
{
    if (props?.postArray[0])
    {
        console.log('AAAAA');
        const listItems = props.postArray.map ( (post) =>{return (<li><Post  post_date={post.post_date} content={post.content} course={post.course_name} /></li>)});
        return listItems;
    }
    else
    {
        return " ";
    }

}


function PreviousPosts(props) 
{  
  const [PostsData, setPostsData]=useState([{post_date:"",content:"", course:""}]);
    
    useEffect(()=>
    {
        const setPosts= async () =>
        {
            const data = await getPosts(props.studentData.std_id,'','', '');
            console.log(data);
            setPostsData(data);
        }

        setPosts();

    },[]);
 

  return (
     <div>
        <div className="Title">
           <h3>View Previous Posts</h3>
        </div>
        <ul>
        <DisplayPosts postArray={PostsData}/>
        </ul>
        
     </div>
  );
}


export default PreviousPosts;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




