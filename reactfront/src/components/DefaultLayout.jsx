import { Navigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { Users } from "../Views/users"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import '../index.css'
import { useState, useEffect } from 'react';
import axiosClient from "../axiosClient"

export const DefaultLayout = () => {

const {user, token, setUser} = useStateContext()
    if(!token){
        return  <Navigate to="/login"/>
    }

    const onLogout = (event) => {
        event.preventDefault()
    }
    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
            setUser(data)
          })
      }, [])
return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashbord">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        header
                    </div>
                    <div>
                       {user.name}
                       <a className="btn-logout"href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
           
            <main>
          <Outlet/>
          </main>
        </div>
        </div>
    )
}