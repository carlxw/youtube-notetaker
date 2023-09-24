import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import Markdown from "../../modules/Markdown";
import { getVideoTitle, sendMessage } from "../../modules/ChromeHelper";

const Popup = () => {
	const [md, setmd] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [currentURL, setCurrentURL] = useState("");
	const [videoTitle, setVideoTitle] = useState("");
	const [timeStamp, setTimeStamp] = useState(0);

	const [entryTitle, setEntryTitle] = useState("");
	const [entryBody, setEntryBody] = useState("");

	// Get the tab that the user is currently on, to run once
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			let currentTab = tabs[0];
			if (tabs.length > 0) {
				setActiveTab(currentTab);
				setCurrentURL(currentTab.url.includes("&t=") ? currentTab.url.split("&t=")[0] : currentTab.url);
				setVideoTitle(getVideoTitle(currentTab.title));
			}
		});
	}, []);

	// When a tab has been identified
	useEffect(() => {
		setmd(new Markdown(videoTitle, currentURL));
	}, [activeTab])

	function toggle(tab) {
		return sendMessage(tab, { action: "toggle" }, (res, err) => {});
	}

	function getCurrentTime(tab) {
		sendMessage(tab, { action: "currentTime" }, (res, error) => {
			if (error) {
				console.error(error);
			} else {
				// Obtain the current time as a response
				setTimeStamp(res);
			}
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		getCurrentTime(activeTab);
		console.log(timeStamp)
	} useEffect(() => {
		if (timeStamp !== 0) {
			md.append(entryTitle, entryBody, timeStamp);
			setEntryTitle("");
			setEntryBody("");
		}
	}, [timeStamp]);
	
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
					toggle(activeTab);
				}}>Toggle</button>
				<button onClick={() => {
					md.createBlob();
				}}>Download</button>

				<form onSubmit={ handleSubmit }>
					<input
						value={entryTitle}
						onChange={(e) => setEntryTitle(e.target.value)}
					/>
					<textarea 
						value={entryBody} 
						onChange={(e) => setEntryBody(e.target.value)}>
					</textarea>
					<input type="submit" />
				</form>
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