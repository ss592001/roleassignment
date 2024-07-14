import React, { useEffect } from 'react'
import './Dashboard.css'
import Rolepopup from '../Rolepopup'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setroles } from '../Redux/Reduxstore';

const Rolemanagement = () => {
    const [showPopup, setShowPopup] = useState(false);
    const dispatch=useDispatch();
const roles=useSelector(state=>state.user.roles);

    const togglePopup = () => {
        setShowPopup(!showPopup);
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

    const handledeleterole=(id)=>{
        fetch(`http://localhost:3008/removerole`, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            id:id
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
        fetchallroles()
    },[])


  return <>
  <Rolepopup show={showPopup} onClose={togglePopup}/>
   <div className='profile-box'>
    <div className='usershead'>ROLE MANAGEMENT
    <button className='newrolebt'
    onClick={()=>{
        setShowPopup(!showPopup)
    }}
    >New Role</button>
    </div>
    <div className='roletable'>     
    <table>
        <tr>
            <th>S No.</th>
            <th>Role</th>
            <th>Features</th>
            <th>Action</th>
        </tr>
        {roles && roles.map((role,index)=>{
            return <>
                   <tr>
                    <td>{index+1}.</td>
            <td>{role.name}</td>
            <td>
                {role.features && role.features.map((feature,index)=>{
                    return <>
                    <div>
                     {index+1}.
                    {feature}
                    </div>
                    </>
                })}
            </td>
            <td>
                <div className='remove'
                onClick={()=>{
                    handledeleterole(role._id)
                }}
                >Remove</div>
            </td>
        </tr>
            </>
        })}    
    </table>
    </div>

    
   </div>
  </>
}

export default Rolemanagement
