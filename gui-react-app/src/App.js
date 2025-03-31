import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings";
import Home from "./pages/home"
import Sidebar from "./components/sidebar";
import GraphMain from "./pages/graph";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<GraphMain />} />
      </Routes>
    </Router>
  );
}

export default App;