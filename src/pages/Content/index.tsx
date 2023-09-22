const { printLine } = require("./modules/print");
const YouTubeVideo = require("./modules/YouTubeVideo");

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

const yt = new YouTubeVideo(document.getElementsByTagName("video")[0]);

printLine("Pausing video in 5 seconds")
setTimeout(() => {
    yt.pause();
    console.log(yt.title);
    console.log(yt.isPaused());
    console.log(yt.url);
}, 5000);

// class ClipboardImage {
//     async isImage(): Promise<boolean> {
//         let imgdata:string = await navigator.clipboard.read()[0].types;
//         return imgdata.indexOf("image") === -1 ? false : true;
//     }

//     // Paste the image
//     // https://jsfiddle.net/bt7BU/225/
// }

