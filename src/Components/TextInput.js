import React, { useState } from 'react';
import './TextInput.css';


const TextInput = ({ Title ,placeholderText, isPassword , setInputValue , inputValue}) => {

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

 

  return (
    <div>
      <div>
        <h4 className="SubTitle">
           {Title}
        </h4>
      </div>
      <input
        type={isPassword ? 'password' : 'text'}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholderText}
        className='TextBox'
      />
    </div>
  );
};

export default TextInput;
