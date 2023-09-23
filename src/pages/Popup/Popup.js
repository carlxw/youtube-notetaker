import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
	const [activeTab, setActiveTab] = useState(null);

	// Get the tab that the user is currently on
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			if (tabs.length > 0) setActiveTab(tabs[0]);
		});
	}, []);

	// Communication from the content script
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		if (message.action === 'test') {
			console.log("Sent mute, returned here in test");
		}
		return true;
	});

	// Functionality to send messages to tabs
	function sendMessage(tab, message) {
		if (chrome.runtime.lastError) {
			console.error(`Youtube Autopause error: ${chrome.runtime.lastError}`);
			return;
		}

		chrome.tabs.sendMessage(tab.id, message, {}, function (res) {
			if (res) console.log(res)
			void chrome.runtime.lastError;
		});
	}

	function resume(tab) {
		sendMessage(tab, { action: "play" });
	}

	function pause(tab) {
		sendMessage(tab, { action: "pause" });
	}

	function test(tab) {
		sendMessage(tab, { action: "mute" })
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
				}}>Play the video</button>
				<button onClick={() => {
					pause(activeTab);
				}}>Pause the video</button>
				<button onClick={() => {
					test(activeTab);
				}}>Test</button>
			</header>
		</div>
	);
};

export default Popup;
