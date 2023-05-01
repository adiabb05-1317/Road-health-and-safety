import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import './UserSignup.css'
export default function UserSignup() {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:8000/signup',{username,password});
            console.log(res.data)

        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="signup-box">
           <form className="signup-form" onSubmit={handleSubmit}>
                 <input className="signup-user" type="text"placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                <input className="btn-login" type="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="btn-signup" type="submit">Signup</button>
                

           </form>
    </div>
  )
}
