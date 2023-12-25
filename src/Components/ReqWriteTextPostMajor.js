import React,{useState} from "react";
import './ReqWriteTextPost.css';
import PostInputText from "./PostInputText.js";


function ReqWriteTextPostMajor({selectedCourse})

{    
    
    const [Conttent, setContent] = useState('');

    const handleSubmit = async (Conttent, selectedCourse) =>
     {
        try {
          // Construct the URL with actual values for email and password
          const url = `http://localhost:8080/api/reqwritepostmajor/${encodeURIComponent(Conttent)}/${encodeURIComponent(selectedCourse)}`;
      
          // Make a GET request to the constructed URL
              const response = await fetch(url); 
              const result = await response.json();
              // Handle the login result as needed
              console.log(result);
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
            <button className="PostSubmitButton" onClick={() => handleSubmit(Conttent, selectedCourse)}> <h5 className="PostSubmitText">Submit</h5></button>
        
           </div>        
       </div>
    );
}

export default ReqWriteTextPostMajor ;
