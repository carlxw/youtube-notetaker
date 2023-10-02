import { sendMessage } from "../../modules/ChromeHelper";
console.log("From the background script");

/**
 * Detect when the user closes the extension popup, 
 * which signals the video to continue playing the video
 */
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
        port.onDisconnect.addListener(() => {
            // Try to account for user clicking on the video to resume and exit popup
            setTimeout(() => {
                chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                    sendMessage(tab, { action: "play" }, () => {});
                });
            }, 150);
        });
    }
});