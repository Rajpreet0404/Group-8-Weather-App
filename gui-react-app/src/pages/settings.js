import React, { useState, useEffect } from "react";
import "./reset.css";
import "./style.css";
import { Switch, Select, MenuItem, TextField, Button } from "@mui/material";

function Settings() {
  const getInitialSettings = () => {
    const savedSettings = localStorage.getItem('weatherAppSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      darkMode: false,
      dynamicBackground: false,
      fontSize: "Medium",
      temperatureUnit: "celsius", 
      currentLocation: "A", 
      manualLocation: "", 
      updateFrequency: 60 * 60 * 1000, 
      dailyForecast: "Morning",
    };
  };

  const [settings, setSettings] = useState(getInitialSettings);
  const [manualLocation, setManualLocation] = useState(() => {
    const initialSettings = getInitialSettings();
    return initialSettings.manualLocation || "";
  });

  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
    
    document.documentElement.style.fontSize = getFontSizeValue(settings.fontSize);
    
    if (settings.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    
    if (settings.dynamicBackground) {
      document.body.classList.add("dynamic-background");
    } else {
      document.body.classList.remove("dynamic-background");
    }
  }, [settings]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'weatherAppSettings') {
        const newSettings = JSON.parse(e.newValue);
        setSettings(newSettings);
        setManualLocation(newSettings.manualLocation || "");
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getFontSizeValue = (size) => {
    switch (size) {
      case "Small": return "14px";
      case "Medium": return "16px";
      case "Large": return "18px";
      default: return "14px";
    }
  };

  const handleToggle = (settingKey) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      
      if (settingKey === "temperatureUnit") {
        newSettings.temperatureUnit = prev.temperatureUnit === "celsius" ? "kelvin" : "celsius";
      } else {
        newSettings[settingKey] = !prev[settingKey];
      }
      
      return newSettings;
    });
  };

  const handleSelectChange = (event, settingKey) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      
      if (settingKey === "updateFrequency") {
        const hours = parseInt(event.target.value);
        newSettings.updateFrequency = hours * 60 * 60 * 1000;
      } else {
        newSettings[settingKey] = event.target.value;
      }
      
      return newSettings;
    });
  };

  const handleSetLocation = () => {
    if (manualLocation.trim()) {
      setSettings(prev => ({
        ...prev,
        currentLocation: "M",
        manualLocation: manualLocation
      }));
    }
  };

  const getUpdateFrequencyDisplay = () => {
    const hours = settings.updateFrequency / (60 * 60 * 1000);
    return `${hours} Hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div className="container">
          
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
          <Select 
            value={settings.fontSize} 
            onChange={(e) => handleSelectChange(e, "fontSize")}
            variant="standard" 
            disableUnderline
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </article>
        <article className="settings">
          <h1>Temperature Unit</h1>
          <div className="unit-display">
            <span>{settings.temperatureUnit === "celsius" ? "°C" : "K"}</span>
            <Switch 
              checked={settings.temperatureUnit === "kelvin"} 
              onChange={() => handleToggle("temperatureUnit")} 
            />
          </div>
        </article>
      </section>

      <section className="box appearance">
        <div className="appearancetitle">
          <h1>Location Settings</h1>
        </div>
        <article className="settings">
          <h1>Current Location</h1>
          <Select 
            value={settings.currentLocation} 
            onChange={(e) => handleSelectChange(e, "currentLocation")}
            variant="standard" 
            disableUnderline
          >
            <MenuItem value="A">Auto</MenuItem>
            <MenuItem value="M">Manual</MenuItem>
          </Select>
        </article>
        <article className="settings">
          <h1>Set Location</h1>
          <div className="location-input">
            <TextField 
              value={manualLocation} 
              onChange={(e) => setManualLocation(e.target.value)} 
              variant="standard" 
              InputProps={{ disableUnderline: true }} 
              placeholder="Enter location"
            />
            <Button 
              variant="contained" 
              size="small" 
              onClick={handleSetLocation}
              style={{ marginLeft: '10px' }}
            >
              Set
            </Button>
          </div>
        </article>
        <article className="settings">
          <h1>Update Frequency</h1>
          <Select 
            value={settings.updateFrequency / (60 * 60 * 1000)} 
            onChange={(e) => handleSelectChange(e, "updateFrequency")}
            variant="standard" 
            disableUnderline
          >
            <MenuItem value={1}>1 Hour</MenuItem>
            <MenuItem value={3}>3 Hours</MenuItem>
            <MenuItem value={6}>6 Hours</MenuItem>
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

export default Settings;