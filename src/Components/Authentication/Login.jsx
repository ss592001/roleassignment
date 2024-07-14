import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router'

import { setUserdata ,setisLoggedin} from '../Redux/Reduxstore'
import { useDispatch,useSelector } from 'react-redux'

const Login = () => {
  const dispatch=useDispatch();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
   const navigate=useNavigate();
   const [error,seterror]=useState('');

   const handlelogin=async()=>{
    try {
      const response=await fetch(`http://localhost:3008/login/${email}/${password}`, {
        method: "Get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      })
      const data=await response.json();
      if(data.auth===false){
        console.log(data);
        console.log(response)
       return  seterror('No user found....')
      }

      if(response.status===200 ){
        dispatch(setUserdata(data));
        dispatch(setisLoggedin(true));
        navigate('/dashboard');
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }

      
   }

  return <>
  
  <div className='auth-container'>
   <div className='auth-head'>Login</div>
   <div>
   <input type="text" className='auth-input-email' placeholder='Email' 
   value={email}
   onChange={(ev)=>{
    setemail(ev.target.value)
   }}
   onChangeCapture={(ev)=>{
    setemail(ev.target.value)
   }}
   />
   </div>
   <div>
   <input type="password" className='auth-input-password' placeholder='Password' 
      value={password}
      onChange={(ev)=>{
       setpassword(ev.target.value)
      }}
      onChangeCapture={(ev)=>{
       setpassword(ev.target.value)
      }}
   />
   </div>
   <button className='auth-submit-button'
   onClick={()=>{
    handlelogin()
   }}
   >Login</button>
   <div className='orloginstatment'>or don't have an account ? <span className='orlogin'
   onClick={()=>{
    navigate('/signup')
   }}
   >Signup</span></div>
  </div>
  
  </>
}

export default Login
