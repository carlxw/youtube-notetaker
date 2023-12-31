import { useEffect } from "react";
import { checkConnection, getVideoTitle } from "../../../modules/ChromeHelper";
import storage from "../../../modules/LocalStorage";
import Markdown from "../../../modules/Markdown";

export default function onPopupLoad(
	setActiveTab, setVideoTitle, setCurrentURL, setmd, setEntryTitle, setEntryBody, setConnected, setIsOnYouTube, setError
) {
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

				// The user is not on a YouTube video
				if (url.includes("https://www.youtube.com/watch?")) {
					setIsOnYouTube(true);
				} else {
					setError("err_not_on_youtube")
				}

				// Send message to background script that popup is active
				chrome.runtime.connect({ name: "popup" });

				// Deal with MD content in local storage
				const parsedDataMd = storage.getNote(url);
				if (parsedDataMd) {
					console.log("Restoring Markdown from previous session...");

					setmd(new Markdown(parsedDataMd.ytTitle, parsedDataMd.yturl, parsedDataMd.mdcontent));
					// storage.clearAllNotes(); // Rework this to delete a specific one by url
				} else {
					console.log("New Markdown session has been created");
					setmd(new Markdown(title, url));
				}

				// Deal with any pre-existing text entries in the local storage
				const parsedDataText = storage.getText();
				if (parsedDataText) {
					console.log("Restoring text from previous session...");

					setEntryTitle(parsedDataText.title);
					setEntryBody(parsedDataText.body);
				}

				// Check if there is connection
				checkConnection(currentTab, setConnected);
			}
		});
	}, []);
}