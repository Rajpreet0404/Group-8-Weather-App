import React, { useEffect } from 'react';

const AppWrapper = ({ children }) => {
  useEffect(() => {
    const applySettings = () => {
      const savedSettings = localStorage.getItem('weatherAppSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
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
        
        if (settings.fontSize) {
          const getFontSizeValue = (size) => {
            switch (size) {
              case "Small": return "14px";
              case "Medium": return "16px";
              case "Large": return "18px";
              default: return "16px";
            }
          };
          document.documentElement.style.fontSize = getFontSizeValue(settings.fontSize);
        }
      }
    };

    applySettings();

    window.addEventListener('storage', applySettings);
    
    return () => {
      window.removeEventListener('storage', applySettings);
    };
  }, []);

  return <>{children}</>;
};

export default AppWrapper;