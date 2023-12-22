import React, { useState } from 'react';
import './PostInputText.css'

const PostInputText = ({placeholderText, setInputValue , inputValue}) => 
{

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
   
  
    return (
      <div>
        <input
          type={'text'}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholderText}
          className='PostContent'
        />
      </div>
    );

};

export default PostInputText;