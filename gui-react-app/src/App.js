// App.js
import React from "react";
import "./style.css"; // Import the CSS file

function App() {
  return (
    <div className="container">
      <div className="box location">
        <div className="weatherimage">
          <img src="/locationimage.png" alt="Background" width="300" />
        </div>
        <div className="locationtext">
          <h1>Current Location</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
