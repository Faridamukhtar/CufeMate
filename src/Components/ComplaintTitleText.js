import React, { useState } from 'react';
import './ComplaintTitleText.css'

const ComplaintTitleText = ({placeholderText, setInputValue , inputValue}) => 
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
          className='ComplaintTitle'
        />
      </div>
    );

};


export default ComplaintTitleText;