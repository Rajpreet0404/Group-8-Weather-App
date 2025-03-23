import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings";
import Home from "./pages/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;