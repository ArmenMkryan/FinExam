import React, { useState, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {axiosClient} from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const{setUser, setToken} = useStateContext()

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null)
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors){
            setErrors(response.data.errors);
          } else
          setErrors({
            email:[response.data.message],
          });
        }
      });
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="Login">
      <h1>Login</h1>

      {errors && <div className="alert" >
        {Object.keys(errors).map(key=>(
        <p key={key}>{errors[key][0]}</p>))}</div>}

      <form onSubmit={handleSubmit}>
        <div className="Login-field">
          <label htmlFor="email">E-mail Address:</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
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
        <p>
          Registeration <Link to="/register">here</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
