import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;