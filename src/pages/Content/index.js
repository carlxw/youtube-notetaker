console.log(
    "=====================================\n\n"     +
    "YouTube Notetaker\n"                           + 
    `${window.location.href}\n`                     +
    `${document.title.split(" - YouTube")[0]}\n\n`  +
    "====================================="
);

const video = document.getElementsByTagName("video")[0];

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (!("action" in request)) return false;

    if (request.action === "pause") video.pause();
    
    else if (request.action === "play" && video.paused) await video.play();
    
    else if (request.action === "toggle_mute") video.muted = !video.muted;
    
    else if (request.action === "currentTime") {
        // chrome.runtime.sendMessage({ action: "test"});
        sendResponse(video.currentTime);
    } 
    
    else if (request.action === "unmute") video.muted = false;
    
    else if (request.action === "toggle") video.paused ? await video.play() : video.pause();

    // sendResponse({});
    return true;
});