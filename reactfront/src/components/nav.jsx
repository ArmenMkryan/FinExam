import React from "react"
import { Link } from "react-router-dom"


export const Navi = () => {
const navi = {
    textDecoration:'none',
    fontSize: '20px',
    padding: '20px',
    
  }

return (
    <div>  
        <Link style={navi} to='/'>Home </Link>
        <Link style={navi} to='register'>Register</Link>
   </div>

   )
}