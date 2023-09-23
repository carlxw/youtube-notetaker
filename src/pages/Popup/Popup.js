import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Since chrome.tabs.query is asynchronous, you should update the state
      // with the result inside this callback.
      if (tabs.length > 0) {
        setActiveTab(tabs[0]);
      }
    });
  }, []);

  function resume(tab) {
    sendMessage(tab, { action: "resume" });
  }

  // Functionality to send messages to tabs
  function sendMessage(tab, message) {
    if (chrome.runtime.lastError) {
      console.error(`Youtube Autopause error: ${chrome.runtime.lastError}`);
      return;
    }

    chrome.tabs.sendMessage(tab.id, message, {}, function () {
      void chrome.runtime.lastError;
    });
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
        <button onClick={() => {
          resume(activeTab);
          console.log(activeTab)
        }}>Click me!</button>
      </header>
    </div>
  );
};

export default Popup;
