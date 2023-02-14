import React, { useState } from 'react';
import axios from 'axios';
const App = () => {
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
        .post('https://laravel.api/register', data)
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
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};
export default App;



import React from 'react';

import { useState } from 'react';
import axios from 'axios';


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
        <div className='reg'>
          <h2>Register</h2>
          

               
          <div className="form">

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
<div class="form">
				<form>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required=""/>
					<input type="email" name="email" placeholder="Email" required=""/>
					<input type="password" name="pswd" placeholder="Password" required=""/>
					<button>Sign up</button>
				</form>
			</div>







// import { axios } from "axios";

// export const axiosClient = axios.create({
// baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
// })

// axiosClient.interceptors.request.use((config) => {
//    const token = localStorage.getItem('ACCESS_TOKEN')
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })

// axiosClient.interceptors.response.use((response) => {
//    return response
// }), (error) => {
//     const {response} = error
// if(response.status === 401){
//     localStorage.removeItem('ACCESS_TOKEN')
// }
// throw error
// }



// export default axiosClient







// <?php
// namespace App\Http\Controllers\Api;

// use App\Models\User;
// use Illuminate\Http\Request;
// use App\Http\Requests\LoginRequest;
// use App\Http\Controllers\Controller;
// use App\Http\Requests\RegisterRequest;
// use Illuminate\Support\Facades\Auth;


// class AuthController extends Controller
// {


//     public function register (RegisterRequest $request) {
//         $data = $request->validated();
//         /** @var \App\Models\User $user */
//         $user = User::Create([
//             'username' => $data['username'],
//             'email' => $data['email'],
//             'password' => bcrypt($data['password']),
//         ]);

//         $token = $user->createToken('main')->plainTextToken;
//         return response(compact('user', 'token'));
//        }

//     public function login (LoginRequest $request) {
// $cred = $request -> validated();
// if(!Auth::attempt($cred)){
//     return response()->json([
//         "message" => 'Email or password is incorrect'
//     ], 401);
// }
// /** @var User $user */
// $user = Auth::user();
// $token = $user->createToken('main')->plainTextToken;

// return response(compact('user', 'token'));
//    }



//    public function logout (Request $request) {
// $user = $request->user();
// $user -> currentAccessToken()->delete();
// return response("", 204);
//    }
// }
