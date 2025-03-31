import React, { useState } from "react";
import "./reset.css";
import "./style.css"; // Import the CSS file
import { Switch, Select, MenuItem, TextField } from "@mui/material";

function App() {
  const initialState = {
    darkMode: false,
    dynamicBackground: false,
    fontSize: "Small",
    temperatureUnit: false,
    currentLocation: "A",
    updateFrequency: "1 Hour",
    weatherAlerts: false,
    notifyTraining: false,
    dailyForecast: "Morning",
  };

  const [settings, setSettings] = useState(initialState);
  const [location, setLocation] = useState(""); // User-entered location

  const handleToggle = (settingKey) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [settingKey]: !prev[settingKey] };
  
      if (settingKey === "darkMode") { // if dark mode switched on, adds "dark-mode" tag to body
        if (newSettings.darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
      }

      if (settingKey === "dynamicBackground") { // if dynamic background switched on, adds "dynamic-background" tag to body
        if (newSettings.dynamicBackground) {
          document.body.classList.add("dynamic-background");
        }
        else {
          document.body.classList.remove("dynamic-background");
        }
      }
  
      return newSettings;
    });
  };

  const handleSelectChange = (event, settingKey) => {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: event.target.value,
    }));
  };

  return (
    <div className="container">
      <nav className="box sidebar">
        <div className="sidebarimage">
          <img src="/sidebaricon.png" alt="sidebar" />
        </div>
      </nav>

      <header className="box title">
        <div className="settingstext">
          <h1>Settings</h1>
        </div>
      </header>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Appearance</h1>
        </div>
        <article className="settings">
          <h1>Dark Mode</h1>
          <Switch checked={settings.darkMode} onChange={() => handleToggle("darkMode")} />
        </article>
        <article className="settings">
          <h1>Dynamic Background</h1>
          <Switch checked={settings.dynamicBackground} onChange={() => handleToggle("dynamicBackground")} />
        </article>
        <article className="settings">
          <h1>Font Size</h1>
          <Select value={settings.fontSize} onChange={(e) => handleSelectChange(e, "fontSize")}
            variant="standard" disableUnderline>
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </article>
        <article className="settings">
          <h1>Temperature Unit</h1>
          <Switch checked={settings.temperatureUnit} onChange={() => handleToggle("temperatureUnit")} />
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Location Settings</h1>
        </div>
        <article className="settings">
          <h1>Current Location</h1>
          <Select value={settings.currentLocation} onChange={(e) => handleSelectChange(e, "currentLocation")}
            variant="standard" disableUnderline>
            <MenuItem value="A">Auto</MenuItem>
            <MenuItem value="M">Manual</MenuItem>
          </Select>
        </article>
        <article className="settings">
          <h1>Set Location</h1>
          <TextField 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            variant="standard" 
            InputProps={{ disableUnderline: true }} 
            placeholder="Enter location"
          />
        </article>
        <article className="settings">
          <h1>Update Frequency</h1>
          <Select value={settings.updateFrequency} onChange={(e) => handleSelectChange(e, "updateFrequency")}
            variant="standard" disableUnderline>
            <MenuItem value="1 Hour">1 Hour</MenuItem>
            <MenuItem value="3 Hours">3 Hours</MenuItem>
            <MenuItem value="6 Hours">6 Hours</MenuItem>
          </Select>
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Notifications Settings</h1>
        </div>
        <article className="settings">
          <h1>Weather Alerts</h1>
          <Switch checked={settings.weatherAlerts} onChange={() => handleToggle("weatherAlerts")} />
        </article>
        <article className="settings">
          <h1>Notify On Ideal Time To Train</h1>
          <Switch checked={settings.notifyTraining} onChange={() => handleToggle("notifyTraining")} />
        </article>
        <article className="settings">
          <h1>Daily Forecast</h1>
          <Select value={settings.dailyForecast} onChange={(e) => handleSelectChange(e, "dailyForecast")}
            variant="standard" disableUnderline>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
          </Select>
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>About and Support</h1>
        </div>
        <article className="settings">
          <h1>App Version</h1>
          <h1>16.789.4.3</h1>
        </article>
        <article className="settings">
          <h1>Terms Of Service</h1>
        </article>
      </section>
    </div>
  );
}

export default App;
