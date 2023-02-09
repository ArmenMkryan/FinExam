
import React from 'react';
import './App.css';
import {Register} from './Views/Register';
import {Home} from './Views/Home';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  
  const navi = {
    textDecoration:'none',
    fontSize: '20px',
    padding: '20px',
    
  }
  
  return (
    <div className="App">
   <Link style={navi} to='/'>Home </Link>
   <Link style={navi} to='/register'>Register</Link>
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/register" element={<Register />} />
     </Routes>
    </div>
  );
}

export default App;
