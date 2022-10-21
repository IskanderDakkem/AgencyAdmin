import React, { useState, useEffect } from "react";
//-------------------------------------------------------------------
import Preloader from "./Preloader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
//-------------------------------------------------------------------
function RouteWithSideBar({ children }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };
  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };
  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />

      <main className="content">
        <Navbar />
        {children}
      </main>
    </>
  );
}

export default RouteWithSideBar;
