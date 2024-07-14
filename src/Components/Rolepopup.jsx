// src/Popup.js
import React, { useEffect, useState } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { setroles } from './Redux/Reduxstore';

const Rolepopup = ({ show, onClose,data }) => {
const dispatch=useDispatch();
const roles=useSelector(state=>state.user.roles);
const [role,setrole]=useState(null);
const [name,setname]=useState('');
const [selectedValues, setSelectedValues] = useState([]);
  
const radioValues = ['User Management', 'Role Management', 'My Profile', 'Settings', 'Request Access', 'Manage Tasks', 'Completed Tasks'];

const handleRadioChange = (e) => {
  const value = e.target.value;
  setSelectedValues((prevValues) => [...prevValues, value]);

  console.log(selectedValues);
};

const fetchallroles=async()=>{
    try {
        const response=await fetch(`http://localhost:3008/getallroles`, {
          method: "Get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        })
        const data=await response.json();
        dispatch(setroles(data));
        console.log(data);
        }
      catch (error) {
        console.log(error);
      }
}

    const handlerolecreation=()=>{
        fetch(`http://localhost:3008/createroles`, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name:name,
               features:selectedValues
            })
          })
            .then((response) => {
              console.log(response);
              fetchallroles()
            })
            .catch((error) => {
              console.log(error);
            });
    }
    

useEffect(()=>{

},[])
if (!show) {
    return null;
  }
  return (
    <div className="popup-container">
      <div className="popup2">
        <h2>New Role</h2>
        <div style={{color:'#16AEE8'}}>Role Name</div>
        <input type="text" 
        placeholder='New role name'
        value={name}
        onChange={(ev)=>{
            setname(ev.target.value);
        }}
        onClickCapture={(ev)=>{
            setname(ev.target.value);
        }}
        />
        <div style={{color:'#16AEE8'}}>Features To Assign</div>
        {radioValues.map((value, index) => (
        <div key={index} >
          <input
            type="radio"
            id={`radio-${index}`}
            // name="radioGroup"
            value={value}
            onChange={handleRadioChange}
          />
          <label htmlFor={`radio-${index}`}>{value}</label>
        </div>
      ))}
        

        <div className='savebtn'
        onClick={()=>{
            handlerolecreation();
            onClose()
        }}
        >Save</div>
        
        <button onClick={onClose} className='closebtn' >Close</button>
      </div>
    </div>
  );
};

export default Rolepopup;
