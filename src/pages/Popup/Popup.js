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

	// const [entry, setEntry] = useState("");

	// Get the tab that the user is currently on, to run once
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			let currentTab = tabs[0];
			if (tabs.length > 0) {
				setCurrentURL(currentTab.url.includes("&t=") ? currentTab.url.split("&t=")[0] : currentTab.url);
				setActiveTab(currentTab);
				setVideoTitle(getVideoTitle(currentTab.title));
			}
		});
	}, []);

	function toggle(tab) {
		return sendMessage(tab, { action: "toggle" });
	}

	function getCurrentTime(tab) {
		sendMessage(tab, { action: "currentTime" }, function (res, error) {
			if (error) {
				console.error(error);
			} else {
				// Obtain the current time as a response
				setTimeStamp(res);
			}
		});
	}

	function test() {
		getCurrentTime(activeTab);
		console.log(timeStamp)
		setTimeout(() => {
			if (timeStamp !== 0) {
				const md = new Markdown(videoTitle, currentURL);
				md.append("Sample header title for markdown", "* This is a test content at this current time", timeStamp);
				md.createBlob();
			} else throw ("Please try again")
		}, 500);
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
					toggle(activeTab);
				}}>Toggle</button>
				<button onClick={() => {
					test()
				}}>Test</button>
			</header>
		</div>
	);
};

export default Popup;

// // Communication from the content script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// 	if (message.action === 'test') {
// 		console.log("Sent mute, returned here in test");
// 	}
// 	return true;
// });