import React, { useState } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';

function Body(props)
{
    const [inputValue, setInputValue] = useState('')
 
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

        return (

            <div className="Wrapper">
            <div className="Title">
                <h3>
                    Apply to be rep
                </h3>
            </div>

        
            {/*Border line*/}
            <hr className="BorderLine"/>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Note'
                className='AboutText'
            />


            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minheight: '15%' ,width:'95%' }}>
           
            <p className='charmsg'> {inputValue.length} : 2000 Characters </p>
            <button
            className='button-clicked'
             >
            <span className='label-clicked'> Submit Application</span>
            </button>
            </div>
      </div>
        );
    
}

function RepReqForm(props)
{
    return (
        <div className="SettingsWrapper">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType='ApplyRepForm'/>
            </div>
            <div className="DashboardBody">
               <Body DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default RepReqForm;