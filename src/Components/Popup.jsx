// src/Popup.js
import React, { useEffect, useState } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { setroles,setallusers } from './Redux/Reduxstore';

const Popup = ({ show, onClose,data }) => {
const dispatch=useDispatch();
const roles=useSelector(state=>state.user.roles);
const [role,setrole]=useState();


const handleSelectChange = (e) => {
    console.log(e.target.value)
  setrole(e.target.value);
};
// const [features,setfeatures]=useState([]);


    const fetchallroles=async()=>{
        try {
            const response=await fetch(`http://localhost:3008/getallroles`, {
              method: "Get",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              }
            })
            const rolesdata=await response.json();
            dispatch(setroles(rolesdata));
            console.log(rolesdata);
            }
          catch (error) {
            console.log(error);
          }
    }

    const handlegetallusers=async()=>{
        try {
            const response=await fetch(`http://localhost:3008/getusers`, {
              method: "Get",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              }
            })
            const data=await response.json();
            dispatch(setallusers(data));
            
            }
          catch (error) {
            console.log(error);
          }
    }

    const handleupdateuser=()=>{
        fetch(`http://localhost:3008/updaterole`, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id:data._id,
               role:role
            })
          })
            .then((response) => {
              console.log(response);
              handlegetallusers()
              onClose();
            })
            .catch((error) => {
              console.log(error);
            });
    }
    

useEffect(()=>{
    fetchallroles()
},[])
if (!show) {
    return null;
  }
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Update User</h2>
        <div>Current Role</div>
        <input type="text" placeholder={data.role} disabled/>
        <div>New Role</div>
        <select value={role} onChange={handleSelectChange} onChangeCapture={handleSelectChange}>
            <option value="">Select new role to assign</option>
         {roles && roles.map((r,index)=>{
            return <option 
            value={r._id}
            >
             {r.name}

            </option>
         })}
        </select>
        <div className='savebtn'
        onClick={()=>{
            handleupdateuser();
        }}
        >Save</div>
        
        <button onClick={onClose} >Close</button>
      </div>
    </div>
  );
};

export default Popup;
