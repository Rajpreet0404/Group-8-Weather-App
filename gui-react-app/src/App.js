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
      {/* Temperature overview */}
      <section className="tempBox">
        <div className="miniTemp">
          <h1>13:00</h1>
          <img src="/image5.png" alt="Sunny"/>
          <h1>21°</h1>
        </div>
        <div className="miniTemp">
          <h1>14:00</h1>
          <img src="/image4.png" alt="Sunny"/>
          <h1>15°</h1>
        </div>
        <div className="miniTemp">
          <h1>15:00</h1>
          <img src="/image9.png" alt="Sunny"/>
          <h1>13°</h1>
        </div>
        <div className="miniTemp">
          <h1>16:00</h1>
          <img src="/image7.png" alt="Sunny"/>
          <h1>11°</h1>
        </div>
        <div className="miniTemp">
          <h1>17:00</h1>
          <img src="/image15.png" alt="Sunny"/>
          <h1>7°</h1>
        </div>
        <div className="miniTemp">
          <h1></h1>
          <button>...</button>
          <h1></h1>
        </div>
      </section>
    </section>
  );
}

export default App;