// App.js
import React from "react";
import "./reset.css"; // Import the CSS file
import "./style.css"; // Import the CSS file

function App() {
  return (
    <div className="background">
      <div className="container">

        <div className="box location">
          <div className="weatherimage">
            <img src="/locationimage.png" alt="Background" />
          </div>
          <div className="locationtext">
            <h1>Current Location</h1>
          </div>
        </div>

        <div className="box weather">
          <div className="currentweather">
            <h1>19°</h1>
          </div>
          <div className="weathericon">
            <img src="/currentweather.png" alt="Current Weather"/>
          </div>
          <div className="windspeed">
            <h1>Wind Speed: 6 mph</h1>
          </div>
          <div className="feelslike">
            <h1>Feels like 19°</h1>
          </div>
        </div>

        <div className="box temperature">
          
        </div>

      </div>
    </div>
  );
}

export default App;