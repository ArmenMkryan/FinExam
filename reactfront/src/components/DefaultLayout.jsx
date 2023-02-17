import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Tasks } from "../Views/tasks";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

export const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  const onLogout = (event) => {
    event.preventDefault();
    axiosClient.post("/logout").then(() => {
        setUser({});
        setToken(null);
      });
    
  };

//   useEffect(() => {
//     axiosClient.get('/user')
//     .then(({data}) => {
//         setUser(data)
//     });
//   })

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/tasks">Users</Link>
        <Link to="/tasks">Tasks</Link>
      </aside>
      <div className="content">
        <header>
          <div>header</div>
          <div>
            {user.username}
            <a className="btn-logout" href="#" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
