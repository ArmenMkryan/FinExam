
import React from 'react';
import './App.css';
import {Register} from './Views/Register';
import {Home} from './Views/Home';
import { Routes, Route} from 'react-router-dom';
import { Navi } from './components/nav';


function App() {
  
  
  
  return (
    <div className="App">
   <Navi/ >
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/register" element={<Register />} />
     </Routes>
    </div>
  );
}

export default App;
