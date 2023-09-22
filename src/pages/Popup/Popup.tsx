import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  // Gets the URL
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    async function getCurrentTab() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        if (tab && tab.url) {
          setCurrentURL(tab.url);
        }
      } catch (error) {
        console.error("Error fetching current tab URL:", error);
      }
    }
    getCurrentTab();
  }, []);

  const printURL = () => {
    console.log(currentURL);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <button onClick={ printURL }>Click me!</button>
      </header>
    </div>
  );
};

export default Popup;
