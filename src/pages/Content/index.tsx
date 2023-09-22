const printLine = require("./modules/print")

console.log('Content script works! You are on a YouTube page!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

/*
const video = document.getElementsByTagName("video")[0];

class YouTubeVideo {
    video;
    constructor(video) {
        this.video = video;
    }

    play() {
        if (this.video) this.video.play();
    }
    
    pause() {
        if (this.video) this.video.pause();
    }
    
    getVideoTitle() {
        return document.title.split(" - YouTube")[0];
    }
    
    getCurrentTime() {
        return document.getElementsByTagName('video')[0].currentTime;
    }

    isPaused() {
        return video.paused;
    }

    createLink() {
        return `${ window.location.href }&t=${ this.getCurrentTime() }`
    }
}

const yt = new YouTubeVideo(video);
console.dir(video);
setTimeout(() => {
    yt.pause();
    console.log(yt.getVideoTitle());
    console.log(yt.getCurrentTime());
}, 5000);

class ClipboardImage {
    async isImage(): Promise<boolean> {
        let imgdata:string = await navigator.clipboard.read()[0].types;
        return imgdata.indexOf("image") === -1 ? false : true;
    }

    // Paste the image
    // https://jsfiddle.net/bt7BU/225/
}
*/