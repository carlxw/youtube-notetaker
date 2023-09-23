const msg = (
    "=====================================\n\n"     +
    "YouTube Notetaker\n"                           + 
    `${window.location.href}\n`                     +
    `${document.title.split(" - YouTube")[0]}\n\n`  +
    "====================================="
)

console.log('Content script works! You are on a YouTube video page!');
console.log('Must reload extension for modifications to take effect.');
console.log(msg);

const video = document.getElementsByTagName("video")[0];
console.log(video);

setTimeout(() => {
    video.pause();
    console.log("Video is paused")
},  5000)
console.log(1);
// class ClipboardImage {
//     async isImage(): Promise<boolean> {
//         let imgdata:string = await navigator.clipboard.read()[0].types;
//         return imgdata.indexOf("image") === -1 ? false : true;
//     }

//     // Paste the image
//     // https://jsfiddle.net/bt7BU/225/
// }

// Listen media commands from the service worker
chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
) {
    if (!("action" in request)) {
        return false;
    }
    const videoElements = document.querySelectorAll("video");

    if (request.action === "stop") {
        video.pause();
    } else if (request.action === "resume" && video.paused) {
        await video.play();
    } else if (request.action === "toggle_mute") {
        video.muted = !video.muted;
    } else if (request.action === "mute") {
        video.muted = true;
    } else if (request.action === "unmute") {
        video.muted = false;
    } else if (request.action === "toggle") {
        if (video.paused) {
            await video.play();
        } else {
            video.pause();
        }
    }
    sendResponse({});
    return true;
});