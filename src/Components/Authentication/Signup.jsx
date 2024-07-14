import React, { useState } from 'react'
import './Auth.css'
import { useNavigate } from 'react-router'
const Signup = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
   const navigate=useNavigate();
   const [error,seterror]=useState('')

   const handlesignup=async()=>{
    fetch(`http://localhost:3008/signup`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email:email,
            password:password
        })
      })
        .then((response) => {
          console.log(response);
          if(response.status===201){
            seterror('User already exists...')
          }
          if(response.status===200){
              navigate('/')
          }
     
        })
        .catch((error) => {
          console.log(error);
        });
   }

  return <>
  
  <div className='auth-container'>
   <div className='auth-head'>Sign Up</div>
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
    handlesignup()
   }}
   >Signup</button>
   <div className='orloginstatment'>or already have an account ? <span className='orlogin'
   onClick={()=>{
    navigate('/')
   }}
   >Login</span></div>
  </div>
  
  </>
}

export default Signup
