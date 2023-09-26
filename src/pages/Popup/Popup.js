import React, { useEffect, useState } from "react";
import TextField from "./Components/TextField";
import NotOnYouTube from "./Components/NotOnYouTube";
import Markdown from "../../modules/Markdown";
import storage from "../../modules/LocalStorage";
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
		// Obtain the current tab data on popup open
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			let currentTab = tabs[0];
			if (tabs.length > 0) {
				// Set tab data
				let url = currentTab.url.includes("&t=") ? currentTab.url.split("&t=")[0] : currentTab.url;
				let title = getVideoTitle(currentTab.title);
				setActiveTab(currentTab);
				setVideoTitle(title);
				setCurrentURL(url);
				
				// Send message to background script that popup is active
				let port = chrome.runtime.connect({ name: "popup" });

				// Deal with MD content in local storage
				const parsedDataMd = storage.getNote(url);
				if (parsedDataMd) {
					console.log("Restoring Markdown from previous session...");
					console.log(parsedDataMd);
		
					setmd(new Markdown(parsedDataMd.ytTitle, parsedDataMd.yturl, parsedDataMd.mdcontent));
					storage.clearAllNotes(); // Rework this to delete a specific one by url
				} else {
					console.log("New Markdown session has been created");
					setmd(new Markdown(title, url));
				}

				// Deal with any pre-existing text entries in the local storage
				const parsedDataText = storage.getText();
				if (parsedDataText) {
					console.log("Restoring text from previous session...");
					console.log(parsedDataText);

					setEntryTitle(parsedDataText.title);
					setEntryBody(parsedDataText.body);
				}

				// Pause the video as the user adds an annotation
				sendMessage(currentTab, { action: "pause" }, () => {});
			}
		});
	}, []);

	// When the popoup closes
	window.addEventListener("unload", () => {
		if (currentURL.includes("www.youtube.com/watch")) {
			sendMessage(activeTab, { action: "play" }, () => {});
		}
	});
	window.addEventListener("beforeunload", () => {
		if (currentURL.includes("www.youtube.com/watch")) {
			sendMessage(activeTab, { action: "play" }, () => {});
		}
	});
	window.onunload = function(){
		alert("Are you sure?");
	}

	// On submit button
	useEffect(() => {
		// There may be a bug here
		if (timeStamp !== 0) {
			md.push(entryTitle, entryBody, timeStamp);
			setEntryTitle("");
			setEntryBody("");

			// Text has been sucessfully used
			storage.clearText();

			// Serialize only the data needed to recreate the object
			const serializedData = {
				ytTitle: md.ytTitle,
				yturl: md.yturl,
				mdcontent: md.mdcontent
			};

			console.log("Setting data to local storage");
			storage.setNote(serializedData, currentURL);
		}
	}, [timeStamp]);

	// Whenever one of the text fields have been edited
	useEffect(() => {
		if (entryTitle === "" && entryBody === "") return;

		const serializedData = {
			title: entryTitle,
			body: entryBody
		}

		storage.setText(serializedData);
	}, [entryTitle, entryBody]);

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
	} 

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
							<span>
								<button onClick={() => {
									toggle(activeTab);
								}}>Toggle</button>
								<button onClick={() => {
									md.createBlob();

									// Need to change this to only clear specific data
									localStorage.clear();
								}}>Download</button>
								<button onClick={() => {
									localStorage.clear();
								}}>Clear</button>
								<button onClick={() => {
									if (confirm("Are you sure you want to remove the latest annotation?")) md.pop();
								}}>Delete Last</button>
								{/* <button onClick={() => {
									if (JSON.parse(localStorage.getItem("ytmd"))) {
										console.log("Local storage")
										console.log(JSON.parse(localStorage.getItem("ytmd")));
									} else {
										console.log("Mark down object")
										console.log(md);
									}
								}}>Print</button> */}
							</span>

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