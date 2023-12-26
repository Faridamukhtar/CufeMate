import React,{useState} from "react";
import './WriteTextPost.css';
import PostInputText from "./PostInputText.js";


function WriteTextPostMajor({selectedCourse}, props)

{    
    
    const [Conttent, setContent] = useState('');

    const handleSubmit = async (Conttent, major_id, std_id) =>
     {
        try {
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/writepostmajor/${encodeURIComponent(Conttent)}/${encodeURIComponent(major_id)}/${encodeURIComponent(std_id)}`;
      
          // Make a GET request to the constructed URL
              const response = await fetch(url); 
              const result = await response.json();
              // Handle the login result as needed
              console.log(result);
              alert("Posted successfully. Refresh to see it below");
            } 
            catch (error) {
              console.error('Error during login:', error);
            }
            console.log("submit clicked");
      };


    return (
  <div>
     <div className ="SectionTitle">
              <h3>
                Write your post or material link here
              </h3>       
     </div>

     <div className = "PostBox">
            <div>   
                <PostInputText placeholderText=" Add content" setInputValue={setContent} inputValue={Conttent} />
            </div>    
            <hr className= "LowerLine"/>
            <div className="CharacterCount">
                <p > {Conttent.length} : 2000  </p>
            </div>
            <button className="PostSubmitButton" onClick={() =>{if (Conttent.length>0) { handleSubmit(Conttent, props.studentData.major_id, props.studentData.std_id)}else {alert("No post was written")}}}> <h5 className="PostSubmitText">Submit</h5></button>
        
           </div>        
       </div>
    );
    //handleSubmit(Conttent, selectedCourse)}}}
}

export default WriteTextPostMajor ;
