console.log(
    "=====================================\n\n"     +
    "YouTube Notetaker\n"                           + 
    `${window.location.href}\n`                     +
    `${document.title.split(" - YouTube")[0]}\n\n`  +
    "====================================="
);

const video = document.getElementsByTagName("video")[0];
console.log(video);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (!("action" in request)) return false;

    if (request.action === "pause") video.pause();
    
    else if (request.action === "play" && video.paused) video.play();
    
    else if (request.action === "toggle_mute") video.muted = !video.muted;
    
    else if (request.action === "currentTime") {
        try {
            sendResponse(Math.floor(video.currentTime));
        } catch {
            console.error("Response failed");
        }
    }
        
    else if (request.action === "unmute") video.muted = false;
    
    else if (request.action === "toggle") video.paused ? video.play() : video.pause();

    else if (request.action === "confirm") {
        let choice = confirm(request.message);
        sendResponse(choice);
    }

    else if (request.action === "alert") {
        alert(request.message);
    }

    else if(request.action === "changeURL") {
        window.location.href = request.url;
    }

    try {
        sendResponse("Success");
    } catch {
        console.error("Response failed");
    }
    return true;
});