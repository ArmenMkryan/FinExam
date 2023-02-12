
import React from 'react';
import './App.css';
import {Register} from './Views/Register/Register';
import {Home} from './Views/Home';
import { Routes, Route } from 'react-router-dom';
import { Navi } from './components/nav';
import { Users } from './Views/users';
import Login from './Views/login';


function App() {
  
  
  
  return (
    <div className="App">
   <Navi/ >
     <Login/>
    </div>  
  );
}

export default App;
