import React from 'react'; 


export const Register = () => {
   const form = {
    email: '',
    password: '',
    passconf:''
   }
   
    return (
        <div>

               
                <p>{form.email}</p>
                <input className='form'  type="email" placeholder="E-Mail" value='email'/>
                <p>{form.password}</p>
                <input className='form'  type="password" placeholder="Password" value='password'/>
                <p>{form.passconf}</p>
                <input className='form'  type="password" placeholder="Confirm password" value='passconf'/>
                <p>{}</p>
                <input className='form'  type="submit" />
      </div>
    )
  }