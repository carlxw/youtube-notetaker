import React, { useEffect, useState } from "react";
import TextField from "./Components/TextField";
import NotOnYouTube from "./Components/NotOnYouTube";
import Markdown from "../../modules/Markdown";
import { getVideoTitle, sendMessage } from "../../modules/ChromeHelper";

const Popup = () => {
	const [md, setmd] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [timeStamp, setTimeStamp] = useState(0);
	const [videoTitle, setVideoTitle] = useState("");
	const [currentURL, setCurrentURL] = useState("");
	const [entryTitle, setEntryTitle] = useState("");
	const [entryBody, setEntryBody] = useState("");

	// Get the tab that the user is currently on, to run once
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			let currentTab = tabs[0];
			if (tabs.length > 0) {
				// Set tab data
				let url = currentTab.url.includes("&t=") ? currentTab.url.split("&t=")[0] : currentTab.url;
				let title = getVideoTitle(currentTab.title);
				setActiveTab(currentTab);
				setVideoTitle(title);
				setCurrentURL(url);
				
				// Deal with MD content
				const serializedData = localStorage.getItem("ytmd");
				if (serializedData) {
					// Deserialize the data
					console.log("Restoring from previous session...");
					const parsedData = JSON.parse(serializedData);
		
					// Create a new instance of the Markdown class
					const storedmd = new Markdown(parsedData.ytTitle, parsedData.yturl);
					storedmd.mdcontent = parsedData.mdcontent;
		
					// Now you can work with 'md' as a Markdown object with its methods
					setmd(storedmd);
					localStorage.clear();
				}
				else {
					console.log("New Markdown session has been created");
					setmd(new Markdown(title, url));
				}
			}
		});
	}, []);

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
	} useEffect(() => {
		if (timeStamp !== 0) {
			md.append(entryTitle, entryBody, timeStamp);
			setEntryTitle("");
			setEntryBody("");

			// Serialize only the data needed to recreate the object
			const serializedData = {
				ytTitle: md.ytTitle,
				yturl: md.yturl,
				mdcontent: md.mdcontent
			};

			console.log("Setting data to local storage");
			localStorage.setItem("ytmd", JSON.stringify(serializedData));
		}
	}, [timeStamp]);

	return ( 
		<>
			{ 
				currentURL.includes("www.youtube.com/watch") ?
				<>
					<div className="App">
						<header className="App-header">
							<p>
								Add a note for { videoTitle }
							</p>
							<button onClick={() => {
								toggle(activeTab);
							}}>Toggle</button>
							<button onClick={() => {
								md.createBlob();
								localStorage.clear();
							}}>Download</button>
							<button onClick={() => {
								localStorage.clear();
							}}>Clear</button>
							<button onClick={() => {
								if (JSON.parse(localStorage.getItem("ytmd"))) {
									console.log("Local storage")
									console.log(JSON.parse(localStorage.getItem("ytmd")));
								} else {
									console.log("Mark down object")
									console.log(md);
								}
							}}>Print</button>

							<TextField 
								handleSubmit={ handleSubmit }
								title={{ value: entryTitle, set: setEntryTitle }}
								body={{ value: entryBody, set: setEntryBody }}
							/>
						</header>
					</div>
				</>

				:

				<NotOnYouTube />
			}
		</>
	);
};

export default Popup;