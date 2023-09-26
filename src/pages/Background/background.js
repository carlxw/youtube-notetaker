import { sendMessage } from "../../modules/ChromeHelper";
console.log("From the background script");

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
        port.onDisconnect.addListener(() => {
            chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                sendMessage(tab, { action: "play" }, () => {});
            })
        });
    }
});