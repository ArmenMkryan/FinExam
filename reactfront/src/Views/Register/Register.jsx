import React, { useState } from "react";
import "../login.css";
import { Link } from "react-router-dom";

export const Register = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("full name:", fullname);
    console.log("Password:", password);
    console.log("Password confirm:", passwordConfirm);
  };

  return (
    <div className="Login">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="Login-field">
          <label htmlFor="username">Full Name:</label>
          <input
            type="text"
            id="name "
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
        </div>
        <div className="Login-field">
          <label htmlFor="username">Password:</label>
          <input
            type="text"
            id="username"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="Login-field">
          <label htmlFor="password">Password Confirmation:</label>
          <input
            type="password"
            id="password"
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

  
   