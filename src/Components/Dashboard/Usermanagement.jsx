import React, { useEffect,useState } from 'react'

import { useSelector,useDispatch } from 'react-redux';
import { setallusers } from '../Redux/Reduxstore';

import Popup from '../Popup';
const Usermanagement = () => {
    const dispatch=useDispatch()
    const allusers=useSelector(state=>state.user.allusers);
    const [showPopup, setShowPopup] = useState(false);
    const [particularuser,setparticularuser]=useState();

    const togglePopup = () => {
        setShowPopup(!showPopup);
      };


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
            console.log(allusers);
            
            }
          catch (error) {
            console.log(error);
          }
    }

    const handleremoveuser=(id)=>{
        fetch(`http://localhost:3008/removeuser`, {
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
              handlegetallusers()
            })
            .catch((error) => {
              console.log(error);
            });
    }
    useEffect(()=>{
      handlegetallusers();
    },[])
 
  return <>
   <Popup show={showPopup} onClose={togglePopup} data={particularuser} />
   <div className='profile-box'>
    <div className='usershead'>USER MANAGEMENT</div>
   <table>
        <tr>
            <th>S No.</th>
            <th>User Email</th>
            <th>Role</th>
            <th>Features Assigned</th>
            <th>Action</th>
        </tr>
        {allusers && allusers.map((user,index)=>{
            return <>
                    <tr>
            <td>{index+1}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            {(user.features).map((feature,index)=>{
                return <>
                <div>
                {index+1}. {feature}
                </div>
                            
                </>
            })}
            </td>
            <td>
                <button className='remove'
                 onClick={()=>{
                    handleremoveuser(user._id)
                 }}
                >Remove</button>
                <button className='update'
                onClick={()=>{
                    togglePopup();
                    setparticularuser(user)
                }}

                >Update</button>
                </td>
        </tr>
            </>
        })}
    </table>
   </div>
  
  </>
}

export default Usermanagement
