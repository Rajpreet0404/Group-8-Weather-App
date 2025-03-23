import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/navbar";
import Settings from "./pages/settings";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<h1>Home Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
