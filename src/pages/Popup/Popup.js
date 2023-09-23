import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import Markdown from "../../modules/Markdown";
import { getVideoTitle, sendMessage } from "../../modules/ChromeHelper";

const Popup = () => {
	const [activeTab, setActiveTab] = useState(null);
	const [currentURL, setCurrentURL] = useState("");
	const [videoTitle, setVideoTitle] = useState("");
	const [timeStamp, setTimeStamp] = useState(0);

	// Get the tab that the user is currently on
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			let currentTab = tabs[0];
			if (tabs.length > 0) {
				setActiveTab(currentTab);
				setCurrentURL(currentTab.url);
				setVideoTitle(getVideoTitle(currentTab.title));
			}
		});
	}, []);

	// // Communication from the content script
	// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// 	if (message.action === 'test') {
	// 		console.log("Sent mute, returned here in test");
	// 	}
	// 	return true;
	// });

	function resume(tab) {
		return sendMessage(tab, { action: "play" });
	}

	function pause(tab) {
		return sendMessage(tab, { action: "pause" });
	}

	function getCurrentTime(tab) {
		sendMessage(tab, { action: "currentTime" }, function (response, error) {
			if (error) {
				console.error(error);
			} else {
				// Obtain the current time as a response
				setTimeStamp(response);
			}
		});
	}

	return ( 
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
				</p>
				{ currentURL.indexOf("www.youtube.com") !== 1 && videoTitle }
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
					getCurrentTime(activeTab);
					console.log(timeStamp);
				}}>Test</button>

			</header>
		</div>
	);
};

export default Popup;
