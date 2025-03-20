// App.js
import React from "react";
import "./reset.css"
import "./style.css"; // Import the CSS file

function App() {
  return (
    <div className="container">

      <header className="box sidebar">
        <div className="sidebarimage">
          <img src="/sidebaricon.png" alt="sidebar" />
        </div>
      </header>

      <header className="box title">
        <div className="settingstext">
          <h1>Settings</h1>
        </div>         
      </header>
      
    </div>
  );
}

export default App;