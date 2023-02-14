import React, { useState, useRef } from "react";
import "../login.css";
import { Link } from "react-router-dom";
import {axiosClient} from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";


export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(null)

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const{setUser, setToken} = useStateContext()

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirm: passwordConfirmRef.current.value,

    }
    axiosClient.post('/register', payload)
    .then(({data}) => {
    setUser(data.user)
    setToken(data.token)
    })
    .catch(err =>{
    
      const response = err.response;
      if(response && response.status === 422){
        setErrors(response.data.errors)
      }
    })
console.log(payload)
    console.log("username:", username  );
    console.log("email:", email);
    console.log("Password:", password);
    console.log("Password confirm:", passwordConfirm);
  };

  return (
    <div className="Login">
      <h1>Register</h1>
      {errors && <div className="alert" >
        {Object.keys(errors).map(key=>(
        <p key={key}>{errors[key][0]}</p>))}</div>}
      <form onSubmit={handleSubmit}>
        <div className="Login-field">
          <label htmlFor="username">Full Name:</label>
          <input
          ref={nameRef}
            type="text"
            id="username "
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="Login-field">
          <label htmlFor="Email">E-mail Address:</label>
          <input
          ref={emailRef}
            type="text"
            id="email "
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="Login-field">
          <label htmlFor="password">Password:</label>
          <input
          ref={passwordRef}
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="Login-field">
          <label htmlFor="password">Password Confirmation:</label>
          <input
          ref={passwordConfirmRef}
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>
        <p>
          Login <Link to="/login">here</Link> 
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register

  
   