import "./App.css";
import { SideBar } from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Rankings from "./pages/Rankings";
import ViewLiveGames from "./pages/ViewLiveGames";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Tournaments" element={<Tournaments />} />
        <Route path="/Rankings" element={<Rankings />} />
        <Route path="/ViewLiveGames" element={<ViewLiveGames />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
