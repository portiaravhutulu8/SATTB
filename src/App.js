import './App.css';
import Navbar from './Components/Navbar';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 
'react-router-dom';
import Home from './Pages/index';
import Tournaments from './Pages/Tournaments';
 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/tournaments" exact element={<Tournaments />} />
      </Routes>
    </Router>
    
  );
}

export default App;
