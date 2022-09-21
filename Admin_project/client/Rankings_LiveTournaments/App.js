import './App.css';
import Navbar from './Components/Navbar';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 
'react-router-dom';
import Home from './Pages/index';
import Tournaments from './Pages/Tournaments';
import LiveTournaments from './Pages/LiveTournaments';
import Rankings from './Pages/Rankings'; 
import Settings from './Pages/Settings'; 

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/tournaments" exact element={<Tournaments />} />
          <Route path="/livetournaments" exact element={<LiveTournaments />} />
          <Route path="/rankings" exact element={<Rankings />} />
          <Route path="/settings" exact element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
