// App.js
import React from "react";
import "./reset.css"; // Import the CSS file
import "./style.css"; // Import the CSS file

function App() {
  return (
    <section className="app">
      {/* Location flex box */}
      <section className="locationBox">
        <div className="weatherimage">
          <img src="/locationimage.png" alt="Background" />
        </div>
        <div className="locationtext">
          <h1>Current Location</h1>
        </div>
      </section>
      {/* Weather flex box */}
      <section className="weatherBox">
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
      </section> 

      

      <div className="tempBox">
        
      </div>
    </section>
  );
}

export default App;