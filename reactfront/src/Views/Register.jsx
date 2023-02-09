import React from 'react';
import "./form.css";
import { useState } from 'react';
import axios from 'axios';
import './login.css'

export const Register = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [errors, setErrors] = useState({});
 const [isLoading, setIsLoading] = useState(false);

 const validateForm = () => {
  let newErrors = {};
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }
  if (!password) {
    newErrors.password = 'Password is required';
  } else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }
  if (!confirmPassword) {
    newErrors.confirmPassword = 'Confirm password is required';
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
const handleSubmit = (event) => {
  event.preventDefault();
  if (validateForm()) {
      setIsLoading(true);
      const data = {
        email,
        password
      };
      axios
        .post('https://mylaravelapi.com/register', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
  console.log(email, password, confirmPassword)
};

    return (
        <div>
          <h2>Register</h2>
          

               
          <div class="signup">
f
                <input className='form'  type="email" value={email} placeholder="E-Mail" onChange={(e)=>setEmail(e.target.value)}/>
                {errors.email && <div>{errors.email}</div>}
               <p></p>
                <input className='form' value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                {errors.password && <div>{errors.password}</div>}
                <p></p>
                <input className='form' value={confirmPassword} type="password" placeholder="Confirm password"  onChange={(e)=>setConfirmPassword(e.target.value)}/>
                {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
                <p></p>
                <input  className='button'  type="submit" onClick={handleSubmit} disabled={isLoading}/>
                </div>

        </div>
    );
  }
<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required=""/>
					<input type="email" name="email" placeholder="Email" required=""/>
					<input type="password" name="pswd" placeholder="Password" required=""/>
					<button>Sign up</button>
				</form>
			</div>