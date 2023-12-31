import React, { useState, useEffect } from "react";
import TextField from "./Components/TextField";
import storage from "../../modules/LocalStorage";
import { sendMessage, checkConnection } from "../../modules/ChromeHelper";
import onPopupLoad from "./useEffect/onPopupLoad";
import onSubmit from "./useEffect/onSubmit";
import onTextChange from "./useEffect/onTextChange";
import Annotations from "./Components/Annotations";
import onPageChange from "./useEffect/onPageChange";
import onKeyCtrl from "./useEffect/onKeyCtrl";
import ErrorMessage from "./Components/ErrorMessage";

const Popup = () => {
	const [md, setmd] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [timeStamp, setTimeStamp] = useState(0);
	const [videoTitle, setVideoTitle] = useState("");
	const [currentURL, setCurrentURL] = useState("");
	const [entryTitle, setEntryTitle] = useState("");
	const [entryBody, setEntryBody] = useState("");
	const [textMode, setTextMode] = useState(true);
	const [window_size, setSize] = useState({});
	const [isPlaying, setIsPlaying] = useState(false);
	const [connected, setConnected] = useState(false);
	const [isOnYouTube, setIsOnYouTube] = useState(false);
	const [error, setError] = useState("");

	// Get the tab that the user is currently on, to run once
	onPopupLoad(setActiveTab, setVideoTitle, setCurrentURL, setmd, setEntryTitle, setEntryBody, setConnected, setIsOnYouTube, setError);

	// On submit button
	onSubmit(currentURL, md, entryTitle, entryBody, timeStamp, setEntryTitle, setEntryBody);

	// Whenever one of the text fields have been edited
	onTextChange(entryTitle, entryBody);

	// Whenever the user switches between the text entry vs annotation view
	onPageChange(textMode, setSize);

	// Pause the video when popup opens and connectino is affirmed
	useEffect(() => {
		if (connected) sendMessage(activeTab, { action: "pause" }, () => {});
		else setError("err_not_connected");
	}, [connected]);

	// Submit annotation entry
	function handleSubmit(e) {
		e.preventDefault();
		if (entryTitle === "" || entryBody === "") {
			sendMessage(activeTab, { action: "alert", message: "You have an input field left blank."}, () => {});
		} else sendMessage(activeTab, { action: "currentTime" }, (res) => { setTimeStamp(res) });
	}

	// Takes user to where the last annotation was created
	function goToLast() {
		if (md.mdcontent.length === 0) {
			sendMessage(activeTab, { action: "alert", message: "You have no notes for this YouTube video" }, () => {});
		} else {
			let index = md.mdcontent.length - 1;
			let lastts = md.mdcontent[index].timeStamp;
			sendMessage(activeTab, { action: "setTime", time: lastts }, () => {});
		}
		window.close();
	}

	// Ctrl+Enter to submit an annotation
	onKeyCtrl("Enter", () => { sendMessage(activeTab, { action: "currentTime" }, (res) => { setTimeStamp(res) }) });

	return (
		<>
			{connected && isOnYouTube ?
			<div className="App" style={ window_size }>
				<header className="App-header">
					{
						textMode ?
						<>
							<p>
								Add a note for { videoTitle }  
							</p>
							<span>
								<button onClick={() => {
									sendMessage(activeTab, { action: "toggle" }, (r) => { });
									setIsPlaying(!isPlaying);
								}}>{ isPlaying ? "Pause" : "Play" }</button>
								<button onClick={() => {
									md.createBlob();
									storage.deleteNote(currentURL);
								}}>Download</button>
								<button onClick={() => {
									setTextMode(false);
								}}>See Notes</button>
							</span>

							<span>
								{/* <button onClick={() => {
									if (md.mdcontent.length === 0) {
										console.log("You have not written any notes for this video");
									} else {
										md.print();
									}
								}}>Print</button> */}
								<button onClick={ goToLast }>Go To Last</button>
							</span>
							<TextField
								handleSubmit={handleSubmit}
								title={{ value: entryTitle, set: setEntryTitle }}
								body={{ value: entryBody, set: setEntryBody }}
							/>
						</>

						:

						<Annotations md={ md } setTextMode={ setTextMode } currentURL={ currentURL } activeTab={ activeTab } />
					}
				</header>
			</div>

			:

			// Improve this so that it will handle specific errors improve this now!
			<ErrorMessage error={ error }/>}
		</>
	);
};

export default Popup;