import React, { useEffect, useState } from "react";
import TextField from "./Components/TextField";
import NotOnYouTube from "./Components/NotOnYouTube";
import storage from "../../modules/LocalStorage";
import { sendMessage, store } from "../../modules/ChromeHelper";
import onPopupLoad from "./useEffect/onPopupLoad";
import onSubmit from "./useEffect/onSubmit";
import onTextChange from "./useEffect/onTextChange";
import Annotations from "./Components/Annotations";
import onPageChange from "./useEffect/onPageChange";
import onCtrlEnter from "./useEffect/onCtrlEnter";

const Popup = () => {
	const [md, setmd] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [timeStamp, setTimeStamp] = useState(0);
	const [videoTitle, setVideoTitle] = useState("");
	const [currentURL, setCurrentURL] = useState("");
	const [entryTitle, setEntryTitle] = useState("");
	const [entryBody, setEntryBody] = useState("");
	const [choice, setChoice] = useState(false);
	const [textMode, setTextMode] = useState(true);
	const [window_size, setSize] = useState({ height: "260px", width: "300px" });

	// Get the tab that the user is currently on, to run once
	onPopupLoad(setActiveTab, setVideoTitle, setCurrentURL, setmd, setEntryTitle, setEntryBody)

	// On submit button
	onSubmit(currentURL, md, entryTitle, entryBody, timeStamp, setEntryTitle, setEntryBody);

	// Whenever one of the text fields have been edited
	onTextChange(entryTitle, entryBody);

	// Whenever the user switches between the text entry vs annotation view
	onPageChange(textMode, setSize);

	// When user chooses a confirm action. Functionality is unknown as the popup closes. May remove.
	useEffect(() => {
		if (choice && md.mdcontent.length !== 0) {
			md.pop();

			// Serialize only the data needed to recreate the object
			const serializedData = store(md);
			storage.setNote(serializedData, currentURL);
		}

		else if (choice && md.mdcontent.length === 0) {
			sendMessage(activeTab, { action: "alert", message: "You have no note for this video." }, () => { });
		}
	}, [choice]);

	// Submit annotation entry
	function handleSubmit(e) {
		e.preventDefault();
		sendMessage(activeTab, { action: "currentTime" }, (res) => { setTimeStamp(res) });
	}

	// Listen to keyboard presses
	onCtrlEnter(() => { sendMessage(activeTab, { action: "currentTime" }, (res) => { setTimeStamp(res) }) });

	return (
		<>
			{currentURL.includes("www.youtube.com/watch") ?
			<div className="App" style={ window_size }>
				<header className="App-header">
					<p>
						Add a note for { videoTitle }  
					</p>
					<span>
						<button onClick={() => {
							sendMessage(activeTab, { action: "toggle" }, (r) => { });
						}}>Toggle</button>
						<button onClick={() => {
							md.createBlob();
							storage.deleteNote(currentURL);
						}}>Download</button>
						<button onClick={() => {
							setTextMode(false);
						}}>See Notes</button>
					</span>

					<span>
						<button onClick={() => {
							if (md.mdcontent.length === 0) {
								console.log("You have not written any notes for this video");
							} else {
								md.print();
							}
						}}>Print</button>
						<button onClick={() => {
							if (md.mdcontent.length === 0) {
								sendMessage(activeTab, { action: "alert", message: "You have no notes for this YouTube video" }, () => {});
							} else {
								let index = md.mdcontent.length - 1;
								let lastEntry = md.generateURL(md.mdcontent[index]);
								sendMessage(activeTab, { action: "changeURL", url: lastEntry }, () => {});
							}
							window.close();
						}}>Go To Last</button>
					</span>

					{
						textMode ? 
						<TextField
							handleSubmit={handleSubmit}
							title={{ value: entryTitle, set: setEntryTitle }}
							body={{ value: entryBody, set: setEntryBody }}
						/>
						:
						<Annotations md={ md } setTextMode={ setTextMode } />
					}
				</header>
			</div>

			:

			<NotOnYouTube />}
		</>
	);
};

export default Popup;