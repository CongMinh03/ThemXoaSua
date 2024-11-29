"use client";
import { handleLogin } from '../action'

export default function Form() {
  return (
    <form action={async(formData)=>{
        const response = await handleLogin(formData);
    }}>
    <div className='mb-3'>
        <label > Email</label>
        <input type="Email" 
        name='email'
        className='form-control'
        placeholder='Email'
        required />
      
    </div>
    <div className='mb-3'>
        <label >Password</label>
        <input type="password" 
        name='password'
        className='form-control'
        placeholder='Password' 
        required/>
    </div>
    <div className='d-grid'>
     <button className='btn btn-primary '>Login</button>
   </div> 
          </form>
  )
}
