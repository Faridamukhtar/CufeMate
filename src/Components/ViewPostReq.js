import React, {useState, useEffect} from "react";
import "./ViewPostReq.css";

  

const getPosts = async (major_id, classs, post_date="", content="", Course="", id="" ) => 
{
    try 
    {
       
      // Construct the URL with actual values for email and password
      const url = `http://localhost:8080/api/viewpostreq/${encodeURIComponent(major_id)}/${encodeURIComponent(classs)}`;
  
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
    //const [StdRepID, setStdRepID] = useState('');
    const handleAccept = async (StdRepID, post_id) =>
     {
        try
         {
          
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/markaccept/${encodeURIComponent(StdRepID)}/${encodeURIComponent(post_id)}`;
          alert("this post has been accepted");
          // Make a GET request to the constructed URL
              const response = await fetch(url); 
              const result = await response.json();
              // Handle the login result as needed
              console.log(result);
              
            } 
            catch (error) {
              console.error('Error during login:', error);
            }
            console.log("accept clicked");
      };
    

     

    const handleReject = async (StdRepID, post_id) =>
       {
          try
           {
            
            // Construct the URL with actual values for email and password
            const url = `http://localhost:8080/api/markreject/${encodeURIComponent(StdRepID)}/${encodeURIComponent(post_id)}`;
            alert("this post has been rejected");
            // Make a GET request to the constructed URL
                const response = await fetch(url); 
                const result = await response.json();
                // Handle the login result as needed
                console.log(result);
                
              } 
              catch (error) {
                console.error('Error during login:', error);
              }
              console.log("reject clicked");
        };


     return(
        <div className="PostRect">
            <div className="CourseRect">
              <div>
               <h3 className="CourseText">
                {props.course}
               </h3>
               </div>
            <div>
            <div className="PostDateRect">
              <h4 className="Date">
                {props.post_date}
              </h4>
            </div>
            <div>
            <button className="Acceptbutton" onClick={() => handleAccept(props.studentData.std_id,props.id)}> <h5 className="AcceptButtontext">Accept</h5></button>
            </div>  
            <div>
            <button className="Rejectbutton" onClick={() => handleReject(props.studentData.std_id,props.id)}> <h5 className="RejectButtontext">Reject</h5></button>
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
        const listItems = props.postArray.map ( (post) =>{return (<li><Post  post_date={post.post_date} content={post.content} course={post.course_name} id={post.pst} studentData={props.studentData} /></li>)});
        console.log(listItems);
        return listItems;
    }
    else
    {
        return " ";
    }

}


function PostRequests(props) 
{  
  const [PostsData, setPostsData]=useState([{post_date:"",content:"", course:"", id:""}]);
    
    useEffect(()=>
    {
        const setPosts= async () =>
        {
            const data = await getPosts(props.studentData.major_id,props.studentData.class,'','','','');
            console.log(data);
            setPostsData(data);
        }

        setPosts();

    },[]);
 

  return (
     <div>
        <ul>
        <DisplayPosts postArray={PostsData} studentData={props.studentData}/>
        </ul>
        
     </div>
  );
}


export default PostRequests;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




