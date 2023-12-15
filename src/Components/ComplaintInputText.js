import React, { useState } from 'react';
import './ComplaintInputText.css'

const ComplaintInputText = ({placeholderText, setInputValue , inputValue}) => 
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
          className='ComplaintContent'
        />
      </div>
    );

};

export default ComplaintInputText;