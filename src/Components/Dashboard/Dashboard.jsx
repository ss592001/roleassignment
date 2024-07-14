import React, { useEffect, useState } from 'react'

import './Dashboard.css'
import { useSelector,useDispatch } from 'react-redux'

import { setisLoggedin,setUserdata,setallusers } from '../Redux/Reduxstore';
import { useNavigate } from 'react-router';
import Profile from './Profile';
import Usermanagement from './Usermanagement';
import Rolemanagement from './Rolemanagement';

const Dashboard = () => {

    const [active,setactive]=useState('profile-management');
    const users=useSelector(state=>state.user.userdata);
    const isLoggedin=useSelector(state=>state.user.isLogedin);
    const navigate=useNavigate();
    const dispatch=useDispatch()




    useEffect(()=>{
        console.log(users);
        console.log(isLoggedin);
    },[])

    const handlelogout=()=>{
       setUserdata(null);
       setisLoggedin(false);
       navigate('/');
    }

  return <>
  <div className='sidebar'>
    <div className='navbar-items-box'>
        {users && users.auth.features.map((service,index)=>{
            return <>
            {service==='User Management' && <>        
                <div className='sidebar-items'
    onClick={()=>{
        setactive('user-management')
    }}
    onClickCapture={()=>{
        setactive('user-management')
    }}
    style={active==='user-management'?{color:"#03202c"}:{}}
    >User Management</div>
            </>}
        {
            service==='Role Management'&& <>
   <div className='sidebar-items'
    onClick={()=>{
        setactive('role-management')
    }}
    onClickCapture={()=>{
        setactive('role-management')
    }}
    style={active==='role-management'?{color:"#03202c"}:{}}
    >Role Management</div>
            </>
        }
    {
        service==='My Profile' && <>
                <div className='sidebar-items'
    onClick={()=>{
        setactive('profile-management')
    }}
    onClickCapture={()=>{
        setactive('profile-management')
    }}
    style={active==='profile-management'?{color:"#03202c"}:{}}
    >My Profile</div>
        </>
    }

    {
        service==='Settings' && <>
                 <div className='sidebar-items'
    onClick={()=>{
        setactive('settings-management')
    }}
    onClickCapture={()=>{
        setactive('settings-management')
    }}
    style={active==='settings-management'?{color:"#03202c"}:{}}
    >Settings</div>
        </>
    }

    {
        service==='Request Access' && <>
                <div className='sidebar-items'
    onClick={()=>{
        setactive('access-management')
    }}
    onClickCapture={()=>{
        setactive('access-management')
    }}
    style={active==='access-management'?{color:"#03202c"}:{}}
    >Request Access</div>
        </>
    }

    {
        service==='Manage Tasks' && <>
                 <div className='sidebar-items'
    onClick={()=>{
        setactive('task-management')
    }}
    onClickCapture={()=>{
        setactive('task-management')
    }}
    style={active==='task-management'?{color:"#03202c"}:{}}
    >Manage Tasks</div>
        </>

    }

    {

        service==='Completed Tasks' && <>
                <div className='sidebar-items'
    onClick={()=>{
        setactive('completed-tasks-management')
    }}
    onClickCapture={()=>{
        setactive('completed-tasks-management')
    }}
    style={active==='completed-tasks-management'?{color:"#03202c"}:{}}
    >Completed Tasks</div>
        </>
    }
            
            </>
        })}

            <div className='sidebar-items logout' 
            onClick={()=>{
                handlelogout();
            }} 
            >
        Logout</div>
  </div>
  </div>
  <div className='home-topbar'>
    <div className='profile-identifier'>
        <div className='profile-icon'>{((users.auth.role).substr(0,1)).toUpperCase()}</div>
        <div className='profile-name'>
        {(users.auth.role).toUpperCase()}
        </div>
    </div>
  </div>

  <div className='home-content'>
  {active==='profile-management' && <>
    <Profile/>
  </>}
  {active==='user-management' && <>
    <Usermanagement/>
  </>}
  {active==='role-management' && <>
    <Rolemanagement/>
  </>}

  </div>

  <div className='home-footer'>

  </div>
  
  </>
}

export default Dashboard
